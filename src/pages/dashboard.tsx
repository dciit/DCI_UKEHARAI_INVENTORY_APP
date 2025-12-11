// @ts-nocheck
import { Grid, Stack } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { API_CHART_DATA, APIGetDashboardByModelCompressor, APIGetModelCompressor } from "../Service";
import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title } from "chart.js";
import { Bar } from "react-chartjs-2";
import { MChart, MContext } from "../interface";
import moment from "moment";
import { ThemeContext } from "../router/Routers";
import { Chart } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import FilterListIcon from "@mui/icons-material/FilterList";
import DialogFilterDashboard from "../components/dialog.filter.dashboard";
import { contact } from "../constant";
import { Tabs } from "antd";

// Utility function to sort chart data based on sort array
const sortChartData = (chartData: any, sortOrder: string[]) => {
  if (!sortOrder || sortOrder.length === 0) {
    return chartData;
  }

  const { label: originalLabels, dataset: originalDatasets } = chartData;

  const sortIndexMap = new Map();
  sortOrder.forEach((item, index) => {
    sortIndexMap.set(item, index);
  });

  // Create array of label indices with their sort order
  const labelWithSortOrder = originalLabels.map((label: string, index: number) => {
    // Try to find exact match first
    let sortIdx = sortIndexMap.get(label);
    let matchType = "exact";

    // If no exact match, try to find partial match or similar patterns
    if (sortIdx === undefined) {
      matchType = "partial";
      // Try variations like adding/removing prefixes, suffixes
      for (const [sortItem, idx] of sortIndexMap.entries()) {
        if (sortItem.includes(label) || label.includes(sortItem)) {
          sortIdx = idx;
          break;
        }
        // Handle variations like "SCR1_145-JP" vs "SCR_145-JP"
        const normalizedLabel = label.replace(/\d+_/, "_");
        const normalizedSortItem = sortItem.replace(/\d+_/, "_");
        if (normalizedLabel === normalizedSortItem) {
          sortIdx = idx;
          matchType = "normalized";
          break;
        }
      }
    }

    return {
      label,
      originalIndex: index,
      sortOrder: sortIdx !== undefined ? sortIdx : 999999, // Put unsorted items at the end
    };
  });

  // Sort by sort order
  labelWithSortOrder.sort((a, b) => a.sortOrder - b.sortOrder);

  // Extract sorted labels and create mapping for data reordering
  const sortedLabels = labelWithSortOrder.map((item) => item.label);
  const indexMapping = labelWithSortOrder.map((item) => item.originalIndex);
  const sortedDatasets = originalDatasets.map((dataset: any) => ({
    ...dataset,
    data: indexMapping.map((originalIndex) => dataset.data[originalIndex]),
  }));

  return {
    label: sortedLabels,
    dataset: sortedDatasets,
  };
};
// เพิ่มไอคอน
import AppsIcon from "@mui/icons-material/Apps";
import CompressIcon from "@mui/icons-material/Compress";
import StorageIcon from "@mui/icons-material/Storage";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AssignmentIcon from "@mui/icons-material/Assignment";
// เพิ่ม Select ของ antd
import { Select as AntdSelect } from "antd";
import { Skeleton } from "antd";
Chart.register(ChartDataLabels);
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
// Chart.register(ChartDataLabels);
function Dashboard() {
  let delayed = false;
  const context: MContext = useContext(ThemeContext);
  const _months = context.months;
  const [load, setLoad] = useState<boolean>(true);
  const [_year, setYear] = useState<string>(moment().format("YYYY"));
  const [_month, setMonth] = useState<number>(parseInt(moment().format("MM")));
  const [rYear] = useState<string[]>([moment().add(-1, "year").year().toString(), moment().year().toString()]);
  const [ym, setYm] = useState<string>(moment().format("YYYYMM"));
  const [chart, setChart] = useState<MChart[]>([]);
  const [openDialogFilter, setOpenDialogFilter] = useState<boolean>(false);
  const [AxisMax, setAxisMax] = useState<number>(0);
  const AxisStep: number = 25000;
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedMonths, setSelectedMonths] = useState<number[]>([_month]);
  const [selectedYear, setSelectedYear] = useState<number>(parseInt(_year));
  const [loadingModelCompressor, setLoadingModelCompressor] = useState(false);
  const [showLegend, setShowLegend] = useState<boolean>(true);

  // ตัวอย่าง options สามารถปรับได้ตามจริง
  const [selectModelCompressorOptions, setSelectModelCompressorOptions] = useState<any[]>([]);
  const [dashboardByModelData, setDashboardByModelData] = useState<{
    stock?: any[];
    sale?: any[];
    plan?: any[];
    data: any[];
  }>({ stock: [], sale: [], plan: [], data: [] });

  // ปีที่เลือกได้: ปีย้อนหลัง 1 ปี, ปีปัจจุบัน, ปีถัดไป 1 ปี
  const yearOptions = [moment().add(-1, "year").year(), moment().year(), moment().add(1, "year").year()];

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    setYm(`${selectedYear}${_month.toLocaleString("en", { minimumIntegerDigits: 2 })}`);
  }, [selectedYear, _month]);
  async function init() {
    setLoad(true);
    let res: MChart[] = await API_CHART_DATA({ ym: ym });
    setChart(res);
  }
  useEffect(() => {
    if (chart.length > 0) {
      let xAxisData = [];
      try {
        chart.map((o: MChart) => {
          if (o.name.toUpperCase().includes("SALE")) {
            let length: number = o.chart.dataset.length ? o.chart.dataset[0].data.length : 0;
            [...Array(length)].map((_, iLength) => {
              let xAxisFixIndex = [];
              o.chart.dataset.map((oData: any) => {
                xAxisFixIndex.push(oData.data[iLength]);
              });
              xAxisData = [...xAxisData, ...[xAxisFixIndex.reduce((a, b) => a + b, 0)]];
            });
            o.chart.dataset.map((oData: any) => {
              xAxisData = [...xAxisData, ...oData.data];
            });
          } else {
            o.chart.dataset.map((oData: any) => {
              xAxisData = [...xAxisData, ...oData.data];
            });
          }
        });
        setAxisMax(Math.ceil(Math.max(...xAxisData) / AxisStep) * AxisStep);
      } catch {
        alert(`ไม่สามารถคำนวนค่ามากสุดของแกน X ได้ ${contact}`);
      }
      setLoad(false);
    }
  }, [chart]);
  // --- Data for Table ---

  // เพิ่ม useEffect สำหรับ tab change
  const handleTabChange = (activeKey: string) => {
    if (activeKey === "2") {
      initModelCompressor();
    }
  };

  // เพิ่มฟังก์ชันนี้ (หรือใช้ของเดิม)
  const initModelCompressor = async () => {
    setLoadingModelCompressor(true);
    let res: { data: [] } = await APIGetModelCompressor();
    setSelectModelCompressorOptions(
      res.data.map((item: any) => ({
        label: item.model,
        value: item.model,
      }))
    );
    setLoadingModelCompressor(false);
  };
  const initDataByModelCompressor = async () => {
    if (selectedOptions.length == 0) {
      setDashboardByModelData({ stock: [], sale: [], plan: [], data: [] });
      return;
    }
    let res: any = await APIGetDashboardByModelCompressor({
      model: selectedOptions.join(","),
      ym: selectedMonths.join(","),
      year: selectedYear.toString(),
    });
    setDashboardByModelData(res.data);
    // console.log(res)
  };

  // Event handler เมื่อเลือก Model Compressor
  const handleSelectModelCompressor = (values: string[]) => {
    setSelectedOptions(values);
  };
  useEffect(() => {
    initDataByModelCompressor();
  }, [selectedOptions]);

  // ปรับ useEffect ให้ sync _month กับ selectedMonths
  useEffect(() => {
    setSelectedMonths([_month]);
  }, [_month]);

  // เรียก initDataByModelCompressor เมื่อ selectedMonths เปลี่ยน
  useEffect(() => {
    initDataByModelCompressor();
  }, [selectedMonths]);

  // เรียก initDataByModelCompressor เมื่อ selectedYear เปลี่ยน
  useEffect(() => {
    initDataByModelCompressor();
  }, [selectedYear]);

  return (
    <Tabs
      defaultActiveKey="1"
      onChange={handleTabChange}
      items={[
        {
          key: "1",
          label: (
            <div className="px-6 flex items-center gap-2">
              <AppsIcon fontSize="small" />
              <span>Group Base Model</span>
            </div>
          ),
          children: (
            <Grid container className=" top-0 h-[100%] " style={{ paddingLeft: 6, paddingRight: 6 }}>
              {load ? (
                <div className="flex flex-col items-center w-full h-full justify-center">
                  <Skeleton active paragraph={{ rows: 6 }} className="w-full" />
                </div>
              ) : (
                <Grid item xs={12}>
                  <div className="flex justify-between w-full mt-2 pl-3 sticky top-3 z-[9999]">
                    <div className="border rounded-md px-6 py-2 text-red-500 font-semibold drop-shadow-sm shadow-sm bg-white flex items-center">
                      Secret
                    </div>

                    <div className="pr-3 flex gap-2 items-center" onClick={() => setOpenDialogFilter(true)}>
                      <div className="bg-black text-white pl-4 rounded-lg py-1 pr-4 flex items-center cursor-pointer">
                        <div className="opacity-75 pr-3">Year : </div>
                        <span>{_year}</span>
                      </div>
                      <div className="bg-black text-white pl-4 rounded-lg py-1 pr-4 flex items-center cursor-pointer">
                        <div className="opacity-75 pr-3">Month :</div>
                        <span>
                          {_months[_month - 1]} ({_month.toString().padStart(0, 2)})
                        </span>
                      </div>
                      <div className="bg-black text-white select-none hover:scale-105 duration-300 transition-all shadow-md px-3 py-1 rounded-md cursor-pointer">
                        <FilterListIcon />
                        <span className="ml-2">Filter</span>
                      </div>
                    </div>
                  </div>
                  <Grid container height={"100%"}>
                    {chart.map((oChart: MChart, iChart: number) => {
                      let ttl: number = 0;
                      let bgTTL: string =
                        oChart.name.includes("SALE") == true
                          ? "bg-[#5c5fc8]"
                          : oChart.name.includes("STOCK") == true
                          ? "bg-[#459d95]"
                          : "bg-[#3b82f6]";
                      try {
                        ttl = oChart.chart.dataset.reduce((s, c) => s + c.data.reduce((sum, cv) => sum + (cv || 0)), 0);
                      } catch (error) {
                        ttl = 0;
                      }
                      return (
                        <Grid key={iChart} item xs={12} sm={12} md={6} lg={4} p={3}>
                          <Stack direction={"column"}>
                            <div className="flex items-center gap-3">
                              <div className="font-semibold"> {oChart.name}</div>
                              <div
                                className={`flex flex-row ${bgTTL} px-3 pt-[4px] pb-[6px] rounded-md text-white gap-1 drop-shadow-md font-['Roboto']`}
                              >
                                <span className="text-[#eeeded]">TTL :</span>
                                <span>{ttl.toLocaleString("en")}</span>
                              </div>
                            </div>
                            <div className="h-[350px]">
                              <Bar
                                data={{
                                  labels: sortChartData(oChart.chart, oChart.sort).label,
                                  datasets: sortChartData(oChart.chart, oChart.sort).dataset,
                                }}
                                options={{
                                  animation: {
                                    onComplete: () => {
                                      delayed = true;
                                    },
                                    delay: (context) => {
                                      let delay = 0;
                                      if (context.type === "data" && context.mode === "default" && !delayed) {
                                        delay = context.dataIndex * 200 + context.datasetIndex * 100;
                                      }
                                      return delay;
                                    },
                                  },
                                  scales: {
                                    x: {
                                      stacked: true,
                                      max: AxisMax == 0 ? 250000 : AxisMax,
                                      ticks: {
                                        stepSize: AxisStep,
                                      },
                                    },
                                    y: {
                                      stacked: true,
                                      min: 0, // Set your minimum value
                                      max: 100,
                                      ticks: {
                                        autoSkip: false,
                                      },
                                    },
                                  },
                                  indexAxis: "y" as const,
                                  responsive: true,
                                  maintainAspectRatio: false,
                                  plugins: {
                                    datalabels: {
                                      anchor: "end",
                                      align: "end",
                                      color: "black",
                                      formatter: function (value, context) {
                                        const datasetIndex = context.datasetIndex;
                                        const dataIndex = context.dataIndex;
                                        if (datasetIndex === context.chart.data.datasets.length - 1) {
                                          const total = context.chart.data.datasets.reduce(
                                            (sum, dataset) => sum + dataset.data[dataIndex],
                                            0
                                          );
                                          return total > 0 ? total.toLocaleString("en") : "";
                                        } else {
                                          return oChart.name.includes("SALE") == true
                                            ? ""
                                            : Number(value).toLocaleString("en");
                                        }
                                      },
                                      font: {
                                        weight: "bold",
                                        size: 10,
                                      },
                                    },
                                    legend: {
                                      position: "right" as const,
                                    },
                                    title: {
                                      display: false,
                                      text: "SALE OF SKU",
                                    },
                                  },
                                }}
                              />
                            </div>
                          </Stack>
                        </Grid>
                      );
                    })}
                  </Grid>
                </Grid>
              )}
              <DialogFilterDashboard
                open={openDialogFilter}
                setOpen={setOpenDialogFilter}
                init={init}
                year={_year}
                month={_month}
                setYear={setYear}
                setMonth={setMonth}
              />
            </Grid>
          ),
        },
        {
          key: "2",
          label: (
            <div className="flex items-center gap-2">
              <CompressIcon fontSize="small" />
              <span>Model Compressor</span>
              <span
                style={{
                  background: "linear-gradient(90deg, #ff9800 0%, #ffc107 100%)",
                  color: "#fff",
                  fontWeight: "bold",
                  fontSize: 12,
                  borderRadius: 8,
                  padding: "2px 10px",
                  marginLeft: 6,
                  boxShadow: "0 1px 6px 0 rgba(255,152,0,0.25)",
                  letterSpacing: 1,
                  textTransform: "uppercase",
                  animation: "badgePulse 1.2s infinite alternate",
                }}
              >
                NEW
              </span>
              <style>
                {`
                                @keyframes badgePulse {
                                    0% { box-shadow: 0 0 6px 2px #ffc107; }
                                    100% { box-shadow: 0 0 8px 4px #ff9800; }
                                }
                                `}
              </style>
            </div>
          ),
          children: loadingModelCompressor ? (
            <div style={{ padding: 24 }}>
              <Skeleton active />
            </div>
          ) : (
            <Grid container spacing={2} style={{ paddingLeft: 24, paddingRight: 24 }}>
              <Grid item xs={12}>
                <div className="mb-1 font-medium text-[15px]">Filter</div>
                <div className="flex gap-2 mb-2 p-4">
                  <div className="flex flex-col w-[50%]">
                    <span className="text-[13px] font-medium mb-0.5">Year</span>
                    {/* AntdSelect ยังต้องใช้ style เดิม */}
                    <AntdSelect
                      style={{ width: "100%" }}
                      size="large"
                      placeholder="Select Year"
                      value={selectedYear}
                      onChange={(val: number) => setSelectedYear(val)}
                    >
                      {yearOptions.map((y) => (
                        <AntdSelect.Option key={y} value={y}>
                          {y}
                        </AntdSelect.Option>
                      ))}
                    </AntdSelect>
                  </div>
                  <div className="flex flex-col w-[50%]">
                    <span className="text-[13px] font-medium mb-0.5">Month</span>
                    <AntdSelect
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Select Month"
                      value={selectedMonths}
                      size="large"
                      onChange={(vals: number[]) => setSelectedMonths(vals)}
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <AntdSelect.Option key={i + 1} value={i + 1}>
                          {_months[i]}
                        </AntdSelect.Option>
                      ))}
                    </AntdSelect>
                  </div>
                </div>
                <div className="flex gap-2 mb-4 pb-4 px-4">
                  <div className="flex flex-col w-[100%]">
                    <span className="text-[13px] font-medium mb-0.5">Model</span>
                    <AntdSelect
                      size="large"
                      mode="multiple"
                      allowClear
                      placeholder="Select Model"
                      value={selectedOptions}
                      onChange={handleSelectModelCompressor}
                      options={selectModelCompressorOptions}
                    />
                  </div>
                </div>
              </Grid>

              <div
                className="px-6 w-full flex gap-6 dashboard-flex-responsive"
                style={{ flexDirection: "row", flexWrap: "wrap" }}
              >
                <div
                  className="h-[400px] bg-white rounded-lg shadow p-2 flex flex-col chart-section"
                  style={{
                    width: "65%",
                    minWidth: 320,
                    flex: "1 1 400px",
                  }}
                >
                  <div className="font-semibold mb-2 text-center flex items-center justify-center gap-2">
                    <StorageIcon fontSize="small" color="primary" />
                    <TrendingUpIcon fontSize="small" color="success" />
                    <AssignmentIcon fontSize="small" color="warning" />
                    <span>Stock / Sale / Current Plan</span>
                  </div>
                  <Bar
                    data={{
                      labels: [
                        ...new Set([
                          ...(dashboardByModelData.stock || []).map((item: any) => item.model),
                          ...(dashboardByModelData.sale || []).map((item: any) => item.model),
                          ...(dashboardByModelData.plan || []).map((item: any) => item.model),
                        ]),
                      ],
                      datasets: [
                        // Sale bar
                        {
                          label: "Sale",
                          data: [
                            ...new Set([
                              ...(dashboardByModelData.stock || []).map((item: any) => item.model),
                              ...(dashboardByModelData.sale || []).map((item: any) => item.model),
                              ...(dashboardByModelData.plan || []).map((item: any) => item.model),
                            ]),
                          ].map(
                            (model) =>
                              (dashboardByModelData.sale || []).find((s: any) => s.model === model)?.inventory ?? 0
                          ),
                          backgroundColor: "#ff9800", // orange
                        },
                        // Plan bar
                        {
                          label: "Plan",
                          data: [
                            ...new Set([
                              ...(dashboardByModelData.stock || []).map((item: any) => item.model),
                              ...(dashboardByModelData.sale || []).map((item: any) => item.model),
                              ...(dashboardByModelData.plan || []).map((item: any) => item.model),
                            ]),
                          ].map(
                            (model) =>
                              (dashboardByModelData.plan || []).find((s: any) => s.model === model)?.inventory ?? 0
                          ),
                          backgroundColor: "#1976d2", // blue
                          stack: "stack-group-2",
                        },
                        // Stock bar (ส่วนที่ 3 (stack))
                        {
                          label: "Stock",
                          data: [
                            ...new Set([
                              ...(dashboardByModelData.stock || []).map((item: any) => item.model),
                              ...(dashboardByModelData.sale || []).map((item: any) => item.model),
                              ...(dashboardByModelData.plan || []).map((item: any) => item.model),
                            ]),
                          ].map(
                            (model) =>
                              (dashboardByModelData.stock || []).find((s: any) => s.model === model)?.inventory ?? 0
                          ),
                          backgroundColor: "#43a047", // green
                          stack: "stack-group-1",
                        },
                        // Stock bar (ส่วนที่ 2: ส่วนต่างของ plan - stock)
                        {
                          label: "Diff Sale",
                          data: [
                            ...new Set([
                              ...(dashboardByModelData.stock || []).map((item: any) => item.model),
                              ...(dashboardByModelData.sale || []).map((item: any) => item.model),
                              ...(dashboardByModelData.plan || []).map((item: any) => item.model),
                            ]),
                          ].map((model) => {
                            const sale =
                              (dashboardByModelData.sale || []).find((s: any) => s.model === model)?.inventory ?? 0;
                            const stock =
                              (dashboardByModelData.stock || []).find((s: any) => s.model === model)?.inventory ?? 0;
                            return sale > stock ? sale - stock : 0;
                          }),
                          backgroundColor: "rgba(255,0,0,0.18)", // สีแดงบางๆ
                          stack: "stack-group-1",
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          display: true,
                          position: "top",
                          align: "center",
                          labels: {
                            font: { weight: "bold", size: 14 },
                          },
                        },
                        title: { display: false },
                        datalabels: {
                          color: (context: any) => {
                            // ให้ label สีตัดกับ bar
                            const bg = context.dataset.backgroundColor;
                            if (bg === "#1976d2") return "#fff"; // plan (น้ำเงิน) -> ขาว
                            if (bg === "#43a047") return "#fff"; // stock (เขียว) -> ขาว
                            if (bg === "#ff9800") return "#fff"; // sale (ส้ม) -> ขาว
                            return "#222";
                          },
                          font: (context: any) => {
                            // ปรับขนาด font ตามจำนวนโมเดลที่เลือก
                            const uniqueModels = [
                              ...new Set([
                                ...(dashboardByModelData.stock || []).map((item: any) => item.model),
                                ...(dashboardByModelData.sale || []).map((item: any) => item.model),
                                ...(dashboardByModelData.plan || []).map((item: any) => item.model),
                              ]),
                            ];
                            let base = 24;
                            if (uniqueModels.length > 8) base = 7;
                            else if (uniqueModels.length > 5) base = 9;
                            else if (uniqueModels.length > 3) base = 12;
                            return { weight: "bold", size: base };
                          },
                          formatter: function (value: number) {
                            return value ? value.toLocaleString("en-US") : "";
                          },
                        },
                      },
                      indexAxis: "x", // แนวตั้ง
                      scales: {
                        x: {
                          stacked: false,
                          ticks: {
                            stepSize: AxisStep,
                            font: { weight: "bold", size: 13 },
                          },
                        },
                        y: {
                          stacked: true,
                          min: 0,
                          ticks: {
                            autoSkip: false,
                            font: { weight: "bold", size: 13 },
                          },
                        },
                      },
                    }}
                  />
                </div>
                <div
                  className="bg-white rounded-lg shadow p-2 mt-4 flex flex-col table-section"
                  style={{
                    width: "35%",
                    minWidth: 320,
                    flex: "1 1 320px",
                  }}
                >
                  <div className="flex items-center mb-2">
                    <AssignmentIcon fontSize="small" style={{ color: "#5c5fc8", marginRight: 8 }} />
                    <span className="font-semibold" style={{ fontWeight: 700, fontSize: 16 }}>
                      รายละเอียดข้อมูล
                    </span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="border border-[#e0e0e0] p-2 font-bold">Model</th>
                          <th className="border border-[#e0e0e0] p-2 font-bold bg-[#ff980010]">Sale</th>
                          <th className="border border-[#e0e0e0] p-2 font-bold" style={{ background: "#1976d210" }}>
                            Plan
                          </th>
                          <th className="border border-[#e0e0e0] p-2 font-bold" style={{ background: "#43a04710" }}>
                            Inventory
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {(dashboardByModelData?.data || []).map((item: any) => (
                          <tr key={item.model}>
                            <td className="border border-[#e0e0e0] p-2 font-semibold text-[14px]">{item.model}</td>
                            <td
                              className="border border-[#e0e0e0] p-2 text-right font-semibold text-[14px]"
                              style={{ background: "#ff980008" }}
                            >
                              {item.summary_sale?.toLocaleString?.() ?? "-"}
                            </td>
                            <td
                              className="border border-[#e0e0e0] p-2 text-right font-semibold text-[14px]"
                              style={{ background: "#1976d208" }}
                            >
                              {item.summary_plan?.toLocaleString?.() ?? "-"}
                            </td>
                            <td
                              className="border border-[#e0e0e0] p-2 text-right font-semibold text-[14px]"
                              style={{ background: "#43a04708" }}
                            >
                              {item.summary_stock?.toLocaleString?.() ?? "-"}
                            </td>
                          </tr>
                        ))}
                        {/* เพิ่มแถว Total */}
                        {Array.isArray(dashboardByModelData?.data) && dashboardByModelData.data.length > 0 && (
                          <tr>
                            <td
                              className="border border-[#e0e0e0] p-2 font-bold text-right bg-gray-100 text-md"
                              colSpan={1}
                            >
                              Total
                            </td>
                            <td
                              className="border border-[#e0e0e0] p-2 font-bold text-right"
                              style={{ background: "#ff98001a" }}
                            >
                              {dashboardByModelData.data
                                .reduce((sum: number, item: any) => sum + (item.summary_sale || 0), 0)
                                .toLocaleString("en")}
                            </td>
                            <td
                              className="border border-[#e0e0e0] p-2 font-bold text-right"
                              style={{ background: "#1976d21a" }}
                            >
                              {dashboardByModelData.data
                                .reduce((sum: number, item: any) => sum + (item.summary_plan || 0), 0)
                                .toLocaleString("en")}
                            </td>
                            <td
                              className="border border-[#e0e0e0] p-2 font-bold text-right"
                              style={{ background: "#43a0471a" }}
                            >
                              {dashboardByModelData.data
                                .reduce((sum: number, item: any) => sum + (item.summary_stock || 0), 0)
                                .toLocaleString("en")}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              <style>
                {`
                                    @media (max-width: 950px) {
                                        .dashboard-flex-responsive {
                                            flex-direction: column !important;
                                        }
                                        .dashboard-flex-responsive .chart-section,
                                        .dashboard-flex-responsive .table-section {
                                            width: 100% !important;
                                            min-width: 0 !important;
                                        }
                                        .dashboard-flex-responsive .table-section {
                                            margin-top: 24px !important;
                                        }
                                    }
                                    `}
              </style>
            </Grid>
          ),
        },
      ]}
    />
  );
}

export default Dashboard;
