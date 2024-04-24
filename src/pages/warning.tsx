//@ts-nocheck
import { Search } from '@mui/icons-material';
import { Box, Button, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { MActPlans, MData } from '../interface';
import { API_GET_WARNING, API_INIT_ACT_PLAN, API_WARNING_EXCEL } from '../Service';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import ExcelWarning from '../components/warning/form.pdf.comp';
import { useNavigate } from 'react-router-dom';
import { download, generateCsv, mkConfig } from 'export-to-csv';
export interface MWarning {
    model: string;
    sbu: string;
    sebango: string;
    customer: string[];
    pltype: Pltype[];
    total: number;
    inventory: number;
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
    'bg-[#dddddd]'
];
function Warning() {
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
        let res = await API_GET_WARNING(ym);
        let customer: string[] = [];
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
        }
    }, [once]);
    async function init() {
        let init_once = await handleSearch();
    }
    async function handleExcel() {
        let exportData = [];
        console.log(data)
        data.map((oData: MWarning) => {
            console.log(oData);
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
            // console.log(oData.listInventory)
            exportData.push({
                SBU: oData.sbu,
                MODEL: oData.model,
                SEBANGO: oData.sebango,
                CUSTOMER: '',
                PLTYPE: '',
                DESC: 'INV.REMAIN',
                TTL: oData.inventory,
                [`${moment(dtExcel.format('YYYYMMDD')).format('DD-MMM')}`]: oData.listInventory[0].value,
                [`${moment(dtExcel.format('YYYYMMDD')).add(1, 'days').format('DD-MMM')}`]: oData.listInventory[1].value,
                [`${moment(dtExcel.format('YYYYMMDD')).add(2, 'days').format('DD-MMM')}`]: oData.listInventory[2].value,
                [`${moment(dtExcel.format('YYYYMMDD')).add(3, 'days').format('DD-MMM')}`]: oData.listInventory[3].value,
                [`${moment(dtExcel.format('YYYYMMDD')).add(4, 'days').format('DD-MMM')}`]: oData.listInventory[4].value,
                [`${moment(dtExcel.format('YYYYMMDD')).add(5, 'days').format('DD-MMM')}`]: oData.listInventory[5].value,
                [`${moment(dtExcel.format('YYYYMMDD')).add(6, 'days').format('DD-MMM')}`]: oData.listInventory[6].value,
                [`${moment(dtExcel.format('YYYYMMDD')).add(7, 'days').format('DD-MMM')}`]: oData.listInventory[7].value,
                [`${moment(dtExcel.format('YYYYMMDD')).add(8, 'days').format('DD-MMM')}`]: oData.listInventory[8].value,
                [`${moment(dtExcel.format('YYYYMMDD')).add(9, 'days').format('DD-MMM')}`]: oData.listInventory[9].value,
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


    return (
        <Stack px={6} pb={6} pt={3} gap={2}>
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

            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <Stack width={'100%'} justifyContent={'space-between'} direction={'row'}>
                        <Button startIcon={<Search />} variant='contained' size='small' onClick={handleSearch}>Search</Button>
                        <Stack direction={'row'} gap={1}>
                            {/* <Button startIcon={<FileUploadIcon />} variant='contained' color='success' onClick={() => window.open('./warning/pdf', '_blank')}>Delivery Control Sheet</Button> */}
                            <Button startIcon={<FileUploadIcon />} variant='contained' color='success' onClick={handleExcel}>Export</Button>
                        </Stack>
                    </Stack>
                </Grid>
                <Grid item xs={12} >
                    <div className='overflow-y-scroll  border border-black border-x-0'>
                        <table className='table-auto border-black border overflow-scroll w-full border-collapse  bg-white'>
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
                                            return <th className='border border-black sticky top-0 text-[#fa7d00e1] bg-[#f2f2f2]' key={`${iDay}${oDay}`}>{dtTH.format('DD-MMM')}</th>
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
                                            // t = total, r = array, n = number, i = index, o = object
                                            data.map((oData: MWarning, iData: number) => {
                                                let tSaleOfDay: number = oData.listSale.map(o => o.value).reduce((a, b) => a + b);
                                                let oSaleFirstDay: MData[] = oData.listSale.filter(o => o.date == dtNow);
                                                let tInv: number = (oData.listInventory.length && typeof oData.listInventory[0] != 'undefined') ? Number(oData.listInventory[0].value) : 0;
                                                // let tInv: number = (oData.listInventory.length && typeof oData.listInventory[0] != 'undefined') ? Number(oData.listInventory[0].value + (oSaleFirstDay.length ? oSaleFirstDay[0].value : 0)) : 0;
                                                return ['SALE PLAN & FORECASE', 'INV.REMAIN', 'INV.NOT REMAIN'].map((oType: string, iType: number) => {
                                                    return <tr key={iData}>
                                                        {
                                                            iType == 0 && <>
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
                                                                                        return <tr>
                                                                                            {
                                                                                                iPltype == 0 && <td width={'40%'} rowSpan={oPltypeOfCustomer.pltype.length} className={`border-b  border-black  ${color}`}>{oPltypeOfCustomer.customer}</td>
                                                                                            }
                                                                                            <td className={`border-l border-b border-black ${color}`}>{oPltype}</td>
                                                                                        </tr>
                                                                                    })
                                                                                })
                                                                            }
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                                {/* <td className='border text-[14px] border-black align-top' rowSpan={3}>{oData.pltype.join(', ')}</td> */}
                                                            </>
                                                        }
                                                        <td className={`${iType == 2 && 'border  border-t-0'} font-semibold border-black ${iType == 0 ? 'bg-blue-200' : (iType == 1 ? 'bg-green-200 text-green-700' : 'bg-red-200 text-red-600')}`}>{oType}</td>
                                                        {
                                                            iType == 0 && <td className='border-l border-black text-right pr-1 font-bold '>{tSaleOfDay.toLocaleString('en')}</td>
                                                        }
                                                        {
                                                            iType == 1 && <td className='border-l bg-green-200 border-black text-right pr-1 font-bold text-green-800'>{tInv.toLocaleString('en')}</td>
                                                        }
                                                        {
                                                            iType == 2 && <td className={` border-b border-black text-right pr-1 font-bold ${oData.total < 0 && 'bg-red-200 text-red-600'}`}>{oData.total < 0 && `${oData.total.toLocaleString('en')}`}</td>
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
    )
}

export default Warning