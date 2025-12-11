//@ts-nocheck
import { useEffect, useMemo, useState } from "react";
import { ReactGrid, Column, Row, Cell } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { PropUkeInfo } from "../interface";

import { Button, Radio, Space, Input, Select } from "antd";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";
import { AiOutlineReload } from "react-icons/ai";
import moment from "moment";
import { APIUkeharaiData } from "../Service";
import * as XLSX from "xlsx";

function UkeharaiNew() {
  const [modelGroup, setModelGroup] = useState<string>("SCR");
  const [ym, setYmd] = useState<string>(moment().subtract(8, "hour").format("YYYYMM"));
  const [searchText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [rowData, setRowData] = useState<PropUkeInfo[]>([]);
  const [filteredData, setFilteredData] = useState<PropUkeInfo[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [availableTypes, setAvailableTypes] = useState<string[]>([]);
  const [selectedModels, setSelectedModels] = useState<string[]>([]);
  const [availableModels, setAvailableModels] = useState<string[]>([]);
  const [selectedPalletTypes, setSelectedPalletTypes] = useState<string[]>([]);
  const [availablePalletTypes, setAvailablePalletTypes] = useState<string[]>([]);
  const [selectedSBUs, setSelectedSBUs] = useState<string[]>([]);
  const [availableSBUs, setAvailableSBUs] = useState<string[]>([]);
  const [dataVersionKey, setDataVersionKey] = useState<string>("");

  // Dynamically get current and next month in 'YYYYMM' format, minus 8 hours from now
  const getMonthStrings = () => {
    // Subtract 8 hours (28800000 ms) from current time
    const now = new Date(Date.now() - 8 * 60 * 60 * 1000);
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const pad = (n: number) => n.toString().padStart(2, "0");
    const currentMonth = `${year}${pad(month)}`;
    let nextMonthYear = year;
    let nextMonthNum = month + 1;
    if (nextMonthNum > 12) {
      nextMonthNum = 1;
      nextMonthYear += 1;
    }
    const nextMonth = `${nextMonthYear}${pad(nextMonthNum)}`;
    return [currentMonth, nextMonth];
  };

  const [currentMonth, nextMonth] = getMonthStrings();

  const getColumns = (): Column[] => {
    const baseColumns: Column[] = [
      { columnId: "model", width: 130 },
      { columnId: "sebango", width: 100 },
      { columnId: "column", width: 220 },
      { columnId: "pltype", width: 100 },
      { columnId: "modelgroup", width: 100 },
      { columnId: "sbu", width: 150 },
      { columnId: "line", width: 80 },
      { columnId: "customer", width: 120 },
    ];

    const monthColumns: Column[] = [];
    [currentMonth, nextMonth].forEach((monthStr) => {
      // Add day columns
      for (let i = 1; i <= 31; i++) {
        const day = i.toString().padStart(2, "0");
        monthColumns.push({
          columnId: `${monthStr}${day}`,
          width: 60,
        });
      }
      // Add total column for month
      monthColumns.push({
        columnId: `total_${monthStr}`,
        width: 100,
      });
    });

    return [...baseColumns, ...monthColumns, { columnId: "total", width: 100 }];
  };

  const getHeaderRow = (): Row => {
    const headerCells: Cell[] = [
      { type: "header", text: "Models" } as any,
      { type: "header", text: "Sebango" } as any,
      { type: "header", text: "Column" } as any,
      { type: "header", text: "Pallet Type" } as any,
      { type: "header", text: "Grp Model" } as any,
      { type: "header", text: "SBU" } as any,
      { type: "header", text: "Line" } as any,
      { type: "header", text: "Customer" } as any,
    ];

    [currentMonth, nextMonth].forEach((_, monthIndex) => {
      // Add individual day headers
      for (let i = 1; i <= 31; i++) {
        const day = i.toString().padStart(2, "0");
        headerCells.push({
          type: "header",
          text: `D${day}`,
          className: "font-semibold",
          style: {
            backgroundColor: monthIndex === 0 ? "#e3f2fd" : "#fff3e0",
            fontSize: "12px",
          },
        } as any);
      }
      // Add total header for month
      headerCells.push({
        type: "header",
        text: `Total`,
        style: {
          backgroundColor: monthIndex === 0 ? "#bbdefb" : "#ffcc80",
          fontWeight: "bold",
        },
      } as any);
    });

    headerCells.push({
      type: "header",
      text: "Total All",
      style: {
        backgroundColor: "#c8e6c9",
        fontWeight: "bold",
      },
    } as any);

    return {
      rowId: "header",
      cells: headerCells,
    };
  };

  // Create a second header row for month names
  const getMonthHeaderRow = (): Row => {
    const monthHeaderCells: Cell[] = [
      {
        type: "header",
        rowspan: 2,
        text: "Models",
        className: "font-bold bg-gray-100",
      },
      {
        type: "header",
        rowspan: 2,
        text: "Sebango",
        className: "font-bold bg-gray-100",
      },
      {
        type: "header",
        rowspan: 2,
        text: "Type",
        className: "font-bold bg-gray-100",
      },
      {
        type: "header",
        rowspan: 2,
        text: "Pallet Type",
        className: "font-bold bg-gray-100",
      },
      {
        type: "header",
        rowspan: 2,
        text: "Grp Model",
        width: 500,
        resizable: true,
        className: "font-bold bg-gray-100",
      },
      {
        type: "header",
        rowspan: 2,
        text: "SBU",
        className: "font-bold bg-gray-100",
      },
      {
        type: "header",
        rowspan: 2,
        text: "Line",
        className: "font-bold bg-gray-100",
      },
      {
        type: "header",
        rowspan: 2,
        text: "Customer",
        className: "font-bold bg-gray-100",
      },
    ];

    [currentMonth, nextMonth].forEach((monthStr, monthIndex) => {
      const monthName = monthIndex === 0 ? `${monthStr} (Current Month)` : `${monthStr} (Next Month)`;

      // Add month header cell
      monthHeaderCells.push({
        type: "header",
        text: monthName,
        colspan: 31,
        style: {
          backgroundColor: monthIndex === 0 ? "#1976d2" : "#f57c00",
          color: "white",
          fontWeight: "bold",
          textAlign: "center",
        },
      });

      // Add empty cells for the remaining day columns (30 more cells for days 2-31)
      for (let i = 1; i <= 30; i++) {
        monthHeaderCells.push({
          type: "header",
          text: "",
          style: {
            backgroundColor: monthIndex === 0 ? "#1976d2" : "#f57c00",
          },
        });
      }

      // Add total header for month with rowspan=2
      // Get month short name (e.g., "Jan", "Feb", etc.)
      const monthNum = parseInt(monthStr.substring(4, 6));
      const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      const monthShortName = monthNames[monthNum - 1];

      monthHeaderCells.push({
        type: "header",
        text: `Total : ${monthShortName}`,
        rowspan: 2,
        style: {
          backgroundColor: monthIndex === 0 ? "#bbdefb" : "#ffcc80",
          fontWeight: "bold",
        },
      });
    });

    monthHeaderCells.push({
      type: "header",
      text: "Grand Total",
      rowspan: 2,
      style: {
        backgroundColor: "#4caf50",
        color: "white",
        fontWeight: "bold",
      },
    });

    return {
      rowId: "month-header",
      cells: monthHeaderCells,
    };
  };

  const getRows = (data: PropUkeInfo[]): Row[] => {
    const monthHeaderRow = getMonthHeaderRow();
    const headerRow = getHeaderRow();
    const columns = getColumns();

    // If no data, show "no data found" message
    if (data.length === 0) {
      const noDataCells: Cell[] = new Array(columns.length).fill(null).map((_, index) => ({
        type: "text" as const,
        text: index === 0 ? "ไม่พบข้อมูลที่ค้นหา" : "",
        style: {
          textAlign: index === 0 ? ("center" as const) : ("left" as const),
          fontStyle: "italic",
          color: "#666",
          padding: "20px",
        },
      }));

      const noDataRow: Row = {
        rowId: "no-data",
        cells: noDataCells,
      };

      return [monthHeaderRow, headerRow, noDataRow];
    }

    // Create a color map for models
    const modelColorMap = new Map<string, string>();

    const dataRows: Row[] = [];
    let previousModel = "";

    data.forEach((item, index) => {
      // Add separator row when model changes (except for first row)
      if (item.model !== previousModel && index > 0) {
        const separatorCells: Cell[] = new Array(columns.length).fill(null).map(() => ({
          type: "text" as const,
          text: "",
          style: { backgroundColor: "#f5f5f5", height: "20px", borderTop: "1px solid #ddd" },
        }));

        dataRows.push({
          rowId: `separator-${index}`,
          cells: separatorCells,
        });
      }

      // Assign color to model if not already assigned
      const backgroundColor = modelColorMap.get(item.model || "") || "#ffffff";
      const isItemType = (item as any).type_item === "item";

      const cells: Cell[] = [
        { type: "text", text: item.model || "" },
        {
          type: "text",
          text: item.sebango || "",
          className: "cell-content-center",
        },
        {
          type: "text",
          text: item.type_text || "",
          style: {
            paddingLeft: isItemType ? "32px" : undefined,
          },
        },
        { type: "text", text: item.pltype || "" },
        {
          type: "text",
          text: item.modelgroup || "",
        },
        { type: "text", text: item.sbu || "" },
        { type: "text", text: item.line || "" },
        { type: "text", text: item.customer || "" },
      ];

      [currentMonth, nextMonth].forEach((monthStr, monthIndex) => {
        // Add day cells with currency formatting
        for (let i = 1; i <= 31; i++) {
          const day = i.toString().padStart(2, "0");
          const fieldKey = `${monthStr}${day}`;
          const value = (item as any)[fieldKey];
          const numValue = value && value !== "0" && value !== 0 ? Number(value) : null;
          const displayText = numValue !== null ? numValue.toLocaleString() : "";
          const isNegativeOrZero = numValue !== null && numValue <= 0;
          cells.push({
            type: "text",
            text: displayText ?? "",
            className: `cell-content-right font-semibold ${
              isNegativeOrZero
                ? "bg-red-500/10"
                : numValue !== null && numValue > 0
                ? "bg-white"
                : monthIndex === 0
                ? "bg-[#e3f2fd]/50"
                : "bg-[#fff3e0]/50"
            }`,
            style: {
              background: isNegativeOrZero
                ? "#ffebee !important"
                : numValue !== null && numValue > 0
                ? "#ffffff !important"
                : backgroundColor,
              color: isNegativeOrZero ? "#d32f2f" : undefined,
            },
          });
        }
        // Add total cell for month with currency formatting
        let totalText = "";
        if (monthIndex === 0) {
          // Current month - use total_current_month
          const totalValue = (item as any).total_current_month;
          totalText = totalValue && totalValue !== 0 ? Number(totalValue).toLocaleString() : "";
        } else {
          // Next month - use total_next_month
          const totalValue = (item as any).total_next_month;
          totalText = totalValue && totalValue !== 0 ? Number(totalValue).toLocaleString() : "";
        }

        const totalValue = monthIndex === 0 ? (item as any).total_current_month : (item as any).total_next_month;
        const isTotalNegative = totalValue !== undefined && totalValue < 0;

        cells.push({
          type: "text",
          text: totalText != "0" ? totalText : "",
          className: isTotalNegative ? "text-red-500 bg-red-500/10 text-end" : "",
          style: {
            fontWeight: "bold",
          },
        });
      });

      // Add overall total with currency formatting
      const totalText = item.total && item.total !== 0 ? Number(item.total).toLocaleString() : "";
      const totalAllMonth = typeof item.total_all_month !== "undefined" ? item.total_all_month : 0;
      const isTotalNegative = item.total !== undefined && item.total < 0;

      cells.push({
        type: "text",
        text: totalAllMonth != "0" ? Number(totalAllMonth).toLocaleString("en") : "",
        className: isTotalNegative ? "text-red-500 font-semibold bg-red-500/10" : "",
        style: {
          textAlign: "right" as const,
          fontWeight: "bold",
        },
      });

      dataRows.push({
        rowId: `row-${index}`,
        cells,
      });

      previousModel = item.model || "";
    });

    return [monthHeaderRow, headerRow, ...dataRows];
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    applyFilters(value, selectedTypes);
  };

  const handleTypeChange = (types: string[]) => {
    setSelectedTypes(types);
    applyFilters(searchText, types);
  };

  const handleModelChange = (models: string[]) => {
    setSelectedModels(models);
    applyFilters(searchText, selectedTypes, models, selectedPalletTypes, selectedSBUs);
  };

  const handlePalletTypeChange = (palletTypes: string[]) => {
    setSelectedPalletTypes(palletTypes);
    applyFilters(searchText, selectedTypes, selectedModels, palletTypes, selectedSBUs);
  };

  const handleSBUChange = (sbus: string[]) => {
    setSelectedSBUs(sbus);
    applyFilters(searchText, selectedTypes, selectedModels, selectedPalletTypes, sbus);
  };

  const applyFilters = (
    search: string,
    types: string[],
    models: string[] = selectedModels,
    palletTypes: string[] = selectedPalletTypes,
    sbus: string[] = selectedSBUs
  ) => {
    let filtered = rowData;

    // Apply model filter
    if (models.length > 0) {
      filtered = filtered.filter((item) => models.includes(item.model || ""));
    }

    // Apply type filter
    if (types.length > 0) {
      filtered = filtered.filter((item) => types.includes(item.type_text || ""));
    }

    // Apply pallet type filter
    if (palletTypes.length > 0) {
      filtered = filtered.filter((item) => palletTypes.includes(item.pltype || ""));
    }

    // Apply SBU filter
    if (sbus.length > 0) {
      filtered = filtered.filter((item) => sbus.includes(item.sbu || ""));
    }

    // Apply search filter
    if (search !== "") {
      filtered = filtered.filter((item) =>
        Object.values(item).some((val) => String(val).toLowerCase().includes(search))
      );
    }

    setFilteredData(filtered);
  };

  const FuncGetUkeInfoRedis = async () => {
    setLoading(true);
    try {
      const res = await APIUkeharaiData(modelGroup, "get");
      setRowData(res.data);
      setDataVersionKey(res.key || "");

      // Extract unique types for filter options
      const types = [...new Set(res.data.map((item: any) => item.type_text).filter(Boolean))];
      setAvailableTypes(types);
      setSelectedTypes([]);

      // Extract unique models for filter options
      const models = [...new Set(res.data.map((item: any) => item.model).filter(Boolean))];
      setAvailableModels(models);
      setSelectedModels([]);

      // Extract unique pallet types for filter options
      const palletTypes = [...new Set(res.data.map((item: any) => item.pltype).filter(Boolean))];
      setAvailablePalletTypes(palletTypes);
      setSelectedPalletTypes([]);

      // Extract unique SBUs for filter options
      const sbus = [...new Set(res.data.map((item: any) => item.sbu).filter(Boolean))];
      setAvailableSBUs(sbus);
      setSelectedSBUs([]);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    FuncGetUkeInfoRedis();
  }, [modelGroup]);

  useEffect(() => {
    setFilteredData(rowData);
  }, [rowData]);

  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const rows = getRows(filteredData);
  const columns = getColumns();

  const handleRefreshData = async () => {
    setLoading(true);
    try {
      const res = await APIUkeharaiData(modelGroup, "set");
      if (res != null) {
        // After setting data, get the updated data
        await FuncGetUkeInfoRedis();
      }
    } catch (error) {
      console.error("Error refreshing data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to format version key to readable date
  const formatVersionKey = (key: string) => {
    if (!key || key.length < 12) return key;

    const last12 = key.slice(-12);
    const datepart = last12.substring(0, 8); // YYYYMMDD
    const timepart = last12.substring(8, 12); // HHMM

    const year = datepart.substring(0, 4);
    const month = datepart.substring(4, 6);
    const day = datepart.substring(6, 8);
    const hour = timepart.substring(0, 2);
    const minute = timepart.substring(2, 4);

    return `ข้อมูลอัพเดตล่าสุด ${day}/${month}/${year} ${hour}:${minute}`;
  };

  // Function to export data to Excel
  const exportToExcel = () => {
    if (filteredData.length === 0) {
      alert("ไม่มีข้อมูลสำหรับการส่งออก");
      return;
    }

    // Prepare data for export
    const exportData = filteredData.map((item) => {
      const row: any = {
        Model: item.model || "",
        Sebango: item.sebango || "",
        Type: item.type_text || "",
        "Pallet Type": item.pltype || "",
        "Group Model": item.modelgroup || "",
        SBU: item.sbu || "",
        Line: item.line || "",
        Customer: item.customer || "",
      };

      // Add day columns for both months
      [currentMonth, nextMonth].forEach((monthStr) => {
        for (let i = 1; i <= 31; i++) {
          const day = i.toString().padStart(2, "0");
          const fieldKey = `${monthStr}${day}`;
          const value = (item as any)[fieldKey];
          const numValue = value && value !== "0" && value !== 0 ? Number(value) : null;
          row[`${monthStr}-D${day}`] = numValue || "0";
        }

        // Add monthly totals
        const totalKey = `total_${monthStr}`;
        const totalValue = (item as any)[totalKey];
        row[`Total ${monthStr}`] = totalValue && totalValue !== 0 ? totalValue : "0";
      });

      // Add grand total
      row["Grand Total"] = item.total && item.total !== 0 ? item.total : "";

      return row;
    });

    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Set column widths
    const colWidths = [
      { wch: 15 }, // Model
      { wch: 12 }, // Sebango
      { wch: 20 }, // Type
      { wch: 15 }, // Pallet Type
      { wch: 15 }, // Group Model
      { wch: 10 }, // SBU
      { wch: 8 }, // Line
      { wch: 15 }, // Customer
    ];

    // Add widths for day columns and totals
    for (let i = 0; i < 31 * 2; i++) {
      colWidths.push({ wch: 8 }); // Day columns
    }
    colWidths.push({ wch: 12 }); // Total current month
    colWidths.push({ wch: 12 }); // Total next month
    colWidths.push({ wch: 12 }); // Grand total

    ws["!cols"] = colWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Ukeharai Data");

    // Generate filename
    const filename = `UKEHARAI-${currentMonth}-${nextMonth}-${modelGroup}.xlsx`;

    // Save file
    XLSX.writeFile(wb, filename);
  };

  return (
    <div style={containerStyle} className="p-3 flex flex-col gap-3 h-full">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            {dataVersionKey && (
              <span className="text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-md border border-blue-200">
                {formatVersionKey(dataVersionKey)}
              </span>
            )}
            {/* <Button
              type="default"
              icon={<AiOutlineReload />}
              onClick={handleRefreshData}
              loading={loading}
              disabled={loading}
            >
              Refresh Data
            </Button> */}
          </div>
          <Space>
            Model Group :
            <Radio.Group
              value={modelGroup}
              onChange={(e) => setModelGroup(e.target.value)}
              disabled={loading}
              buttonStyle="solid"
            >
              <Radio.Button value="SCR">SCR</Radio.Button>
              <Radio.Button value="1YC">1YC</Radio.Button>
              <Radio.Button value="2YC">2YC</Radio.Button>
              <Radio.Button value="ODM">ODM</Radio.Button>
              <Radio.Button value="PVL">PVL</Radio.Button>
            </Radio.Group>
          </Space>
        </div>
        <div className="flex items-center justify-end gap-2">
          <Button type="primary" icon={<AiOutlineSearch />} onClick={() => FuncGetUkeInfoRedis()} loading={loading}>
            ค้นหา
          </Button>
          <Button icon={<AiOutlineDownload />} disabled={loading || filteredData.length === 0} onClick={exportToExcel}>
            โหลดข้อมูล
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {(availableModels.length > 0 ||
          availableTypes.length > 0 ||
          availablePalletTypes.length > 0 ||
          availableSBUs.length > 0) && (
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-4 flex-wrap">
              {availableModels.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">Filter by Model:</span>
                  <Select
                    mode="multiple"
                    placeholder="Select models to filter"
                    value={selectedModels}
                    onChange={handleModelChange}
                    options={availableModels.map((model) => ({
                      label: model,
                      value: model,
                    }))}
                    style={{ minWidth: 200, maxWidth: 300 }}
                    allowClear
                    showSearch
                    disabled={loading}
                    filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                  />
                  {selectedModels.length > 0 && (
                    <Button size="small" onClick={() => handleModelChange([])} type="link" disabled={loading}>
                      Clear All
                    </Button>
                  )}
                </div>
              )}

              {availableTypes.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">Filter by Type:</span>
                  <Select
                    mode="multiple"
                    placeholder="Select types to filter"
                    value={selectedTypes}
                    onChange={handleTypeChange}
                    options={availableTypes.map((type) => ({
                      label: type,
                      value: type,
                    }))}
                    style={{ minWidth: 200, maxWidth: 300 }}
                    allowClear
                    showSearch
                    disabled={loading}
                    filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                  />
                  {selectedTypes.length > 0 && (
                    <Button size="small" onClick={() => handleTypeChange([])} type="link" disabled={loading}>
                      Clear All
                    </Button>
                  )}
                </div>
              )}

              {availablePalletTypes.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">Filter by Pallet Type:</span>
                  <Select
                    mode="multiple"
                    placeholder="Select pallet types to filter"
                    value={selectedPalletTypes}
                    onChange={handlePalletTypeChange}
                    options={availablePalletTypes.map((palletType) => ({
                      label: palletType,
                      value: palletType,
                    }))}
                    style={{ minWidth: 200, maxWidth: 300 }}
                    allowClear
                    showSearch
                    disabled={loading}
                    filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                  />
                  {selectedPalletTypes.length > 0 && (
                    <Button size="small" onClick={() => handlePalletTypeChange([])} type="link" disabled={loading}>
                      Clear All
                    </Button>
                  )}
                </div>
              )}

              {availableSBUs.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-600 font-medium">Filter by SBU:</span>
                  <Select
                    mode="multiple"
                    placeholder="Select SBUs to filter"
                    value={selectedSBUs}
                    onChange={handleSBUChange}
                    options={availableSBUs.map((sbu) => ({
                      label: sbu,
                      value: sbu,
                    }))}
                    style={{ minWidth: 200, maxWidth: 300 }}
                    allowClear
                    showSearch
                    disabled={loading}
                    filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
                  />
                  {selectedSBUs.length > 0 && (
                    <Button size="small" onClick={() => handleSBUChange([])} type="link" disabled={loading}>
                      Clear All
                    </Button>
                  )}
                </div>
              )}
            </div>

            <Input.Search
              placeholder="ค้นหาข้อมูล..."
              value={searchText}
              onChange={handleSearchChange}
              style={{ width: 250 }}
              allowClear
              disabled={loading}
              onClear={() => {
                setSearchText("");
                applyFilters("", selectedTypes, selectedModels, selectedPalletTypes, selectedSBUs);
              }}
            />
          </div>
        )}
      </div>

      <div
        style={{ height: "calc(100vh - 200px)", overflow: "auto", position: "relative" }}
        className="reactgrid-content"
      >
        {loading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 1000,
              fontSize: "16px",
              color: "#1976d2",
              pointerEvents: "all",
            }}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span>กำลังโหลดข้อมูล...</span>
            </div>
          </div>
        )}
        <div style={{ pointerEvents: loading ? "none" : "auto", opacity: loading ? 0.5 : 1 }}>
          <ReactGrid
            rows={rows}
            columns={columns}
            enableRowSelection={false}
            enableRangeSelection={false}
            stickyLeftColumns={4}
            stickyRightColumns={1}
            stickyTopRows={2}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <span className="text-gray-600">
          จำนวนข้อมูล:{" "}
          {searchText ||
          selectedTypes.length > 0 ||
          selectedModels.length > 0 ||
          selectedPalletTypes.length > 0 ||
          selectedSBUs.length > 0
            ? `${filteredData.length} / ${rowData.length}`
            : rowData.length}{" "}
          รายการ
        </span>
      </div>
    </div>
  );
}

export default UkeharaiNew;
