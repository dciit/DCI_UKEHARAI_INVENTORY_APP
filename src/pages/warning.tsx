// @ts-nocheck
import { Search } from '@mui/icons-material';
import { Box, Button, ButtonGroup, CircularProgress, Grid, IconButton, Stack, Switch, Typography } from '@mui/material'
import moment from 'moment'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { MActPlans, MData } from '../interface';
import { API_GET_WARNING, API_INIT_ACT_PLAN, API_WARNING_EXCEL } from '../Service';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ExcelWarning from '../components/warning/form.pdf.comp';
import { useNavigate, useParams } from 'react-router-dom';
import { download, generateCsv, mkConfig } from 'export-to-csv';
import { usePDF } from 'react-to-pdf';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { useReactToPrint } from 'react-to-print';
import { makeStyles } from '@material-ui/core';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
export interface MWarning {
    model: string;
    sbu: string;
    sebango: string;
    customer: string[];
    pltype: Pltype[];
    total: number;
    inventory: number;
    inbound?: number;
    listSale: List[];
    listInventory: List[];
    listSaleExcel: MItemWarningExcel[];
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
const COLORS = [
    'bg-[#4dc9f6ab]',
    'bg-[#f67019ab]',
    'bg-[#f53794ab]',
    'bg-[#537bc4ab]',
    'bg-[#acc236ab]',
    'bg-[#166a8fab]',
    'bg-[#00a950ab]',
    'bg-[#58595bab]',
    'bg-[#8549baab]',
    'bg-[#ddddddab]',
    'bg-[#dddddd]',
    'bg-[#3f51b5ab]',
    'bg-[#f44336ab]',
    'bg-[#dddddd]',
    'bg-[#dddddd]',
    'bg-[#dddddd]',
    'bg-[#dddddd]'
];
function Warning() {
    const { mode } = useParams();
    const [inventoryMode, setInventoryMode] = useState<boolean>(mode);
    const rModelGroup: string[] = ['ALL', '1YC', '2YC', 'SCR', 'ODM'];
    const [modelGroup, setModelGroup] = useState<string>(rModelGroup[0]);
    const refPDF = useRef(null);
    const { toPDF, targetRef } = usePDF({ filename: 'page.pdf' });
    const [fileName, setFileName] = useState<string>('');
    const navigate = useNavigate();
    const [rndColor, setRndColor] = useState<MColor[]>([]);
    const [_year, setYear] = useState<string>(moment().format('YYYY'));
    const [_month, setMonth] = useState<number>(parseInt(moment().format('MM')));
    const [rYear] = useState<string[]>([moment().add(-1, 'year').year().toString(), moment().year().toString()]);
    const [ym, setYm] = useState<string>(moment().format('YYYYMM'));
    const [load, setLoad] = useState<boolean>(false);
    const [data, setData] = useState<MWarning[]>([]);
    const dtNow = moment().format('YYYYMMDD');
    const [once, setOnce] = useState<boolean>(true);
    const dtExcel = moment();
    async function handleSearch() {
        setLoad(true);
        // let res = await API_GET_WARNING(ym, inventoryMode);
        let res = await API_GET_WARNING(ym, inventoryMode);
        let customer: string[] = [];
        if (modelGroup == '1YC' || modelGroup == '2YC') {
            res = res.filter((o: MWarning) => o.model.substring(0, 1) == modelGroup.substring(0, 1));
        } else if (modelGroup == 'SCR') {
            res = res.filter((o: MWarning) => o.model.substring(0, 1) == 'J');
        } else if (modelGroup == 'ODM') {
            res = res.filter((o: MWarning) => (o.model.substring(0, 1) != '1' && o.model.substring(0, 1) != '2' && o.model.substring(0, 1) != 'J'));
        }
        // res = res.filter(x=>x.model.substring(1) == '1');
        (res.map((o: MWarning) => o.customer)).map((x: string[]) => {
            customer = customer.concat(x)
        });
        let rnd: MColor[] = [];
        [...new Set(customer)].map((o: string, i: number) => {
            rnd.push({
                color: COLORS[i],
                customer: o
            });
        })
        setRndColor([...rnd]);
        setData(res);
    }
    useEffect(() => {
        setLoad(false);
    }, [data]);
    useEffect(() => {
        if (once == true) {
            init();
            console.log('init')
        }
    }, [once]);
    async function init() {
        let init_once = await handleSearch();
    }
    useEffect(() => {
        handleSearch();
    }, [modelGroup]);
    async function handleExcel() {
        let exportData: any[] = [];
        data.map((oData: MWarning) => {
            oData.listSaleExcel.map((oItem: MItemWarningExcel) => {
                const date = moment(dtExcel.format('YYYYMMDD'));
                let newRow = {
                    SBU: oData.sbu,
                    MODEL: oData.model,
                    SEBANGO: oData.sebango,
                    CUSTOMER: oItem.customer,
                    PLTYPE: oItem.pltype,
                    DESC: 'SALE PLAN & FORECASE',
                    TTL: oItem.data.map(x => x.value).reduce((a, b) => a + b),
                    [`${date.format('DD-MMM')}`]: oItem.data[0].value,
                    [`${date.add(1, 'days').format('DD-MMM')}`]: oItem.data[1].value,
                    [`${date.add(1, 'days').format('DD-MMM')}`]: oItem.data[2].value,
                    [`${date.add(1, 'days').format('DD-MMM')}`]: oItem.data[3].value,
                    [`${date.add(1, 'days').format('DD-MMM')}`]: oItem.data[4].value,
                    [`${date.add(1, 'days').format('DD-MMM')}`]: oItem.data[5].value,
                    [`${date.add(1, 'days').format('DD-MMM')}`]: oItem.data[6].value,
                    [`${date.add(1, 'days').format('DD-MMM')}`]: oItem.data[7].value,
                    [`${date.add(1, 'days').format('DD-MMM')}`]: oItem.data[8].value,
                    [`${date.add(1, 'days').format('DD-MMM')}`]: oItem.data[9].value,
                };
                exportData.push(newRow);
            });
            exportData.push({
                SBU: oData.sbu,
                MODEL: oData.model,
                SEBANGO: oData.sebango,
                CUSTOMER: '',
                PLTYPE: '',
                DESC: 'INV.REMAIN',
                TTL: oData.inventory,
                [`${moment(dtExcel.format('YYYYMMDD')).format('DD-MMM')}`]: oData.listInventory[0].value > 0 ? oData.listInventory[0].value : 0,
                [`${moment(dtExcel.format('YYYYMMDD')).add(1, 'days').format('DD-MMM')}`]: oData.listInventory[1].value > 0 ? oData.listInventory[1].value : 0,
                [`${moment(dtExcel.format('YYYYMMDD')).add(2, 'days').format('DD-MMM')}`]: oData.listInventory[2].value > 0 ? oData.listInventory[2].value : 0,
                [`${moment(dtExcel.format('YYYYMMDD')).add(3, 'days').format('DD-MMM')}`]: oData.listInventory[3].value > 0 ? oData.listInventory[3].value : 0,
                [`${moment(dtExcel.format('YYYYMMDD')).add(4, 'days').format('DD-MMM')}`]: oData.listInventory[4].value > 0 ? oData.listInventory[4].value : 0,
                [`${moment(dtExcel.format('YYYYMMDD')).add(5, 'days').format('DD-MMM')}`]: oData.listInventory[5].value > 0 ? oData.listInventory[5].value : 0,
                [`${moment(dtExcel.format('YYYYMMDD')).add(6, 'days').format('DD-MMM')}`]: oData.listInventory[6].value > 0 ? oData.listInventory[6].value : 0,
                [`${moment(dtExcel.format('YYYYMMDD')).add(7, 'days').format('DD-MMM')}`]: oData.listInventory[7].value > 0 ? oData.listInventory[7].value : 0,
                [`${moment(dtExcel.format('YYYYMMDD')).add(8, 'days').format('DD-MMM')}`]: oData.listInventory[8].value > 0 ? oData.listInventory[8].value : 0,
                [`${moment(dtExcel.format('YYYYMMDD')).add(9, 'days').format('DD-MMM')}`]: oData.listInventory[9].value > 0 ? oData.listInventory[9].value : 0,
            });

            let notRemain = oData.listInventory[oData.listInventory.length - 1].value;
            exportData.push({
                SBU: oData.sbu,
                MODEL: oData.model,
                SEBANGO: oData.sebango,
                CUSTOMER: '',
                PLTYPE: '',
                DESC: 'INV.NOT REMAIN',
                TTL: notRemain,
                [`${moment(dtExcel.format('YYYYMMDD')).format('DD-MMM')}`]: oData.listInventory[0].value > 0 ? 0 : oData.listInventory[0].value,
                [`${moment(dtExcel.format('YYYYMMDD')).add(1, 'days').format('DD-MMM')}`]: oData.listInventory[1].value > 0 ? 0 : oData.listInventory[1].value,
                [`${moment(dtExcel.format('YYYYMMDD')).add(2, 'days').format('DD-MMM')}`]: oData.listInventory[2].value > 0 ? 0 : oData.listInventory[2].value,
                [`${moment(dtExcel.format('YYYYMMDD')).add(3, 'days').format('DD-MMM')}`]: oData.listInventory[3].value > 0 ? 0 : oData.listInventory[3].value,
                [`${moment(dtExcel.format('YYYYMMDD')).add(4, 'days').format('DD-MMM')}`]: oData.listInventory[4].value > 0 ? 0 : oData.listInventory[4].value,
                [`${moment(dtExcel.format('YYYYMMDD')).add(5, 'days').format('DD-MMM')}`]: oData.listInventory[5].value > 0 ? 0 : oData.listInventory[5].value,
                [`${moment(dtExcel.format('YYYYMMDD')).add(6, 'days').format('DD-MMM')}`]: oData.listInventory[6].value > 0 ? 0 : oData.listInventory[6].value,
                [`${moment(dtExcel.format('YYYYMMDD')).add(7, 'days').format('DD-MMM')}`]: oData.listInventory[7].value > 0 ? 0 : oData.listInventory[7].value,
                [`${moment(dtExcel.format('YYYYMMDD')).add(8, 'days').format('DD-MMM')}`]: oData.listInventory[8].value > 0 ? 0 : oData.listInventory[8].value,
                [`${moment(dtExcel.format('YYYYMMDD')).add(9, 'days').format('DD-MMM')}`]: oData.listInventory[9].value > 0 ? 0 : oData.listInventory[9].value,
            })
        });
        const csvConfig = mkConfig({
            fieldSeparator: ',',
            filename: `excel-warning-${moment().format('DDMMYYYY')}`,
            decimalSeparator: '.',
            useKeysAsHeaders: true,
        });
        const csv = generateCsv(csvConfig)(exportData);
        download(csvConfig)(csv);
    }

    const handlePrint = useReactToPrint({
        content: () => refPDF.current,
    });


    const filterButtonStyle = makeStyles({
        button: {
            '&.active': {
                background: 'black'
            }
        }
    })
    const handleChangeModeInventory = async () => {

    }

    return (
        <div className='h-[100%] '>
            <Stack px={6} pb={6} pt={3} gap={2} className=' h-[100%]'>
                <Grid container className='bg-yellow-200 border-2 border-black'>
                    <Grid item xs={2}></Grid>
                    <Grid item xs={8} className='flex justify-center items-center py-[8px] text-[10px] xs:text-[10px] sm:text-[18px] md:text-[24px] lg:text-[26px] xl:text-[26px]'>
                        <nobr>
                            <span className='text-red-500 font-bold'>WARNING</span>
                            <span> : SALE & FG INVENTORY</span>
                        </nobr>
                    </Grid>
                    <Grid item container xs={2} >
                        <Grid item xs={6} className='bg-green-300 flex ' justifyContent={'center'} alignItems={'center'}>
                            <Typography className='text-green-800 font-bold text-center text-[4px] xs:text-[6px] sm:text-[8px] md:text-[12px] lg:text-[14px] xl:text-[20px]' >ENOUGH</Typography>
                        </Grid>
                        <Grid item xs={6} className='bg-red-300 flex justify-center items-center'>
                            <Typography className='text-red-800 font-semibold text-center text-[4px] xs:text-[6px] sm:text-[8px] md:text-[12px] lg:text-[14px] xl:text-[20px]'>NOT ENOUGH</Typography>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container spacing={1} className='h-[100%]'>
                    <Grid item xs={12}>

                        <div  className='w-full grid grid-cols-6'>
                            <div className='col-span-2 gap-2 flex items-center '>
                                {/* <Button startIcon={<Search />} className='bg-[#5c5fc8] text-white px-[16px] shadow-md hover:scale-105 transition-all duration-300 hover:opacity-95' size='small' onClick={handleSearch}>Search</Button> */}
                                {
                                    inventoryMode == 'realtime' && <div class="relative inline-flex gap-3 h-full shadow-md">
                                        <div class={`box-inventory-realtime flex items-center px-6 uppercase font-semibold `} disabled="">
                                            Inventory real-time
                                            {/* <Switch
                                                color='secondary'
                                                checked={inventoryMode}
                                                onChange={handleChangeModeInventory}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            /> */}
                                        </div>
                                        <div className='flex items-center px-6 gap-3 rounded-md bg-[#5c5fc8] text-white cursor-pointer select-none'>
                                            <span className='drop-shadow-lg'>Change Inv. 07:50 AM</span>
                                            <SyncAltIcon />
                                        </div>
                                    </div>
                                }

                            </div>
                            <div className=' col-span-2 flex items-center  justify-center'>
                                {
                                    rModelGroup.map((oModelGroup: string, iModelGroup: number) => {
                                        return <div key={iModelGroup} className={`${(oModelGroup == modelGroup) && 'bg-[#5c5fc8] text-white'} cursor-pointer hover:bg-[#5c5fc84d]  hover:font-semibold duration-100 transition-all border-[#5c5fc8]  ${oModelGroup != modelGroup && 'text-[#5c5fc8]'} select-none  border px-6 py-2 ${(iModelGroup > 0 && iModelGroup != (rModelGroup.length - 1)) && 'border-r-0'} ${iModelGroup == 0 ? 'rounded-l-lg border-r-0' : ''} ${(iModelGroup == (rModelGroup.length - 1)) ? 'rounded-r-lg' : ''}`} onClick={() => setModelGroup(oModelGroup)}>{oModelGroup}</div>
                                    })
                                }
                            </div>
                            <div className='col-span-2 flex gap-2 justify-end'>
                                <Button startIcon={<PictureAsPdfIcon />} color='warning' variant='contained' onClick={() => handlePrint()}>PDF</Button>
                                <Button startIcon={<FileUploadIcon />} variant='contained' color='success' onClick={handleExcel}>Export</Button>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} className='h-[100%]'>
                        <div className='overflow-y-scroll  border border-black border-x-0 h-[100%]'>
                            <table className='table-auto border-black border overflow-scroll w-full border-collapse  bg-white' id='tbWarning' ref={refPDF}>
                                <thead>
                                    <tr>
                                        {
                                            ['SBU', 'MODEL', 'SEBANGO', 'CUS/PLTYPE', 'DESC', 'TTL'].map((oTh: string, iTh: number) => (
                                                <th className={`border border-black sticky top-0 text-[#fa7d00] bg-[#f2f2f2]`} key={iTh}>{oTh}</th>
                                            ))
                                        }
                                        {
                                            [...Array(10)].map((oDay: any, iDay: number) => {
                                                let dtTH = moment().add(iDay, 'days');
                                                let holiday: boolean = false;
                                                if (['SA', 'SU'].includes(dtTH.format('dd').toUpperCase())) {
                                                    holiday = true;
                                                }
                                                return <th className={`border border-black sticky top-0 ${holiday == true ? 'text-[#1f1f1f] bg-[#fa7d00e1]' : 'text-[#fa7d00e1] bg-[#f2f2f2]'}`} key={`${iDay}${oDay}`}>{dtTH.format('DD-MMM')}</th>
                                            })
                                        }
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        load ? <tr>
                                            <td colSpan={17}>
                                                <div className='flex items-center justify-center flex-col gap-1 p-3'>
                                                    <CircularProgress />
                                                    <span className='text-[14px]'>กำลังโหลดข้อมูล</span>
                                                </div>
                                            </td>
                                        </tr> : (
                                            Object.keys(data).length == 0 ? <tr>
                                                <td colSpan={17} className='text-center'>
                                                    <span>ไม่พบข้อมูล กรุณาค้นหาข้อมูล ...</span>
                                                </td>
                                            </tr> : (
                                                data.map((oData: MWarning, iData: number) => {
                                                    let tSaleOfDay: number = oData.listSale.map(o => o.value).reduce((a, b) => a + b);
                                                    let oSaleFirstDay: MData[] = oData.listSale.filter(o => o.date == dtNow);
                                                    // let tInv: number = (oData.listInventory.length && typeof oData.listInventory[0] != 'undefined') ? Number(oData.listInventory[0].value) : 0;
                                                    let tInv: number = oData.inventory;
                                                    let haveInbound: boolean = oData.inbound > 0 ? true : false;
                                                    return ['SALE PLAN & FORECASE', 'INV.REMAIN', 'INV.NOT REMAIN'].map((oType: string, iType: number) => {
                                                        return <tr key={iType}>
                                                            {
                                                                iType == 0 ? <Fragment key={(iData + iType)}>
                                                                    <td className='border text-[14px] border-black align-top' rowSpan={3}>{oData.sbu}</td>
                                                                    <td className='border text-[14px] border-black font-bold align-top' rowSpan={3}>{oData.model}</td>
                                                                    <td className='border text-[14px] border-black text-center align-top' rowSpan={3}>{oData.sebango}</td>
                                                                    <td className='border text-[14px] border-black align-top  m-0 p-0' rowSpan={3}>
                                                                        <table width={'100%'} className='h-full '>
                                                                            <tbody>
                                                                                {
                                                                                    oData.pltype.map((oPltypeOfCustomer: Pltype) => {
                                                                                        let color: string = rndColor.filter(o => o.customer == oPltypeOfCustomer.customer).length ? rndColor.filter(o => o.customer == oPltypeOfCustomer.customer)[0].color : '';
                                                                                        return oPltypeOfCustomer.pltype.map((oPltype: string, iPltype: number) => {
                                                                                            return <tr key={iPltype}>
                                                                                                {
                                                                                                    iPltype == 0 ? <td width={'40%'} rowSpan={oPltypeOfCustomer.pltype.length} className={`border-b  border-black  ${color}`}>{oPltypeOfCustomer.customer}</td> : <></>
                                                                                                }
                                                                                                <td className={`border-l border-b border-black ${color}`}>{oPltype}</td>
                                                                                            </tr>
                                                                                        })
                                                                                    })
                                                                                }
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </Fragment> : <Fragment key={(iData + iType)}></Fragment>
                                                            }
                                                            <td className={`${iType == 2 && 'border  border-t-0'} font-semibold border-black ${iType == 0 ? 'bg-blue-200' : (iType == 1 ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-600')}`} >
                                                                {
                                                                    (haveInbound == true && iType == 1) ? <div className='flex gap-1'>
                                                                        <span>{oType}</span>
                                                                        {haveInbound == true && <span className='text-black font-bold bg-white pl-1 pr-2 rounded-md shadow-lg  drop-shadow-md'>+{oData.inbound} IN WH</span>}
                                                                    </div> : <span>{oType}</span>
                                                                }
                                                            </td>
                                                            {
                                                                iType == 0 ? <td className='border-l bg-blue-100 border-black text-right pr-1 font-bold '>{tSaleOfDay.toLocaleString('en')}</td> : <></>
                                                            }
                                                            {
                                                                iType == 1 ? <td className=' border-l bg-green-200 border-black text-right pr-1 font-bold text-green-800'>
                                                                    <div className='flex flex-row items-center'>
                                                                        {/* <div className={`flex-none border-t  flex items-center  gap-2 ${mode == 'realtime' && 'box-inventory-realtime px-3 rounded-md'}`}>
                                                                            <span className='text-white font-semibold uppercase'>Real-time</span>
                                                                        </div> */}
                                                                        <span className='grow'>{tInv.toLocaleString('en')}</span>
                                                                    </div>
                                                                </td> : <></>
                                                            }
                                                            {
                                                                iType == 2 ? <td className={` border-b border-black text-right pr-1 font-bold ${oData.total < 0 && 'bg-red-200 text-red-600'}`}>{oData.total < 0 && `${oData.total.toLocaleString('en')}`}</td> : <></>
                                                            }

                                                            {
                                                                iType == 0 && [...Array(10)].map((oDay: any, iDay: number) => {
                                                                    let dtTD = moment().add(iDay, 'days');
                                                                    let nSaleOfDay: number = 0;
                                                                    let rSaleOfDay: MData[] = oData.listSale.filter(o => o.date == dtTD.format('YYYYMMDD'));
                                                                    if (rSaleOfDay.length) {
                                                                        nSaleOfDay = rSaleOfDay[0].value;
                                                                    }
                                                                    return <td className={`${iDay == 0 && 'border-l'} border-black text-right pr-1 ${nSaleOfDay > 0 && ' font-bold bg-blue-100'}`} key={`${iDay}${oDay}`}>{nSaleOfDay > 0 && nSaleOfDay.toLocaleString('en')}</td>
                                                                })
                                                            }
                                                            {
                                                                iType == 1 && [...Array(10)].map((oDay: any, iDay: number) => {
                                                                    let dtTD = moment().add(iDay, 'days');
                                                                    let rInv: MData[] = oData.listInventory.filter(o => o.date == dtTD.format('YYYYMMDD'));
                                                                    let nInv: number = 0;
                                                                    if (rInv.length) {
                                                                        nInv = rInv[0].value;
                                                                    }
                                                                    return nInv > 0 ? <td className={`${iDay == 0 && 'border-l'} border-black  text-right pr-1 text-green-800 font-bold bg-green-100`} key={`${iDay}${oDay}`}>{nInv.toLocaleString('en')}</td> : <td className={`${iDay == 0 && 'border-l'}  border-black text-right pr-1`} key={`${iDay}${oDay}`}></td>
                                                                })
                                                            }
                                                            {
                                                                iType == 2 && [...Array(10)].map((oDay: any, iDay: number) => {
                                                                    let dtTD = moment().add(iDay, 'days');
                                                                    let rInv: MData[] = oData.listInventory.filter(o => o.date == dtTD.format('YYYYMMDD'));
                                                                    let nInv: number = 0;
                                                                    if (rInv.length) {
                                                                        nInv = rInv[0].value;
                                                                    }
                                                                    return nInv < 0 ? <td className={`${iDay == 0 && 'border-l'} border-b border-black text-right pr-1 text-red-600 font-bold bg-red-100`} key={`${iDay}${oDay}`}>{nInv.toLocaleString('en')}</td> : <td className={`${iDay == 0 && 'border-l'} border-b border-black text-right pr-1`} key={`${iDay}${oDay}`}></td>
                                                                })
                                                            }
                                                        </tr>
                                                    })
                                                })
                                            )
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Grid>
                </Grid>
            </Stack>
        </div>
    )
}

export default Warning