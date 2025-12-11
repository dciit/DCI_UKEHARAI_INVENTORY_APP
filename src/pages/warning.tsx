import { CircularProgress, Grid } from "@mui/material";
import moment from "moment";
import { Fragment, useEffect, useRef, useState } from "react";
import { API_GET_WARNING } from "../Service";
import { download, generateCsv, mkConfig } from "export-to-csv";
import { useReactToPrint } from "react-to-print";
import { Button, Radio, Typography } from "antd";
import { AiOutlineFilePdf } from "react-icons/ai";
import { AiOutlineExport } from "react-icons/ai";
import { FaKeyboard } from "react-icons/fa6";
export interface MWarning {
  pdt?: number;
  rwq?: number;
  hwh?: number;
  unw?: number;
  model: string;
  sbu: string;
  sebango: string;
  customer: string[];
  pltype: Pltype[];
  total: number;
  hold?: number;
  hold_item: PropHoldItem[];
  inventory: number;
  inbound?: number;
  inboundType?: string;
  bold?: number;
  listSale: List[];
  listInventory: List[];
  listSaleExcel: MItemWarningExcel[];
  saleToday: number;
  inventoryUnEqual?: boolean;
}
export interface PropHoldItem {
  wc: string;
  qty: number;
}
export interface MItemWarningExcel {
  model: string;
  customer: string;
  pltype: string;
  data: List[];
}
export interface List {
  date: string;
  value: number;
  customer: null;
  pltype: string;
}

export interface Pltype {
  customer: string;
  pltype: string[];
}
export interface MColor {
  customer: string;
  color: string;
}
const { Paragraph } = Typography;
const COLORS = [
  "bg-[#4dc9f6ab]",
  "bg-[#f67019ab]",
  "bg-[#f53794ab]",
  "bg-[#537bc4ab]",
  "bg-[#acc236ab]",
  "bg-[#166a8fab]",
  "bg-[#00a950ab]",
  "bg-[#58595bab]",
  "bg-[#8549baab]",
  "bg-[#ddddddab]",
  "bg-[#dddddd]",
  "bg-[#3f51b5ab]",
  "bg-[#f44336ab]",
  "bg-[#dddddd]",
  "bg-[#dddddd]",
  "bg-[#dddddd]",
  "bg-[#dddddd]",
];
function Warning() {
  const rModelGroup: string[] = ["ALL", "1YC", "2YC", "SCR", "ODM", "PVL"];
  const [modelGroup, setModelGroup] = useState<string>(rModelGroup[0]);
  const refPDF = useRef(null);
  const [rndColor, setRndColor] = useState<MColor[]>([]);
  const [load, setLoad] = useState<boolean>(false);
  const [data, setData] = useState<MWarning[]>([]);
  const [once, setOnce] = useState<boolean>(true);
  const dtExcel = moment().add(-8, "hours");
  const currentDT = moment().add(-8, "hours");
  const dateDef = moment().format("YYYYMMDD");
  const [DMY, setDMY] = useState<string>("-");
  const [loop, setLoop] = useState<boolean>(false);
  // const [loadPullFGInv, setLoadPullFGInv] = useState<boolean>(false);
  useEffect(() => {
    if (loop) {
      const intervalId = setInterval(() => {
        if (moment().format("YYYYMMDD") !== dateDef) {
          location.reload();
        } else {
          loadData();
        }
      }, 900000); // 15 minutes
      return () => clearInterval(intervalId);
    }
  }, [loop]); // `loop` เป็น dependency

  // Animation สลับสีพื้นหลังทุกๆ 3 วินาที
  async function handleSearch() {
    setLoad(true);
    await loadData();
    setOnce(false);
  }
  const loadData = async () => {
    let res = await API_GET_WARNING("1");
    let customer: string[] = [];
    if (modelGroup == "1YC" || modelGroup == "2YC") {
      res.data = res.data.filter((o: MWarning) => o.model.substring(0, 1) == modelGroup.substring(0, 1));
    } else if (modelGroup == "SCR") {
      res.data = res.data.filter((o: MWarning) => o.model.substring(0, 1) == "J");
    } else if (modelGroup == "ODM") {
      res.data = res.data.filter(
        (o: MWarning) =>
          !["1Y", "2Y"].includes(o.model.substring(0, 2)) && !["J", "3"].includes(o.model.substring(0, 1))
      );
    } else if (modelGroup == "PVL") {
      res.data = res.data.filter(
        (o: MWarning) =>
          !["1Y", "2Y"].includes(o.model.substring(0, 2)) && !["J", "D", "M", "Q"].includes(o.model.substring(0, 1))
      );
    }
    res.data
      .map((o: MWarning) => o.customer)
      .map((x: string[]) => {
        customer = customer.concat(x);
      });
    let rnd: MColor[] = [];
    [...new Set(customer)].map((o: string, i: number) => {
      rnd.push({
        color: COLORS[i],
        customer: o,
      });
    });
    setRndColor([...rnd]);
    setData(res.data);
    setDMY(res.dmy);
  };
  useEffect(() => {
    setLoad(false);
    setLoop(true);
  }, [data]);
  useEffect(() => {
    if (once == true) {
      init();
    }
  }, [once]);
  const init = async () => {
    await handleSearch();
  };
  useEffect(() => {
    setLoop(false);
    handleSearch();
  }, [modelGroup]);
  async function handleExcel() {
    let exportData: any[] = [];
    data.map((oData: MWarning) => {
      oData.listSaleExcel.map((oItem: MItemWarningExcel) => {
        const date = moment(dtExcel.format("YYYYMMDD"));
        oItem.data = oItem.data.filter((x) => x.pltype == oItem.pltype);
        let newRow = {
          SBU: oData.sbu,
          MODEL: oData.model,
          SEBANGO: oData.sebango,
          CUSTOMER: oItem.customer,
          PLTYPE: oItem.pltype,
          DESC: "SALE PLAN & FORECAST",
          TTL: oItem.data.map((x) => x.value).reduce((a, b) => a + b),
          [`${date.format("DD-MMM")}`]: oItem.data[0].value,
          [`${date.add(1, "days").format("DD-MMM")}`]: oItem.data[1].value,
          [`${date.add(1, "days").format("DD-MMM")}`]: oItem.data[2].value,
          [`${date.add(1, "days").format("DD-MMM")}`]: oItem.data[3].value,
          [`${date.add(1, "days").format("DD-MMM")}`]: oItem.data[4].value,
          [`${date.add(1, "days").format("DD-MMM")}`]: oItem.data[5].value,
          [`${date.add(1, "days").format("DD-MMM")}`]: oItem.data[6].value,
          [`${date.add(1, "days").format("DD-MMM")}`]: oItem.data[7].value,
          [`${date.add(1, "days").format("DD-MMM")}`]: oItem.data[8].value,
          [`${date.add(1, "days").format("DD-MMM")}`]: oItem.data[9].value,
          [`${date.add(1, "days").format("DD-MMM")}`]: oItem.data[10].value,
          [`${date.add(1, "days").format("DD-MMM")}`]: oItem.data[11].value,
          [`${date.add(1, "days").format("DD-MMM")}`]: oItem.data[12].value,
          [`${date.add(1, "days").format("DD-MMM")}`]: oItem.data[13].value,
          [`${date.add(1, "days").format("DD-MMM")}`]: oItem.data[14].value,
          [`${date.add(1, "days").format("DD-MMM")}`]: oItem.data[15].value,
          [`${date.add(1, "days").format("DD-MMM")}`]: oItem.data[16].value,
        };
        exportData.push(newRow);
      });
      exportData.push({
        SBU: oData.sbu,
        MODEL: oData.model,
        SEBANGO: oData.sebango,
        CUSTOMER: "",
        PLTYPE: "",
        DESC: "INV.REMAIN",
        TTL: oData.inventory,
        [`${moment(dtExcel.format("YYYYMMDD")).format("DD-MMM")}`]:
          oData.listInventory[0].value > 0 ? oData.listInventory[0].value : 0,
        [`${moment(dtExcel.format("YYYYMMDD")).add(1, "days").format("DD-MMM")}`]:
          oData.listInventory[1].value > 0 ? oData.listInventory[1].value : 0,
        [`${moment(dtExcel.format("YYYYMMDD")).add(2, "days").format("DD-MMM")}`]:
          oData.listInventory[2].value > 0 ? oData.listInventory[2].value : 0,
        [`${moment(dtExcel.format("YYYYMMDD")).add(3, "days").format("DD-MMM")}`]:
          oData.listInventory[3].value > 0 ? oData.listInventory[3].value : 0,
        [`${moment(dtExcel.format("YYYYMMDD")).add(4, "days").format("DD-MMM")}`]:
          oData.listInventory[4].value > 0 ? oData.listInventory[4].value : 0,
        [`${moment(dtExcel.format("YYYYMMDD")).add(5, "days").format("DD-MMM")}`]:
          oData.listInventory[5].value > 0 ? oData.listInventory[5].value : 0,
        [`${moment(dtExcel.format("YYYYMMDD")).add(6, "days").format("DD-MMM")}`]:
          oData.listInventory[6].value > 0 ? oData.listInventory[6].value : 0,
        [`${moment(dtExcel.format("YYYYMMDD")).add(7, "days").format("DD-MMM")}`]:
          oData.listInventory[7].value > 0 ? oData.listInventory[7].value : 0,
        [`${moment(dtExcel.format("YYYYMMDD")).add(8, "days").format("DD-MMM")}`]:
          oData.listInventory[8].value > 0 ? oData.listInventory[8].value : 0,
        [`${moment(dtExcel.format("YYYYMMDD")).add(9, "days").format("DD-MMM")}`]:
          oData.listInventory[9].value > 0 ? oData.listInventory[9].value : 0,
        [`${moment(dtExcel.format("YYYYMMDD")).add(10, "days").format("DD-MMM")}`]:
          oData.listInventory[10].value > 0 ? oData.listInventory[10].value : 0,
        [`${moment(dtExcel.format("YYYYMMDD")).add(11, "days").format("DD-MMM")}`]:
          oData.listInventory[11].value > 0 ? oData.listInventory[11].value : 0,
        [`${moment(dtExcel.format("YYYYMMDD")).add(12, "days").format("DD-MMM")}`]:
          oData.listInventory[12].value > 0 ? oData.listInventory[12].value : 0,
        [`${moment(dtExcel.format("YYYYMMDD")).add(13, "days").format("DD-MMM")}`]:
          oData.listInventory[13].value > 0 ? oData.listInventory[13].value : 0,
        [`${moment(dtExcel.format("YYYYMMDD")).add(14, "days").format("DD-MMM")}`]:
          oData.listInventory[14].value > 0 ? oData.listInventory[14].value : 0,
        [`${moment(dtExcel.format("YYYYMMDD")).add(15, "days").format("DD-MMM")}`]:
          oData.listInventory[15].value > 0 ? oData.listInventory[15].value : 0,
        [`${moment(dtExcel.format("YYYYMMDD")).add(16, "days").format("DD-MMM")}`]:
          oData.listInventory[16].value > 0 ? oData.listInventory[16].value : 0,
      });

      let notRemain = oData.listInventory[oData.listInventory.length - 1].value;
      exportData.push({
        SBU: oData.sbu,
        MODEL: oData.model,
        SEBANGO: oData.sebango,
        CUSTOMER: "",
        PLTYPE: "",
        DESC: "INV.NOT REMAIN",
        TTL: notRemain,
        [`${moment(dtExcel.format("YYYYMMDD")).format("DD-MMM")}`]:
          oData.listInventory[0].value > 0 ? 0 : oData.listInventory[0].value,
        [`${moment(dtExcel.format("YYYYMMDD")).add(1, "days").format("DD-MMM")}`]:
          oData.listInventory[1].value > 0 ? 0 : oData.listInventory[1].value,
        [`${moment(dtExcel.format("YYYYMMDD")).add(2, "days").format("DD-MMM")}`]:
          oData.listInventory[2].value > 0 ? 0 : oData.listInventory[2].value,
        [`${moment(dtExcel.format("YYYYMMDD")).add(3, "days").format("DD-MMM")}`]:
          oData.listInventory[3].value > 0 ? 0 : oData.listInventory[3].value,
        [`${moment(dtExcel.format("YYYYMMDD")).add(4, "days").format("DD-MMM")}`]:
          oData.listInventory[4].value > 0 ? 0 : oData.listInventory[4].value,
        [`${moment(dtExcel.format("YYYYMMDD")).add(5, "days").format("DD-MMM")}`]:
          oData.listInventory[5].value > 0 ? 0 : oData.listInventory[5].value,
        [`${moment(dtExcel.format("YYYYMMDD")).add(6, "days").format("DD-MMM")}`]:
          oData.listInventory[6].value > 0 ? 0 : oData.listInventory[6].value,
        [`${moment(dtExcel.format("YYYYMMDD")).add(7, "days").format("DD-MMM")}`]:
          oData.listInventory[7].value > 0 ? 0 : oData.listInventory[7].value,
        [`${moment(dtExcel.format("YYYYMMDD")).add(8, "days").format("DD-MMM")}`]:
          oData.listInventory[8].value > 0 ? 0 : oData.listInventory[8].value,
        [`${moment(dtExcel.format("YYYYMMDD")).add(9, "days").format("DD-MMM")}`]:
          oData.listInventory[9].value > 0 ? 0 : oData.listInventory[9].value,
        [`${moment(dtExcel.format("YYYYMMDD")).add(10, "days").format("DD-MMM")}`]:
          oData.listInventory[10].value > 0 ? 0 : oData.listInventory[10].value,
        [`${moment(dtExcel.format("YYYYMMDD")).add(11, "days").format("DD-MMM")}`]:
          oData.listInventory[11].value > 0 ? 0 : oData.listInventory[11].value,
        [`${moment(dtExcel.format("YYYYMMDD")).add(12, "days").format("DD-MMM")}`]:
          oData.listInventory[12].value > 0 ? 0 : oData.listInventory[12].value,
        [`${moment(dtExcel.format("YYYYMMDD")).add(13, "days").format("DD-MMM")}`]:
          oData.listInventory[13].value > 0 ? 0 : oData.listInventory[13].value,
        [`${moment(dtExcel.format("YYYYMMDD")).add(14, "days").format("DD-MMM")}`]:
          oData.listInventory[14].value > 0 ? 0 : oData.listInventory[14].value,
        [`${moment(dtExcel.format("YYYYMMDD")).add(15, "days").format("DD-MMM")}`]:
          oData.listInventory[15].value > 0 ? 0 : oData.listInventory[15].value,
        [`${moment(dtExcel.format("YYYYMMDD")).add(16, "days").format("DD-MMM")}`]:
          oData.listInventory[16].value > 0 ? 0 : oData.listInventory[16].value,
      });
    });
    const csvConfig = mkConfig({
      fieldSeparator: ",",
      filename: `excel-warning-${moment().format("DDMMYYYY")}`,
      decimalSeparator: ".",
      useKeysAsHeaders: true,
    });
    const csv = generateCsv(csvConfig)(exportData);
    download(csvConfig)(csv);
  }

  const handlePrint = useReactToPrint({
    content: () => refPDF.current,
  });
  return (
    <div className="h-[100%] w-[100%]">
      <div className="p-[16px] h-[100%] flex flex-col gap-[8px]">
        <Grid container className=" border-2 border-black color-change-2x">
          <Grid item xs={2}></Grid>
          <Grid
            item
            xs={8}
            className="flex justify-center items-center py-[8px] text-[10px] xs:text-[10px] sm:text-[18px] md:text-[24px] lg:text-[26px] xl:text-[26px]"
          >
            <div>
              <span className="text-red-500 font-bold">WARNING</span>
              <span> : SALE & FG INVENTORY</span>
            </div>
          </Grid>
          <Grid item container xs={2}>
            <Grid item xs={6} className="bg-green-300 flex " justifyContent={"center"} alignItems={"center"}>
              <Typography className="text-green-800 font-bold text-center text-[4px] xs:text-[6px] sm:text-[8px] md:text-[12px] lg:text-[14px] xl:text-[20px]">
                ENOUGH
              </Typography>
            </Grid>
            <Grid item xs={6} className="bg-red-300 flex justify-center items-center">
              <Typography className="text-red-800 font-semibold text-center text-[4px] xs:text-[6px] sm:text-[8px] md:text-[12px] lg:text-[14px] xl:text-[20px]">
                NOT ENOUGH
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <div className="w-full flex justify-end">
          <div className="sm:col-span-1 md:col-span-2 flex gap-2 justify-end items-center">
            <Button icon={<AiOutlineFilePdf />} onClick={() => handlePrint()} color="danger" variant="dashed">
              PDF
            </Button>
            <Button icon={<AiOutlineExport />} onClick={handleExcel} color="primary" variant="dashed">
              Export
            </Button>
          </div>
        </div>
        <div className="flex justify-between w-full mt-2 pl-2">
          <div className="w-[30%] flex items-center">
            <div className="border  rounded-md px-6 py-2 text-red-500 font-semibold drop-shadow-sm shadow-sm flex items-center w-fit">
              Internal Use only
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Radio.Group size="large" value={modelGroup}>
              {rModelGroup.map((oModelGroup: string, i: number) => {
                return (
                  <Radio.Button key={i} value={oModelGroup} onClick={() => setModelGroup(oModelGroup)}>
                    {oModelGroup}
                  </Radio.Button>
                );
              })}
            </Radio.Group>
          </div>
          <div className="w-[30%] ssm:col-span-1 md:col-span-2 gap-2 flex items-center justify-end ">
            <div className="flex flex-col gap-1">
              <p>
                {" "}
                สต็อกตั้งต้นของวันที่ : <span className="text-sky-500 font-semibold">{DMY}</span>
              </p>
              <div className="bg-red-600 opacity-80 rounded-full text-white px-6 pb-[2px] pt-[1px] shadow-xl text-lg text-center flex items-center gap-2">
                <FaKeyboard />
                <span>
                  Press <strong>F5</strong> for update
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="flex gap-2 items-center bg-green-50 px-2 w-fit border border-black/25 rounded-sm">
            <div className="h-4 w-4 bg-green-600 border-2  border-black shadow-md"></div>
            <span>Receive in Warehouse</span>
          </div>
          <div className="flex gap-2 items-center bg-red-50 px-2 w-fit border border-black/25 rounded-sm">
            <div className="h-4 w-4 bg-red-600 border-2  border-black shadow-md"></div>
            <span>Out of Warehouse</span>
          </div>
          <div className="flex gap-2 items-center bg-yellow-50 px-2 w-fit border border-black/25 rounded-sm">
            <div className="h-4 w-4 bg-yellow-400 border-2  border-black shadow-md"></div>
            <span>RWQ : Rework QA</span>
          </div>
          <div className="flex gap-2 items-center bg-yellow-50 px-2 w-fit border border-black/25 rounded-sm">
            <div className="h-4 w-4 bg-yellow-400 border-2  border-black shadow-md"></div>
            <span>HWH : Hold Warehouse (QA)</span>
          </div>
        </div>
        <div className="overflow-x-auto w-full ">
          <table
            className="w-fit overflow-x-auto table-fixed border-black border  bg-white text-sm"
            id="tbWarning"
            ref={refPDF}
          >
            <thead>
              <tr className="">
                <th className={`border colspan border-black sticky top-0 text-[#fa7d00] bg-[#f2f2f2] w-[75px]`}>SBU</th>
                <th className={`border colspan border-black sticky top-0 text-[#fa7d00] bg-[#f2f2f2] w-[150px]`}>
                  MODEL
                </th>
                <th className={`border colspan border-black sticky top-0 text-[#fa7d00] bg-[#f2f2f2] w-[75px]`}>
                  SEBANGO
                </th>
                <th className={`border colspan border-black sticky top-0 text-[#fa7d00] bg-[#f2f2f2] w-[125px]`}>
                  CUS/PLTYPE
                </th>
                <th className={`border colspan border-black sticky top-0 text-[#fa7d00] bg-[#f2f2f2] w-[200px]`}>
                  DESC
                </th>
                <th className={`border colspan border-black sticky top-0  bg-[#f4ff54] w-[35px]`}>RWQ</th>
                <th className={`border colspan border-black sticky top-0  bg-[#f4ff54] w-[35px]`}>HWH</th>
                <th className={`border colspan border-black sticky top-0  bg-[#b0ff7b] w-[35px]`}>UNW</th>
                <th className={`border colspan border-black sticky top-0  bg-[#b0ff7b] w-[35px]`}>PDT</th>
                {/* <th className={`border colspan border-black sticky top-0   w-[75px]`}>
                  <div className="flex flex-col bg-white">
                    <span>IN WH/</span>
                    <span>OUT WH</span>
                  </div>
                </th> */}
                <th className={`border colspan border-black sticky top-0 text-[#fa7d00] bg-[#f2f2f2] w-[125px]`}>
                  TTL
                </th>
                {[...Array(17)].map((oDay: any, iDay: number) => {
                  let dtTH = currentDT.add(iDay == 0 ? 0 : 1, "days");
                  let holiday: boolean = false;
                  if (["SA", "SU"].includes(dtTH.format("dd").toUpperCase())) {
                    holiday = true;
                  }
                  return (
                    <th
                      className={`w-[65px] border border-black sticky top-0 ${
                        holiday == true ? "text-[#1f1f1f] bg-[#fa7d00e1]" : "text-[#fa7d00e1] bg-[#f2f2f2]"
                      }`}
                      key={`${iDay}${oDay}`}
                    >
                      {dtTH.format("DD-MMM")}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {load ? (
                <tr>
                  <td colSpan={26}>
                    <div className="flex items-center justify-center flex-col gap-1 p-3">
                      <CircularProgress />
                      <span className="text-[14px]">กำลังโหลดข้อมูล</span>
                    </div>
                  </td>
                </tr>
              ) : Object.keys(data).length == 0 ? (
                <tr>
                  <td colSpan={26} className="text-center">
                    <span>ไม่พบข้อมูล กรุณาค้นหาข้อมูล ...</span>
                  </td>
                </tr>
              ) : (
                data.map((oData: MWarning, iData: number) => {
                  let tSaleOfDay: number = oData.listSale.map((o) => o.value).reduce((a, b) => a + b);
                  let tInv: number = oData.inventory;
                  let haveInbound: boolean = oData.inbound > 0 ? true : false;
                  // let haveHold: boolean = (oData?.hold != undefined && oData?.hold) > 0 ? true : false;
                  let pdt: number = oData?.pdt || 0;
                  let unw: number = oData?.unw || 0;
                  let hwh: number = oData?.hwh || 0;
                  let rwq: number = oData?.rwq || 0;

                  return ["SALE PLAN & FORECAST", "INV.REMAIN", "INV.NOT REMAIN"].map(
                    (oType: string, iType: number) => {
                      return (
                        <tr key={iType} className={`${iType == 0 ? "colspan" : "un-colspan"}`}>
                          {iType == 0 ? (
                            <Fragment key={iData + iType}>
                              <td className=" border text-[14px] border-black align-top text-center" rowSpan={3}>
                                {oData.sbu}
                              </td>
                              <td
                                className=" border text-[14px] border-black  align-top pl-1 font-semibold"
                                rowSpan={3}
                              >
                                <Paragraph
                                  style={{ fontSize: "14px", fontWeight: "bold" }}
                                  copyable={{ text: oData.model }}
                                >
                                  {oData.model}
                                </Paragraph>
                              </td>
                              <td className=" border text-[14px] border-black text-center align-top" rowSpan={3}>
                                {oData.sebango}
                              </td>
                              <td className=" border text-[14px] border-black align-top  m-0 p-0" rowSpan={3}>
                                <div>
                                  <table width={"100%"} className="h-full ">
                                    <tbody>
                                      {oData.pltype.map((oPltypeOfCustomer: Pltype) => {
                                        let color: string = rndColor.filter(
                                          (o) => o.customer == oPltypeOfCustomer.customer
                                        ).length
                                          ? rndColor.filter((o) => o.customer == oPltypeOfCustomer.customer)[0].color
                                          : "";
                                        return oPltypeOfCustomer.pltype.map((oPltype: string, iPltype: number) => {
                                          return (
                                            <tr key={iPltype}>
                                              {iPltype == 0 ? (
                                                <td
                                                  width={"40%"}
                                                  rowSpan={oPltypeOfCustomer.pltype.length}
                                                  className={`border-b  border-black  ${color}`}
                                                >
                                                  {oPltypeOfCustomer.customer}
                                                </td>
                                              ) : (
                                                <></>
                                              )}
                                              <td className={`border-l border-b border-black ${color}`}>{oPltype}</td>
                                            </tr>
                                          );
                                        });
                                      })}
                                    </tbody>
                                  </table>
                                </div>
                              </td>
                            </Fragment>
                          ) : (
                            <Fragment key={iData + iType}></Fragment>
                          )}
                          <td
                            className={`${iType == 2 && "border  border-t-0"} text-nowrap font-semibold border-black ${
                              iType == 0
                                ? " bg-blue-200"
                                : iType == 1
                                ? "bg-green-200 text-green-700"
                                : "bg-red-200 text-red-600"
                            }`}
                          >
                            <div className="flex flex-row items-center gap-1">
                              {haveInbound == true && iType == 1 ? (
                                <div className="flex gap-1">
                                  <span>{oType}</span>
                                  {haveInbound == true && (
                                    <span
                                      className={`text-black font-bold  pl-1 pr-2 rounded-md shadow-lg  drop-shadow-md `}
                                      style={{
                                        background: `${oData.inboundType == "OUT" ? "#f87171" : "#3eb843"}`,
                                      }}
                                    >
                                      {oData.inboundType == "IN" ? "+" : "-"}
                                      {oData.inbound}
                                      {oData.inboundType == "IN" ? "  WH" : " OUT OF WH"}
                                    </span>
                                  )}
                                </div>
                              ) : (
                                <span>{oType}</span>
                              )}
                              {/* {haveHold == true && iType == 1 && (
                                <div className="text-black font-bold bg-yellow-300 pl-1 pr-2 rounded-md shadow-lg  drop-shadow-md text-nowrap flex flex-col leading-none">
                                  {oData.hold_item.map((oHold: PropHoldItem, iHold: number) => (
                                    <span key={iHold}>
                                      {" "}
                                      {oHold.wc} : {oHold.qty.toLocaleString("en")}
                                    </span>
                                  ))}
                                  <span> TOTAL = {oData.hold.toLocaleString("en")}</span>
                                </div>
                              )} */}
                            </div>
                          </td>
                          {iType == 0 && (
                            <>
                              <td
                                rowSpan={3}
                                className={`border border-black ${
                                  rwq > 0
                                    ? "bg-yellow-200 font-semibold text-lg"
                                    : "bg-yellow-100 font-semibold text-lg text-black/50"
                                }`}
                              >
                                <div className={`flex  items-center justify-center gap-1 `}>
                                  <span className="font-bold">{rwq.toLocaleString("en")}</span>
                                </div>
                              </td>
                              <td
                                rowSpan={3}
                                className={`border border-black ${
                                  hwh > 0
                                    ? "bg-yellow-200 font-semibold text-lg"
                                    : "bg-yellow-100  font-semibold text-black/50"
                                }`}
                              >
                                <div className={`flex  items-center justify-center gap-1 `}>
                                  <span className="font-bold">{hwh.toLocaleString("en")}</span>
                                </div>
                              </td>
                              <td
                                rowSpan={3}
                                className={`border border-black ${
                                  unw > 0
                                    ? "bg-[#b0ff7b]/50 font-semibold text-lg"
                                    : "bg-[#b0ff7b]/10 font-semibold text-black/50"
                                }`}
                              >
                                <div className={`flex  items-center justify-center gap-1 `}>
                                  <span className="font-bold">{unw.toLocaleString("en")}</span>
                                </div>
                              </td>
                              <td
                                rowSpan={3}
                                className={`border border-black ${
                                  pdt > 0
                                    ? "bg-[#b0ff7b]/50 font-semibold text-lg"
                                    : "bg-[#b0ff7b]/10 font-semibold text-black/50"
                                }`}
                              >
                                <div className={`flex  items-center justify-center gap-1 `}>
                                  <span className="font-bold">{pdt.toLocaleString("en")}</span>
                                </div>
                              </td>
                              {/* <td rowSpan={3} className={`border border-black ${pdt > 0 && "font-semibold text-lg"}`}>
                                <div className={`flex  items-center justify-center gap-1 `}>
                                  <span className="font-bold">{pdt.toLocaleString("en")}</span>
                                </div>
                              </td> */}
                            </>
                          )}
                          {iType == 0 ? (
                            <td className=" border-l bg-blue-100 border-black text-right pr-1 font-bold ">
                              {tSaleOfDay.toLocaleString("en")}
                            </td>
                          ) : (
                            <></>
                          )}
                          {iType == 1 ? (
                            <td className=" border-l bg-green-200 border-black text-right pr-1 font-bold text-green-800">
                              <div className="flex justify-end  w-full gap-1">
                                {oData?.saleToday != undefined && oData.saleToday > 0 && (
                                  <div className="flex items-center text-red-500">Sold Off : ({oData.saleToday})</div>
                                )}
                                {tInv.toLocaleString("en")}
                              </div>
                            </td>
                          ) : (
                            <></>
                          )}
                          {iType == 2 ? (
                            <td
                              className={` border-b border-black text-right pr-1 font-bold ${
                                oData.total < 0 && "bg-red-200 text-red-600"
                              }`}
                            >
                              {oData.total < 0 && `${oData.total.toLocaleString("en")}`}
                            </td>
                          ) : (
                            <></>
                          )}

                          {iType == 0 &&
                            [...Array(17)].map((oDay: any, iDay: number) => {
                              let dtTD = moment().add(-8, "hours").add(iDay, "days");
                              let nSaleOfDay: number = 0;
                              let rSaleOfDay: List[] = oData.listSale.filter((o) => o.date == dtTD.format("YYYYMMDD"));
                              if (rSaleOfDay.length) {
                                nSaleOfDay = rSaleOfDay[0].value;
                              }
                              return (
                                <td
                                  className={`${iDay == 0 && "border-l"} border-black text-right pr-1 ${
                                    nSaleOfDay > 0 && " font-bold bg-blue-100"
                                  }`}
                                  key={`${iDay}${oDay}`}
                                >
                                  {nSaleOfDay > 0 && nSaleOfDay.toLocaleString("en")}
                                </td>
                              );
                            })}
                          {iType == 1 &&
                            [...Array(17)].map((oDay: any, iDay: number) => {
                              let dtTD = moment().add(-8, "hours").add(iDay, "days");
                              let rInv: List[] = oData.listInventory.filter((o) => o.date == dtTD.format("YYYYMMDD"));
                              let nInv: number = 0;
                              if (rInv.length) {
                                nInv = rInv[0].value;
                              }
                              return nInv > 0 ? (
                                <td
                                  className={`${
                                    iDay == 0 && "border-l"
                                  } border-black  text-right pr-1 text-green-800 font-bold bg-green-100`}
                                  key={`${iDay}${oDay}`}
                                >
                                  {nInv.toLocaleString("en")}
                                </td>
                              ) : (
                                <td
                                  className={`${iDay == 0 && "border-l"}  border-black text-right pr-1`}
                                  key={`${iDay}${oDay}`}
                                ></td>
                              );
                            })}
                          {iType == 2 &&
                            [...Array(17)].map((oDay: any, iDay: number) => {
                              let dtTD = moment().add(-8, "hours").add(iDay, "days");
                              let rInv: List[] = oData.listInventory.filter((o) => o.date == dtTD.format("YYYYMMDD"));
                              let nInv: number = 0;
                              if (rInv.length) {
                                nInv = rInv[0].value;
                              }
                              return nInv < 0 ? (
                                <td
                                  className={`${
                                    iDay == 0 && "border-l"
                                  } border-b border-black text-right pr-1 text-red-600 font-bold bg-red-100`}
                                  key={`${iDay}${oDay}`}
                                >
                                  {nInv.toLocaleString("en")}
                                </td>
                              ) : (
                                <td
                                  className={`${iDay == 0 && "border-l"} border-b border-black text-right pr-1`}
                                  key={`${iDay}${oDay}`}
                                ></td>
                              );
                            })}
                        </tr>
                      );
                    }
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Warning;
