import React, { useEffect, useState } from 'react'
import { API_INIT_ACT_PLAN, API_INIT_MODELS } from '../Service';
import { Routes, Route, useParams } from 'react-router-dom';
import { ListCurpln, ListSaleForecast, MActPlan, MActPlans } from '../interface';
import { Box, Divider, IconButton, InputBase, MenuItem, Paper, Select, Stack, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
function Detail() {
    const [data, setData] = useState<MActPlans[]>([]);
    const [listCurPlans, setListCurPlans] = useState<ListCurpln[]>([]);
    const [models, setModels] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [model, setModel] = useState<string>('');
    const [once, setOnce] = useState<boolean>(false);
    let days = 31;
    useEffect(() => {
        if (!once) {
            init();
            setOnce(true);
        }
    }, [once]);

    useEffect(() => {
        if (Object.keys(data).length && model.length == 0) {
            setModel(data[0].model)
        }
    }, [data]);

    useEffect(() => {
        initData();
    }, [model]);

    async function init() {
        await initData();
    }
    async function initData() {
        // const res = await API_INIT_MODELS('202301');
        // setModels(res);
        const res = await API_INIT_ACT_PLAN({ ym: '202311' });
        console.log(res)
        setData(res);
    }
    let { month } = useParams();
    return (
        <Stack spacing={3} p={6}>
            <Stack p={3} spacing={3} >
                <div>
                    <Box
                        className='rounded-lg   hover:border-blue-500 hover:border-2 duration-200   '
                        component="form"
                        style={{ border: '2px solid #ddd' }}
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
                    >
                        <IconButton type="button" sx={{ p: '10px' }} >
                            <SearchIcon />
                        </IconButton>
                        <InputBase

                            sx={{ ml: 1, flex: 1 }}
                            placeholder="ค้นหาโมเดล"
                        />
                    </Box>
                </div>
                <Stack direction={'row'} gap={2}>
                    <Box style={{ border: '1px solid #ddd' }} className={'rounded-lg bg-[#f6f8fa] cursor-pointer hover:border-[#acacac] duration-300'}>
                        <Stack direction={'row'} px={2} py={1}>
                            <Typography>Group Model</Typography>
                            <ArrowDropDownIcon />
                        </Stack>
                    </Box>
                    <Box style={{ border: '1px solid #ddd' }} className={'rounded-lg bg-[#f6f8fa] cursor-pointer hover:border-[#acacac] duration-300'}>
                        <Stack direction={'row'} px={2} py={1}>
                            <Typography>SBU</Typography>
                            <ArrowDropDownIcon />
                        </Stack>
                    </Box>
                    <Box style={{ border: '1px solid #ddd' }} className={'rounded-lg bg-[#f6f8fa] cursor-pointer hover:border-[#acacac] duration-300'}>
                        <Stack direction={'row'} px={2} py={1}>
                            <Typography>Line</Typography>
                            <ArrowDropDownIcon />
                        </Stack>
                    </Box>
                </Stack>
                <div className='wrapper'>
                    <Stack gap={1}>
                        <Box className = 'bg-[] px-0 py-2 rounded-lg'>
                            <Typography className='text-[#0969da] text-[1.75rem] font-semibold'>1Y115BKAX1N#A</Typography>
                        </Box>
                        <table className='tb-detail bg-white'>
                            <thead>
                                <tr>
                                    <td>G Model</td>
                                    <td>SBU</td>
                                    <td>Line</td>
                                    <td>Model</td>
                                    <td>Sebango</td>
                                    <td>Type</td>
                                    <td>Customer</td>
                                    <td>&nbsp;</td>
                                    <td>Pallet Type</td>
                                    <td>Menu Auto</td>
                                    <td>Detail</td>
                                    <td>Beginning</td>
                                    {
                                        [...Array(31)].map((v: any, i: number) => {
                                            let day = (i + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
                                            return <td>{
                                                day
                                            }</td>
                                        })
                                    }
                                    <td>Total</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((o: MActPlans, i: number) => {
                                        console.log(o.listActPln)
                                        let sumPlan = 0;
                                        let sumFinal = 0;
                                        return <>
                                            <tr>
                                                <td>{`${o.model.substring(0, 2)}C`}</td>
                                                <td></td>
                                                <td>{o.wcno}</td>
                                                <td>{o.model}</td>
                                                <td>{o.sebango}</td>
                                                <td className='td-head text-left pl-2 td-bold'>Current Plan</td>
                                                <td className='td-head ' ></td>
                                                <td className='td-head'></td>
                                                <td className='td-head'></td>
                                                <td>Current Plan</td>
                                                <td>On Web</td>
                                                <td></td>
                                                {
                                                    [...Array(days)].map((oDay: ListCurpln, iDay: number) => {
                                                        let vDay = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
                                                        let t: any = o.listCurpln;
                                                        let CurrentVal: number = t[`day${vDay}`] != '' ? parseInt(t[`day${vDay}`]) : 0;
                                                        sumPlan += CurrentVal;
                                                        return <td>{CurrentVal > 0 ? CurrentVal.toLocaleString('en') : '-'}</td>
                                                    })
                                                }
                                                <td>{sumPlan.toLocaleString('en')}</td>
                                            </tr>
                                            <tr>
                                                <td>{`${o.model.substring(0, 2)}C`}</td>
                                                <td></td>
                                                <td>{o.wcno}</td>
                                                <td>{o.model}</td>
                                                <td>{o.sebango}</td>
                                                <td className='text-left pl-4'>Result_Main Assembly</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>TSN (Result Main Assemby)</td>
                                                <td>Result Main Assemby</td>
                                                <td></td>
                                                <td colSpan={31}></td>
                                            </tr>
                                            <tr>
                                                <td>{`${o.model.substring(0, 2)}C`}</td>
                                                <td></td>
                                                <td>{o.wcno}</td>
                                                <td>{o.model}</td>
                                                <td>{o.sebango}</td>
                                                <td className='text-left pl-4'>Result_Final Line</td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>TSM (Result Final Line)</td>
                                                <td>Result Final Line</td>
                                                <td></td>
                                                {
                                                    [...Array(days)].map((v: any, i: number) => {
                                                        let day = (i + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
                                                        let itemActPlan = o.listActPln.filter((oItemActPlan: MActPlan) => {
                                                            return oItemActPlan.prdymd == day;
                                                        });
                                                        if (Object.keys(itemActPlan).length) {
                                                            sumFinal += itemActPlan[0].qty;
                                                        }
                                                        return <td className='text-center'>{
                                                            Object.keys(itemActPlan).length ? itemActPlan[0].qty.toLocaleString('en') : '-'
                                                        }</td>
                                                    })
                                                }
                                                <td>{sumFinal.toLocaleString('en')}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td className='td-head font-bold text-left pl-2'>Total Inbound Finishgoods </td>
                                                <td className='td-head'></td>
                                                <td className='td-head'></td>
                                                <td className='td-head'></td>
                                                <td className=''>Total IVW19-Assortment</td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td className='text-left pl-4'>Inbound Finishgoods</td>
                                                <td></td>
                                                <td></td>
                                                <td>MDW27 Pallet Type Mapping</td>
                                                <td>IVW19-Assortment</td>
                                                <td>Result-In/Out WH(Balance)</td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td className='td-head font-bold text-left pl-2'>Total Sales Plan&Forecast</td>
                                                <td className='td-head'></td>
                                                <td className='td-head'></td>
                                                <td className='td-head'></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            {
                                                o.listSaleForecast.map((oSale: ListSaleForecast, iSale: number) => {
                                                    return <tr key={iSale}>
                                                        <td>{`${o.model.substring(0, 2)}C`}</td>
                                                        <td></td>
                                                        <td>{o.wcno}</td>
                                                        <td>{o.model}</td>
                                                        <td>{o.sebango}</td>
                                                        <td>Sales Plan&Forecast</td>
                                                        <td>{oSale.customer}</td>
                                                        <td>{oSale.pltype}</td>
                                                        <td></td>
                                                        <td>Sales Plan&Forecast</td>
                                                        <td></td>
                                                        <td></td>
                                                        {
                                                            [...Array(days)].map((oDay: ListCurpln, iDay: number) => {
                                                                let vDay = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
                                                                let t: any = oSale;
                                                                let CurrentVal = t[`d${vDay}`] != '' ? parseInt(t[`d${vDay}`]).toLocaleString('en') : '-';
                                                                return <td>{CurrentVal}</td>
                                                            })
                                                        }
                                                    </tr>
                                                })
                                            }
                                            <tr>
                                                <td>{`${o.model.substring(0, 2)}C`}</td>
                                                <td></td>
                                                <td>{o.wcno}</td>
                                                <td>{o.model}</td>
                                                <td>{o.sebango}</td>
                                                <td className='td-head font-bold text-left pl-2'>Total Inventory</td>
                                                <td className='td-head'></td>
                                                <td className='td-head'></td>
                                                <td className='td-head'></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            <tr>
                                                <td>{`${o.model.substring(0, 2)}C`}</td>
                                                <td></td>
                                                <td>{o.wcno}</td>
                                                <td>{o.model}</td>
                                                <td>{o.sebango}</td>
                                                <td className='pl-4'>Inventory</td>
                                            </tr>

                                            <tr>
                                                <td>{`${o.model.substring(0, 2)}C`}</td>
                                                <td></td>
                                                <td>{o.wcno}</td>
                                                <td>{o.model}</td>
                                                <td>{o.sebango}</td>
                                                <td className='td-head font-bold text-left pl-2'>Inventory Planning</td>
                                            </tr>
                                            <tr>
                                                <td>{`${o.model.substring(0, 2)}C`}</td>
                                                <td></td>
                                                <td>{o.wcno}</td>
                                                <td>{o.model}</td>
                                                <td>{o.sebango}</td>
                                                <td className='td-head font-bold text-left pl-4'>Inventory Planning(Main)</td>
                                            </tr>
                                            <tr>
                                                <td>{`${o.model.substring(0, 2)}C`}</td>
                                                <td></td>
                                                <td>{o.wcno}</td>
                                                <td>{o.model}</td>
                                                <td>{o.sebango}</td>
                                                <td className='td-head font-bold text-left pl-4'>Inventory Planning(Final)</td>
                                            </tr>
                                        </>
                                    })
                                }

                                {/* {
                        listActPlans.map((o: MActPlans) => {
                            console.log(o)
                            return <tr>
                                <td>{o.wcno}</td>
                                <td>{o.model}</td>
                                <td>-</td>
                                <td>-</td>
                                <td>Current Plan</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                                <td>-</td>
                            </tr>
                        })
                    } */}
                            </tbody>
                        </table>
                    </Stack>
                </div>
            </Stack>
        </Stack>
    )
}

export default Detail