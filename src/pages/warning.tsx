//@ts-nocheck
import { Search } from '@mui/icons-material';
import { Box, Button, CircularProgress, Grid, Stack, Typography } from '@mui/material'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { MActPlans, MData } from '../interface';
import { API_GET_WARNING, API_INIT_ACT_PLAN } from '../Service';
export interface MWarning {
    model: string;
    sbu: null;
    sebango: null;
    customer: string[];
    pltype: string[];
    total: number;
    listSale: MData[];
    listInventory: MData[];
}
function Warning() {
    const [load, setLoad] = useState<boolean>(false);
    const [data, setData] = useState<MWarning[]>([]);
    async function handleSearch() {
        setLoad(true);
        let res = await API_GET_WARNING('202403');
        setData(res);
    }
    useEffect(() => {
        setLoad(false);
    }, [data])
    return (
        <Stack p={6} gap={3}>
            <Grid container className='bg-yellow-400 border-2 border-black'>
                <Grid item xs={2}></Grid>
                <Grid item xs={8} className='flex justify-center items-center py-[8px] text-[10px] xs:text-[10px] sm:text-[18px] md:text-[24px] lg:text-[30px] xl:text-[36px]'>
                    <nobr>
                        <span className='text-red-600 font-bold'>WARNING</span>
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
                    <Button startIcon={<Search />} variant='contained' size='small' onClick={handleSearch}>ค้นหาข้อมูล</Button>
                </Grid>
                <Grid item xs={12} >
                    <div className='overflow-y-scroll max-h-[500px] border border-black border-x-0'>
                        <table className='table-auto border-black border overflow-scroll w-full border-collapse  bg-gray-100'>
                            <thead>
                                <tr>
                                    {
                                        ['SBU', 'MODEL', 'SEBANGO', 'CUS', 'PLTYPE', 'DESC', 'TTL'].map((oTh: string, iTh: number) => (
                                            <th className={`border border-black sticky top-0 bg-yellow-400`} key={iTh}>{oTh}</th>
                                        ))
                                    }
                                    {
                                        [...Array(10)].map((oDay: any, iDay: number) => {
                                            let dtTH = moment().add(iDay, 'days');
                                            return <th className='border border-black sticky top-0 bg-yellow-300' key={`${iDay}${oDay}`}>{dtTH.format('DD-MMM')}</th>
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
                                                <span>กำลังโหลดข้อมูล</span>
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
                                                let tInv: number = (oData.listInventory.length && typeof oData.listInventory[0] != 'undefined') ? Number(oData.listInventory[0].value) : 0;
                                                return ['SALE PLAN & FORECASE', 'INV.REMAIN', 'INV.NOT REMAIN'].map((oType: string, iType: number) => {
                                                    return <tr key={iData}>
                                                        {
                                                            iType == 0 && <>
                                                                <td className='border border-black' rowSpan={3}>{oData.sbu}</td>
                                                                <td className='border border-black font-bold pl-2' rowSpan={3}>{oData.model}</td>
                                                                <td className='border border-black text-center' rowSpan={3}>{oData.sebango}</td>
                                                                <td className='border border-black' rowSpan={3}>{oData.customer.join(',')}</td>
                                                                <td className='border border-black' rowSpan={3}>{oData.pltype.join(',')}</td>
                                                            </>
                                                        }
                                                        <td className='border border-black bg-white'>{oType}</td>
                                                        {
                                                            iType == 0 && <td className='border border-black text-right pr-1 font-bold '>{tSaleOfDay.toLocaleString('en')}</td>
                                                        }
                                                        {
                                                            iType == 1 && <td className='border border-black text-right pr-1 font-bold'>{tInv.toLocaleString('en')}</td>
                                                        }
                                                        {
                                                            iType == 2 && <td className={`border border-black text-right pr-1 font-bold ${oData.total < 0 && 'bg-red-500 text-white'}`}>{oData.total < 0 && `(${oData.total.toLocaleString('en')})`}</td>
                                                        }

                                                        {
                                                            iType == 0 && [...Array(10)].map((oDay: any, iDay: number) => {
                                                                let dtTD = moment().add(iDay, 'days');
                                                                let nSaleOfDay: number = 0;
                                                                let rSaleOfDay: MData[] = oData.listSale.filter(o => o.date == dtTD.format('YYYYMMDD'));
                                                                if (rSaleOfDay.length) {
                                                                    nSaleOfDay = rSaleOfDay[0].value;
                                                                }
                                                                // let nSaleOfDay: number = rSaleOfDay.map(o => o.value).reduce((a, b) => a + b);
                                                                return <td className={`border border-black text-right pr-1 ${nSaleOfDay > 0 && 'text-blue-800 font-bold bg-blue-300'}`} key={`${iDay}${oDay}`}>{nSaleOfDay > 0 && nSaleOfDay.toLocaleString('en')}</td>
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
                                                                return nInv > 0 ? <td className='border border-black  text-right pr-1 text-green-800 font-bold bg-green-100' key={`${iDay}${oDay}`}>{nInv.toLocaleString('en')}</td> : <td className='border border-black text-right pr-1' key={`${iDay}${oDay}`}></td>
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
                                                                return nInv < 0 ? <td className='border border-black text-right pr-1 text-red-600 font-bold bg-red-100' key={`${iDay}${oDay}`}>{nInv.toLocaleString('en')}</td> : <td className='border border-black text-right pr-1' key={`${iDay}${oDay}`}></td>
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