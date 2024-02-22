
import { Stack} from '@mui/material';

function Detail() {
    // const [data, setData] = useState<MActPlans[]>([]);
    // // const [listCurPlans, setListCurPlans] = useState<ListCurpln[]>([]);
    // // const [models, setModels] = useState<string[]>([]);
    // const [loading, setLoading] = useState<boolean>(true);
    // // const [model, setModel] = useState<string>('');
    // const [once, setOnce] = useState<boolean>(false);
    // let defYear: number = (moment().add(-1, 'year').year());
    // const [_year, setYear] = useState<string>(moment().format('YYYY'));
    // const [_month, setMonth] = useState<string>(moment().format('MM'));
    // const [ThaiMonths] = useState<string[]>(["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"])
    // const days = 31;
    // useEffect(() => {
    //     if (!once) {
    //         init();
    //         setOnce(true);
    //     }
    // }, [once]);

    // useEffect(() => {
    //     if (Object.keys(data).length && model.length == 0) {
    //         setModel(data[0].model)
    //     }
    // }, [data]);

    // useEffect(() => {
    //     initData();
    // }, [model]);

    // async function init() {
    //     await initData();
    // }
    // async function initData() {
    //     // const res = await API_INIT_MODELS('202301');
    //     // setModels(res);
    //     setLoading(true);
    //     const res = await API_INIT_ACT_PLAN({ ym: `${_year}${parseInt(_month).toLocaleString('en', { minimumIntegerDigits: 2 })}` });
    //     console.log(res)
    //     setData(res);
    //     setLoading(false);
    // }
    // async function handleSearch() {
    //     await initData();
    // }


    // const columns = useMemo<MRT_ColumnDef<Person>[]>();

    // //optionally access the underlying virtualizer instance
    // const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);

    // const [data, setData] = useState<Person[]>([]);
    // const [isLoading, setIsLoading] = useState(true);
    // const [sorting, setSorting] = useState<MRT_SortingState>([]);

    // useEffect(() => {
    //     if (typeof window !== 'undefined') {
    //         setData(makeData(10_000));
    //         setIsLoading(false);
    //     }
    // }, []);

    // useEffect(() => {
    //     //scroll to the top of the table when the sorting changes
    //     try {
    //         rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }, [sorting]);

    // const table = useMaterialReactTable({
    //     columns,
    //     data, //10,000 rows
    //     defaultDisplayColumn: { enableResizing: true },
    //     enableBottomToolbar: false,
    //     enableColumnResizing: true,
    //     enableColumnVirtualization: true,
    //     enableGlobalFilterModes: true,
    //     enablePagination: false,
    //     enableColumnPinning: true,
    //     enableRowNumbers: true,
    //     enableRowVirtualization: true,
    //     muiTableContainerProps: { sx: { maxHeight: '600px' } },
    //     onSortingChange: setSorting,
    //     state: { isLoading, sorting },
    //     rowVirtualizerInstanceRef, //optional
    //     rowVirtualizerOptions: { overscan: 5 }, //optionally customize the row virtualizer
    //     columnVirtualizerOptions: { overscan: 2 }, //optionally customize the column virtualizer
    // });

    return (
        <Stack spacing={3} p={6}>
            <Stack p={3} spacing={3} >
                {/* <Stack direction={'row'} gap={2} alignItems={'center'}>
                    <Box style={{ border: '1px solid #ddd' }} className={'rounded-lg bg-[#f6f8fa] cursor-pointer hover:border-[#acacac] duration-300'}>
                        <TextField id="outlined-select-currency-native"
                            size='small'
                            select
                            label="ค้นหา ปี"
                            SelectProps={{
                                native: true,
                            }}
                            helperText="กรุณาเลือกปี"
                            value={_year} onChange={(e: any) => setYear(e.target.value)}>
                            {
                                [...Array(3)].map((oYear: string, iYear: number) => {
                                    if (iYear > 0) {
                                        defYear = defYear + 1
                                    }
                                    return <option key={iYear} value={defYear}>
                                        {defYear}
                                    </option>
                                })
                            }
                        </TextField>
                    </Box>
                    <Box style={{ border: '1px solid #ddd' }} className={'rounded-lg bg-[#f6f8fa] cursor-pointer hover:border-[#acacac] duration-300'}>
                        <TextField id="outlined-select-currency-native"
                            size='small'
                            select
                            label="ค้นหา เดือน"
                            defaultValue="EUR"
                            SelectProps={{
                                native: true,
                            }}
                            helperText="กรุณาเลือกเดือน"
                            value={_month} onChange={(e: any) => setMonth(e.target.value)}>
                            {
                                ThaiMonths.map((oThM: string, iThM: number) => {
                                    return <option key={iThM} value={iThM}>
                                        {oThM}
                                    </option>
                                })
                            }
                        </TextField>
                    </Box>
                    <Button variant='contained' startIcon={<SearchIcon />} onClick={handleSearch}>ค้นหา</Button>
                </Stack>
                {
                    loading ? <Stack direction={'column'} alignItems={'center'} gap={1} pt={3}>
                        <CircularProgress />
                        <Typography>กำลังโหลดข้อมูล ...</Typography>
                    </Stack> : (
                        Object.keys(data).length ?
                            data.map((o: MActPlans, iData: number) => {
                                console.log(iData)
                                let sumPlan = 0;
                                let sumFinal = 0;
                                let sumInboundIn = 0;
                                return <div className='wrapper' key={iData}><Stack gap={1}>
                                    <Box className='px-0 py-2 rounded-lg'>
                                        <Typography className='text-[#0969da] text-[1.75rem] font-semibold'>{o.model}</Typography>
                                    </Box>
                                    <div className='p-3 bg-red'>
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
                                                        [...Array(31)].map((oDay: any, iDay: number) => {
                                                            let day = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
                                                            return <td>{
                                                                day
                                                            }</td>
                                                        })
                                                    }
                                                    <td>Total</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{`${o.model.substring(0, 2)}C`}</td>
                                                    <td></td>
                                                    <td>{o.wcno}</td>
                                                    <td className='font-bold'>{o.model}</td>
                                                    <td>{o.sebango}</td>
                                                    <td className='td-head bg-plan-head text-left pl-2 td-bold'>Current Plan</td>
                                                    <td className='td-head bg-plan-head' ></td>
                                                    <td className='td-head bg-plan-head'></td>
                                                    <td className='td-head bg-plan-head'></td>
                                                    <td>Current Plan</td>
                                                    <td>On Web</td>
                                                    <td></td>
                                                    {
                                                        [...Array(days)].map((oDay: ListCurpln, iDay: number) => {
                                                            let vDay = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
                                                            let t: any = o.listCurpln;
                                                            let CurrentVal: number = t[`day${vDay}`] != '' ? parseInt(t[`day${vDay}`]) : 0;
                                                            sumPlan += CurrentVal;
                                                            return <td className={`${CurrentVal > 0 ? 'bg-plan-content' : ''}`}>{CurrentVal > 0 ? CurrentVal.toLocaleString('en') : '-'}</td>
                                                        })
                                                    }
                                                    <td className='bg-plan-total'>{sumPlan.toLocaleString('en')}</td>
                                                </tr>
                                                <tr>
                                                    <td>{`${o.model.substring(0, 2)}C`}</td>
                                                    <td></td>
                                                    <td>{o.wcno}</td>
                                                    <td className='font-bold'>{o.model}</td>
                                                    <td>{o.sebango}</td>
                                                    <td className='text-left pl-4 bg-plan-sub font-bold'>Result_Main Assembly</td>
                                                    <td className='bg-plan-sub'></td>
                                                    <td className='bg-plan-sub'></td>
                                                    <td className='bg-plan-sub'></td>
                                                    <td>TSN (Result Main Assemby)</td>
                                                    <td>Result Main Assemby</td>
                                                    <td></td>
                                                    <td colSpan={31}></td>
                                                </tr>
                                                <tr>
                                                    <td>{`${o.model.substring(0, 2)}C`}</td>
                                                    <td></td>
                                                    <td>{o.wcno}</td>
                                                    <td className='font-bold'>{o.model}</td>
                                                    <td>{o.sebango}</td>
                                                    <td className='text-left pl-4 bg-plan-sub font-bold' >Result_Final Line</td>
                                                    <td className='bg-plan-sub'></td>
                                                    <td className='bg-plan-sub'></td>
                                                    <td className='bg-plan-sub'></td>
                                                    <td>TSM (Result Final Line)</td>
                                                    <td>Result Final Line</td>
                                                    <td></td>
                                                    {
                                                        [...Array(days)].map((v: any, i: number) => {
                                                            let day = (i + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
                                                            let itemActPlan = o.listActPln.filter((oItemActPlan: MActPlan) => {
                                                                // console.log(oItemActPlan.prdymd,day)
                                                                return oItemActPlan.prdymd == day;
                                                            });
                                                            if (Object.keys(itemActPlan).length) {
                                                                sumFinal += itemActPlan[0].qty;
                                                            }
                                                            return <td className={`text-center ${Object.keys(itemActPlan).length ? 'bg-plan-content' : ''}`}>{
                                                                Object.keys(itemActPlan).length ? itemActPlan[0].qty.toLocaleString('en') : '-'
                                                            }</td>
                                                        })
                                                    }
                                                    <td className='bg-plan-total'>{sumFinal.toLocaleString('en')}</td>
                                                </tr>
                                                <tr>
                                                    <td colSpan={5}></td>
                                                    <td className='td-head bg-inbound-head font-bold text-left pl-2'>Total Inbound Finishgoods </td>
                                                    <td className='td-head bg-inbound-head'></td>
                                                    <td className='td-head bg-inbound-head'>
                                                        <div className='cursor-pointer'>show more</div>
                                                    </td>
                                                    <td className='td-head bg-inbound-head'></td>
                                                    <td className=''>Total IVW19-Assortment</td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>

                                                {
                                                    o.listPltype.map((oPltype: string, iPltype: number) => {
                                                        sumInboundIn = 0;
                                                        var oInboundByPltype = o.listInbound.filter((oInbound: ListInbound) => oInbound.pltype == oPltype);
                                                        return <tr key={iPltype}>
                                                            <td>{`${o.model.substring(0, 2)}C`}</td>
                                                            <td></td>
                                                            <td>{o.wcno}</td>
                                                            <td className='font-bold'>{o.model}</td>
                                                            <td>{o.sebango}</td>
                                                            <td className='text-left pl-4 bg-inbound-sub font-bold'>Inbound Finishgoods</td>
                                                            <td></td>
                                                            <td className='bg-inbound-sub font-bold'>{oPltype}</td>
                                                            <td>MDW27 Pallet Type Mapping</td>
                                                            <td>IVW19-Assortment</td>
                                                            <td>Result-In/Out WH(Balance)</td>
                                                            <td></td>
                                                            {

                                                                [...Array(31)].map((oDay: string, iDay: number) => {
                                                                    var txtDay = iDay + 1;
                                                                    var loopDate: string = `${_year}-${parseInt(_month).toLocaleString('en', { minimumIntegerDigits: 2 })}-${txtDay.toLocaleString('en', { minimumIntegerDigits: 2 })}`;
                                                                    var oInboundInOfDay = oInboundByPltype.filter((oInbound: ListInbound) => oInbound.astDate.toString().substring(0, 10) == loopDate && oInbound.astType == 'IN');
                                                                    var oInboundOutOfDay = oInboundByPltype.filter((oInbound: ListInbound) => oInbound.astDate.toString().substring(0, 10) == loopDate && oInbound.astType == 'OUT');
                                                                    var txtInbound: number = 0;
                                                                    if (Object.keys(oInboundInOfDay).length) {
                                                                        txtInbound = oInboundInOfDay[0].astQty;
                                                                    }
                                                                    if (Object.keys(oInboundOutOfDay).length) {
                                                                        txtInbound -= oInboundOutOfDay[0].astQty;
                                                                    }
                                                                    sumInboundIn += txtInbound;
                                                                    return <td className={`${txtInbound != 0 ? (txtInbound > 0 ? 'text-green-700  bg-inbound-content ' : 'text-red-500  bg-inbound-content ') : ''}`}>{txtInbound != 0 ? txtInbound.toLocaleString('en') : '-'}</td>
                                                                })
                                                            }
                                                            <td className={`font-bold ${sumInboundIn > 0 ? 'bg-inbound-total' : ''}`}>{sumInboundIn.toLocaleString('en')}</td>
                                                        </tr>
                                                    })
                                                }
                                                <tr>
                                                    <td colSpan={5}></td>
                                                    <td className='td-head bg-sale-head font-bold text-left pl-2'>Total Sales Plan&Forecast</td>
                                                    <td className='td-head bg-sale-head'></td>
                                                    <td className='td-head bg-sale-head'></td>
                                                    <td className='td-head bg-sale-head'></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                {
                                                    o.listPltype.map((oPltype: string) => {
                                                        let oSaleForecast = o.listSaleForecast.filter((oSale: ListSaleForecast) => oSale.modelName == o.model && oSale.pltype == oPltype);
                                                        if (Object.keys(oSaleForecast).length) {
                                                            oSaleForecast.map((oSale: ListSaleForecast, iSale: number) => {
                                                                return <tr key={iSale}>
                                                                    <td>{`${o.model.substring(0, 2)}C`}</td>
                                                                    <td></td>
                                                                    <td>{o.wcno}</td>
                                                                    <td>{o.model}</td>
                                                                    <td>{o.sebango}</td>
                                                                    <td className='bg-sale-sub pl-4 font-bold'>Sales Plan&Forecast</td>
                                                                    <td>{oSale.customer}</td>
                                                                    <td>{oSale.pltype}</td>
                                                                    <td></td>
                                                                    <td className='font-bold'>Sales Plan&Forecast</td>
                                                                    <td></td>
                                                                    <td>day Sale</td>
                                                                    {
                                                                        [...Array(days)].map((oDay: ListCurpln, iDay: number) => {
                                                                            let vDay = (iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
                                                                            let t: any = oSale;
                                                                            let CurrentVal: number = t[`d${vDay}`] != '' ? parseInt(t[`d${vDay}`]) : 0;
                                                                            if (CurrentVal > 0) {
                                                                                return <td className={`${CurrentVal > 0 ? 'bg-orange-400' : ''}`}>{CurrentVal.toLocaleString('en')}</td>
                                                                            } else {
                                                                                return <td>-</td>
                                                                            }
                                                                        })
                                                                    }
                                                                </tr>
                                                            })
                                                        } else {
                                                            return <tr >
                                                                <td>{`${o.model.substring(0, 2)}C`}</td>
                                                                <td></td>
                                                                <td>{o.wcno}</td>
                                                                <td className='font-bold'>{o.model}</td>
                                                                <td>{o.sebango}</td>
                                                                <td className='bg-sale-sub pl-4 font-bold'>Sales Plan&Forecast</td>
                                                                <td></td>
                                                                <td className='font-bold bg-sale-sub'>{oPltype}</td>
                                                                <td></td>
                                                                <td></td>
                                                                <td></td>
                                                                <td>day Sale</td>
                                                                {
                                                                    [...Array(days)].map((oDay: ListCurpln, iDay: number) => {
                                                                        return <td>-</td>
                                                                    })
                                                                }
                                                                <td>Total</td>
                                                            </tr>
                                                        }
                                                    })
                                                }
                                                <tr>
                                                    <td colSpan={5}></td>
                                                    <td className='td-head font-bold text-left pl-2 bg-inventory-head'>Total Inventory</td>
                                                    <td className='td-head bg-inventory-head'></td>
                                                    <td className='td-head bg-inventory-head'></td>
                                                    <td className='td-head bg-inventory-head'></td>
                                                    <td className='font-semibold'>IVW01 Product Detail</td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                                {
                                                    o.listPltype.map((oPltype: string) => {
                                                        return <tr>
                                                            <td>{`${o.model.substring(0, 2)}C`}</td>
                                                            <td></td>
                                                            <td>{o.wcno}</td>
                                                            <td className='font-bold'>{o.model}</td>
                                                            <td>{o.sebango}</td>
                                                            <td className='pl-4 bg-inventory-sub font-bold'>Inventory</td>
                                                            <td></td>
                                                            <td className='bg-inventory-sub font-bold'>{oPltype}</td>
                                                            <td>MDW27 Pallet Type Mapping</td>
                                                            <td>IVW01 Product Detail</td>
                                                            <td>day BAL = LBAL + day IN - day OUT</td>
                                                            <td></td>
                                                            {
                                                                [...Array(31)].map((iDay: number, oDay: number) => {
                                                                    let Day = oDay + 1;
                                                                    return <td key={iDay}   >-</td>;
                                                                })
                                                            }
                                                            <td>Total</td>
                                                        </tr>
                                                    })
                                                }
                                                <tr>
                                                    <td colSpan={5} rowSpan={3}></td>
                                                    <td className='td-head font-bold text-left pl-2 bg-footer'>Inventory Planning</td>
                                                    <td className='td-head bg-footer' ></td>
                                                    <td className='td-head bg-footer' ></td>
                                                    <td className='td-head bg-footer' ></td>
                                                </tr>
                                                <tr>
                                                    <td className='td-head font-bold text-left pl-4 bg-footer'>Inventory Planning(Main)</td>
                                                    <td className='td-head bg-footer' ></td>
                                                    <td className='td-head bg-footer' ></td>
                                                    <td className='td-head bg-footer' ></td>
                                                </tr>
                                                <tr>
                                                    <td className='td-head font-bold text-left pl-4 bg-footer'>Inventory Planning(Final)</td>
                                                    <td className='td-head bg-footer' ></td>
                                                    <td className='td-head bg-footer' ></td>
                                                    <td className='td-head bg-footer' ></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Stack></div>
                            })
                            : <Typography className='w-full text-center'>ไม่พบข้อมูล</Typography>
                    )
                } */}

            </Stack>
        </Stack>
    )
}

export default Detail