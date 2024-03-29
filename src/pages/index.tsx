//@ts-nocheck
import { useEffect, useMemo, useRef, useState } from 'react';
import {
    MaterialReactTable,
    useMaterialReactTable,
    type MRT_ColumnDef,
    type MRT_SortingState,
    type MRT_RowVirtualizer,
} from 'material-react-table';
import { initData, type Person } from '../makeData';
import { API_INIT_ACT_PLAN } from '../Service';
import moment from 'moment';
import { Box, Button, CircularProgress, MenuItem, Select, Stack, Tab, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { MGetActPlan, MTitle } from '../interface';
import DialogAdjustInventoryMain from '../components/dialog.adjust.inventory';
import CircleIcon from '@mui/icons-material/Circle';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import UkeharaiGroupModel from './ukeharai.groupmodel';
import ListIcon from '@mui/icons-material/List';
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';
import PageAdjustPlan from './ukeharai.adjust.plan';
import { mkConfig, generateCsv, download } from 'export-to-csv';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
const csvConfig = mkConfig({
    fieldSeparator: ',',
    decimalSeparator: '.',
    useKeysAsHeaders: true,
});
const Index = () => {
    const [_year, setYear] = useState<string>(moment().format('YYYY'));
    const [_years] = useState<string[]>([moment().add(-1, 'year').year().toString(), moment().year().toString()]);
    const [_month, setMonth] = useState<number>(parseInt(moment().format('MM')) - 1);
    const [_months] = useState<string[]>([
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม"]);
    const [titleRows] = useState<string[]>([
        'Current Plan', 'Total Inbound Finishgoods', 'Total Sales Plan&Forecast', 'Total Inventory', 'Inventory Planning', 'Inventory (Hold)', 'Inventory (PDT)'
    ]);
    const [openAdjStockMain, setOpenAdjStockMain] = useState(false);
    const [ModelSelected, setModelSelected] = useState({});
    const [once, setOnce] = useState<boolean>(true);
    const [TitleStyle] = useState<MTitle[]>([
        { key: 'Current Plan', bg: 'bg-green', class: 'bg-header-current-plan', icon: true, iconColor: 'text-green-500' },
        { key: 'Result_Main Assembly', bg: 'bg-green', class: 'bg-header-result-main', icon: false, iconColor: '' },
        { key: 'Result_Final Line', bg: 'bg-green', class: 'bg-header-result-final', icon: false, iconColor: '' },
        { key: 'Total Inbound Finishgoods', bg: 'bg-red', class: 'bg-header-total-inbound', icon: true, iconColor: 'text-blue-500' },
        { key: 'Inbound Finishgoods', bg: 'bg-orange', class: 'bg-inbound', icon: false, iconColor: '' },
        { key: 'Total Sales Plan&Forecast', bg: 'bg-orange', class: 'bg-header-sale', icon: true, iconColor: 'text-orange-500' },
        { key: 'Sales Plan&Forecast', bg: 'bg-orange', class: 'bg-sale', icon: false, iconColor: '' },
        { key: 'Total Inventory', bg: '', class: 'bg-header-inventory', icon: true, iconColor: 'text-purple-500' },
        { key: 'Inventory (Balance)', bg: '', class: 'bg-header-inventory-balance', icon: true, iconColor: 'text-pink-600' },
        { key: 'Inventory Balance (Pltype)', bg: '', class: 'bg-header-inventory-balance-pltype', icon: false, iconColor: '' },
        { key: 'Inventory', bg: '', class: 'bg-inventory', icon: false, iconColor: '' },
        { key: 'Inventory (Warehouse)', bg: '', class: 'bg-inventory', icon: false, iconColor: '' },
        { key: 'Inventory Planning', bg: '', class: 'bg-inventory-planning', icon: true, iconColor: 'text-orange-600' },
        { key: 'Inventory Planning (Main)', bg: '', class: 'bg-inventory-planning-main', icon: true, iconColor: 'text-orange-700' },
        { key: 'Inventory Planning (Final)', bg: '', class: 'bg-inventory-planning-final', icon: true, iconColor: 'text-orange-700' },
        { key: 'Inventory (Hold)', bg: '', class: 'bg-inventory-hold', icon: true, iconColor: 'text-yellow-500' },
        { key: 'Inventory (PDT)', bg: '', class: 'bg-inventory-pdt', icon: true, iconColor: 'text-yellow-500' },
        { key: 'Total Current Plan', bg: '', class: 'bg-total-current-all-line', icon: true, iconColor: 'text-green-600' },
        { key: 'empty', bg: '', class: 'bg-empty', icon: false, iconColor: '' }

    ])
    const [value, setValue] = useState<string>('1');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    async function handleCloseDialogAdjustInventoryMain() {
        setOpenAdjStockMain(false);
        setModelSelected([]);
    }
    function handleOpenAdjStockMain(oModel: any) {
        setModelSelected(oModel.row.original);
    }
    useEffect(() => {
        if (Object.keys(ModelSelected).length) {
            setOpenAdjStockMain(true);
        }
    }, [ModelSelected])

    function genStyle(cell: any) {
        let type: string = cell.row.original.type;
        let classs: string = '';
        let iStyle = TitleStyle.filter(o => o.key == type);
        if (iStyle.length) {
            try {
                classs = iStyle[0].class;
            } catch (e) {
                alert(e);
            }
        }
        return classs;
    }
    const cols: any = [
        {
            accessorKey: 'model',
            header: 'Grp Model',
            size: 125,
            enableSorting: false,
            enableColumnFilters: false,
            enableColumnOrdering: false,
            filterVariant: 'multi-select',
            Cell: ({ cell }) => (<span className='font-bold w-full text-right pr-2'>{cell.getValue()}</span>)
        },
        {
            accessorKey: 'sbu',
            header: 'SBU',
            size: 100,
            enableSorting: false,
            enableColumnFilters: false,
            enableColumnOrdering: false,
            filterVariant: 'multi-select',
            Cell: ({ cell }) => {
                return <span className='font-bold w-full text-right pr-2'>{cell.getValue()}</span>
            }
        },
        {
            accessorKey: 'wcno',
            header: 'Line',
            size: 75,
            enableSorting: false,
            enableColumnFilters: false,
            enableColumnOrdering: false,
            filterVariant: 'text',
            Cell: ({ cell }) => {
                return <span className='font-bold w-full text-right pr-2'>{cell.getValue()}</span>
            }
        },
        {
            accessorKey: 'modelCode',
            header: 'Model',
            enableColumnOrdering: false,
            size: 150,
            filterVariant: 'multi-select',
            Cell: ({ cell }) => (<span className='font-bold'>{cell.getValue()}</span>)
        },
        {
            accessorKey: 'sebango',
            header: 'Sebango',
            size: 100,
            filterVariant: 'multi-select',
            enableSorting: false,
            enableColumnFilters: false,
            enableColumnOrdering: false,
            Cell: ({ cell }) => (<span className='font-bold w-full text-right pr-2'>{cell.getValue()}</span>)
        },
        {
            accessorKey: 'type',
            header: 'Type',
            size: '200',
            enableColumnOrdering: false,
            enableSorting: false,
            filterVariant: 'multi-select',
            muiTableBodyCellProps: ({
                cell
            }) => ({
                sx: {
                    backgroundColor: TitleStyle.filter(o => o.key == cell.getValue()).length ? TitleStyle.filter(o => o.key == cell.getValue())[0].bg : '',
                    fontWeight: titleRows.includes(cell.getValue()) ? '700' : '400',
                }
            }),
            Cell: ({ cell }) => {
                let type = cell.getValue();
                let classs: string = '';
                let iStyle = TitleStyle.filter(o => o.key == type);
                let showIcon = false;
                let iconColor: string = '';
                if (iStyle.length) {
                    showIcon = iStyle[0].icon;
                    iconColor = iStyle[0].iconColor;
                    try {
                        classs = iStyle[0].class;
                    } catch (e) {
                        alert(e);
                    }
                }
                return <div className={`${classs} ${showIcon ? 'pl-1' : ' pl-5 '} gap-1 flex`} >{showIcon && <CircleIcon className={`${iconColor}`} sx={{ fontSize: 10 }} />}{cell.getValue()}</div>
            }
        },
        {
            accessorKey: 'customer',
            header: 'Customer',
            enableSorting: false,
            size: 100,
            filterVariant: 'multi-select',
            enableColumnOrdering: false,
            muiTableBodyCellProps: ({
                cell
            }) => ({
                sx: {
                    backgroundColor: cell.getValue() != '' ? '' : '',
                    fontWeight: '700',
                }
            }),
            Cell: ({ cell }) => {
                return <div className={``}>{cell.getValue()}</div>
            }
        },
        {
            accessorKey: 'pltype',
            header: 'Pallet Type',
            size: 125,
            enableColumnOrdering: false,
            enableSorting: false,
            filterVariant: 'multi-select',
            muiTableBodyCellProps: ({
                cell
            }) => ({
                sx: {
                    fontWeight: '700',
                    backgroundColor: cell.getValue() != '' ? '' : ''
                }
            }),
            Cell: ({ cell }) => {
                let LastInventory: number = cell.getValue() != '' ? parseInt(cell.getValue()) : 0;
                let type = cell.row.original.type;
                let lastInventoryMain = typeof cell.row.original.lastInventoryMain != 'undefined' ? cell.row.original.lastInventoryMain : [];
                if (type == 'Inventory Planning (Main)' || type == 'Inventory Planning (Final)') {
                    let mainResult: number = lastInventoryMain?.bal | 0;
                    return <Button variant='contained' size='small' onClick={() => handleOpenAdjStockMain(cell)}>Adj.Main ({mainResult.toLocaleString('en')})</Button>
                } else if (type == 'Inventory Planning') {
                    return <span className='w-full text-right pr-2 font-bold'>Last Month : {LastInventory.toLocaleString('en')}</span>
                } else {
                    return <span className={`${cell.row.original.type == 'Inbound Finishgoods' && genStyle(cell)}`}>{cell.getValue()}</span>
                }
            }
        },
    ];
    [...Array(31)].map((o: any, i: number) => {
        let kDay = (i + 1).toLocaleString('en', { minimumIntegerDigits: 2, useGrouping: false });
        cols.push({
            accessorKey: `d${kDay}`,
            header: `${kDay}`,
            size: 55,
            enableSorting: false,
            enableFilters: false,
            enableColumnOrdering: false,
            enableColumnFilter: false,
            enableColumnFilterModes: false,
            showColumnFilters: false,
            Cell: ({ cell }) => {
                let type: string = cell.row.original.type;
                let classs: string = '';
                let iStyle = TitleStyle.filter(o => o.key == type);
                if (iStyle.length) {
                    try {
                        classs = iStyle[0].class;
                    } catch (e) {
                        alert(e);
                    }
                }
                let val: number = 0;
                if (cell.getValue() != '') {
                    val = parseInt(cell.getValue());
                }
                return cell.getValue() != '' ? <span className={`${classs}-day${val > 0 ? '' : '-minus'} w-full pr-2 text-right font-bold ${val > 0 ? '' : 'text-red-600'}`}>
                    {/* {val < 0 && <span className="relative flex h-1 w-1">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-1 w-1 bg-red-600"></span>
                    </span>} */}
                    {val.toLocaleString('en')}
                </span> : <span className={`${classs}-empty`}></span>;
            }
        });
    })
    cols.push({
        accessorKey: `total`,
        header: `Total`,
        enableSorting: false,
        size: 100,
        enableFilters: false,
        enableColumnOrdering: false,
        enableColumnFilter: false,
        enableColumnFilterModes: false,
        showColumnFilters: false,
        Cell: ({ cell }) => {
            let total: string = '0';
            try {
                if (cell.getValue() == '') {
                    total = '0';
                } else {
                    total = cell.getValue();
                }
                let val: number = parseInt(total.toString().replace(',', ''));
                return <span className={`${genStyle(cell)}-total bg-total w-full text-right  pr-4 ${val > 0 && 'font-bold'}`}>{val > 0 ? val.toLocaleString('en') : (val < 0 && <span className='text-red-600 font-bold'>{val.toLocaleString('en')}</span>)}</span>
            } catch (e) {
                return <span className={`bg-total w-full text-right  pr-4`}>-</span>
            }
        }
    });
    const columns = useMemo<MRT_ColumnDef<Person>[]>(
        () => cols,
        [],
    );
    const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);
    const [data, setData] = useState<Person[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    // useEffect(() => {
    // if (once && typeof window !== 'undefined') {
    //     initContent();
    //     setOnce(false);
    // }
    // }, [once]);
    useEffect(() => {
        if (data.length) {
            setIsLoading(false);
        }
    }, [data]);

    useEffect(() => {
        try {
            rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
        } catch (error) {
            console.error(error);
        }
    }, [sorting]);

    async function initContent() {
        setIsLoading(true);
        const res: MGetActPlan = await API_INIT_ACT_PLAN(`${_year}${(_month + 1).toLocaleString('en', { minimumIntegerDigits: 2 })}`);
        console.log(res)
        let data: any = initData(res.content, _year);
        setData(data);
    }
    const handleExportData = () => {
        const csv = generateCsv(csvConfig)(data);
        download(csvConfig)(csv);
    };
    const table = useMaterialReactTable({
        columns,
        data, //10,000 rows
        columnFilterDisplayMode: 'popover',
        defaultDisplayColumn: { enableResizing: false },
        enablePagination: false,
        enableColumnPinning: true,
        enableColumnVirtualization: true,
        enableColumnActions: false,
        positionGlobalFilter: 'left',
        enableRowVirtualization: true,
        enableColumnOrdering: true,
        enableFacetedValues: true,
        muiTableContainerProps: { sx: { maxHeight: '600px' } },
        onSortingChange: setSorting,
        state: { isLoading, sorting },
        rowVirtualizerInstanceRef, //optional
        rowVirtualizerOptions: { overscan: 1 }, //optionally customize the row virtualizer
        columnVirtualizerOptions: { overscan: 1 },
        muiTableBodyRowProps: { hover: false },
        initialState: {
            columnPinning: { left: ['modelCode', 'sebango', 'type'] },
            showGlobalFilter: true,
            density: 'compact'
        },
        muiTableHeadCellProps: () => ({
            sx: {
                backgroundColor: '#f5f5f5',
            },
        }),
        renderTopToolbarCustomActions: () => (
            <Button
                variant='contained'
                onClick={handleExportData}
                startIcon={<FileDownloadIcon />}
            >
                Export All Data
            </Button>
        )
    });
    return <div className='p-6' >
        <TabContext value={value} >
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} className='bg-white' >
                    <Tab className='py-0' icon={<ListIcon />} iconPosition='start' label="Display by model" value="1" />
                    <Tab className='py-0' icon={<ScatterPlotIcon />} iconPosition='start' label="Display by group" value="2" />
                </TabList>
            </Box>
            <TabPanel value="1" className='px-0 pt-3'>
                <div className='group-search flex gap-2 px-4 py-4 bg-white rounded-lg mb-3' style={{ border: '1px solid #ddd' }} >
                    <div>
                        <Typography>Year</Typography>
                        <Select value={_year} size='small' onChange={(e) => setYear(e.target.value)} >
                            {
                                _years.map((oYear: string, iYear: number) => {
                                    return <MenuItem value={oYear} key={iYear}>{oYear}</MenuItem>
                                })
                            }
                        </Select>
                    </div>
                    <div>
                        <Typography>Month</Typography>
                        <Select value={_month} size='small' onChange={(e: any) => {
                            setMonth(e.target.value);
                        }}>
                            {
                                _months.map((oMonth: string, iMonth: number) => {
                                    return <MenuItem value={iMonth} key={iMonth}>{oMonth}</MenuItem>
                                })
                            }
                        </Select>
                    </div>
                    <div>
                        <Typography>&nbsp;</Typography>
                        <Button startIcon={<SearchIcon />} variant='contained' onClick={initContent}>ค้นหา</Button>
                    </div>
                </div>
                <div >
                    {
                        isLoading ? <div className='bg-white rounded-lg pt-6 pb-3' style={{borderWidth:'1px',borderColor:'divider'}}>
                            <Stack className='w-full' alignItems={'center'} gap={1}>
                                <CircularProgress />
                                <Typography>กำลังโหลดข้อมูล</Typography>
                            </Stack>
                        </div> : (
                            !data.length ? <Stack className='w-full ' alignItems={'center'} gap={1}>
                                <div className='bg-white w-full flex justify-center rounded-lg py-3' style={{ border: '1px solid #ddd' }}>
                                    <Typography >ไม่พบข้อมูลที่คุณค้นหา</Typography>
                                </div>
                            </Stack> : <div className='tb-ukeharai'>
                                <MaterialReactTable table={table} />
                            </div>
                        )
                    }
                </div>
            </TabPanel>
            <TabPanel value="2">
                <UkeharaiGroupModel />
            </TabPanel>
            <TabPanel value="3">
                <PageAdjustPlan data={data} />
            </TabPanel>
        </TabContext>
        <DialogAdjustInventoryMain open={openAdjStockMain} close={handleCloseDialogAdjustInventoryMain} model={ModelSelected} />
    </div>;
};

export default Index;
