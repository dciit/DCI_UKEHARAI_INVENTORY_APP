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
import { Button, MenuItem, Select, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
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
    const cols: any = [
        {
            accessorKey: 'model',
            header: 'Group Model',
            size: 100,
            enableSorting: false,
            enableColumnFilters: false,
            enableColumnOrdering: false,
        },
        {
            accessorKey: 'sbu',
            header: 'SBU',
            size: 100,
            enableSorting: false,
            enableColumnFilters: false,
            enableColumnOrdering: false,
        },
        {
            accessorKey: 'wcno',
            header: 'Line',
            size: 100,
            enableSorting: false,
            enableColumnFilters: false,
            enableColumnOrdering: false,
        },
        {
            accessorKey: 'modelCode',
            header: 'Model',
            // filterFn: 'fuzzy',
            enableColumnOrdering: false,
            size: 125,
            filterVariant: 'multi-select',
            Cell: ({ cell }) => (<span className='font-bold'>{cell.getValue()}</span>)
        },
        {
            accessorKey: 'sebango',
            header: 'Sebango',
            size: 100,
            enableSorting: false,
            enableColumnFilters: false,
            enableColumnOrdering: false,
        },
        {
            accessorKey: 'type',
            header: 'Type',
            size: '200',
            enableColumnOrdering: false,
            enableSorting: false,
            muiTableBodyCellProps: ({
                cell
            }) => ({
                sx: {
                    backgroundColor: titleRows.includes(cell.getValue<string>()) ? 'rgba(22, 184, 44, 0.5)' : '',
                    fontWeight: titleRows.includes(cell.getValue<string>()) ? '700' : '400',
                }
            }),
            Cell: ({ cell }) => {
                let txtType = cell.getValue();
                let classs = '';
                if (txtType == 'Current Plan' || txtType == 'Total Inbound Finishgoods' || txtType == 'Total Sales Plan&Forecast' || txtType == 'Total Inventory') {
                    classs = 'current-plan-bg'
                }
                if (txtType == 'Result_Main Assembly' || txtType == 'Result_Final Line' || txtType == 'Inbound Finishgoods' || txtType == 'Sales Plan&Forecast' || txtType == 'Inventory') {
                    classs = 'result-main-bg'
                }
                return <div className={`${classs}`}>{cell.getValue()}</div>
            }
        },
        {
            accessorKey: 'customer',
            header: 'Customer',
            enableSorting: false,
            size: 125,
            enableColumnOrdering: false,
            muiTableBodyCellProps: ({
                cell
            }) => ({
                sx: {
                    backgroundColor: cell.getValue<string>() != '' ? '#8adb9547' : '',
                    fontWeight: '700',
                }
            }),
            Cell: ({ cell }) => {
                return <div className={`customer-bg`}>{cell.getValue()}</div>
            }
        },
        {
            accessorKey: 'pltype',
            header: 'Pallet Type',
            size: 125,
            enableColumnOrdering: false,
            enableSorting: false,
            muiTableBodyCellProps: ({
                cell
            }) => ({
                sx: {
                    fontWeight: '700',
                    backgroundColor: cell.getValue<string>() != '' ? '#8adb9540' : ''
                }
            }),
        },
    ];
    [...Array(31)].map((o: any, i: number) => {
        let kDay = (i + 1).toLocaleString('en', { minimumIntegerDigits: 2, useGrouping: false });
        cols.push({
            accessorKey: `d${kDay}`,
            header: `${kDay}`,
            size: 75,
            enableSorting: false,
            enableColumnFilters: false,
            enableColumnOrdering: false,
            Cell: ({ cell }) => {
                if (titleRows.includes(data[cell.row.index].type)) {
                    return cell.getValue() != '' ? <span className={`text-right w-full pr-2 ${cell.getValue() > 0 ? ' bg-[#e2f6e4] font-bold' : (cell.getValue() < 0 && 'bg-red-100 font-bold')}`}>{cell.getValue() > 0 ? parseInt(cell.getValue()).toLocaleString('en') : (parseInt(cell.getValue()) == 0 ? '' : parseInt(cell.getValue()).toLocaleString('en'))}</span> : '';
                } else {
                    return cell.getValue();
                }

            }
        });
    })
    cols.push({
        accessorKey: `total`,
        header: `Total`,
        Cell: ({ cell }) => {
            let total: number = 0;
            try {
                total = parseInt(cell.getValue().replace(',', ''));
                return <span className={`w-full text-right  pr-4 ${parseInt(cell.getValue()) > 0 && 'font-bold'}`}>{total > 0 ? total.toLocaleString('en') : ''}</span>
            } catch {
                return <span className={`w-full text-right  pr-4`}>-</span>
            }
        }
    });
    const columns = useMemo<MRT_ColumnDef<Person>[]>(
        () => cols,
        [],
    );
    const rowVirtualizerInstanceRef = useRef<MRT_RowVirtualizer>(null);
    const [data, setData] = useState<Person[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sorting, setSorting] = useState<MRT_SortingState>([]);
    useEffect(() => {
        if (typeof window !== 'undefined') {
            initContent();
        }
    }, []);

    useEffect(() => {
        try {
            rowVirtualizerInstanceRef.current?.scrollToIndex?.(0);
        } catch (error) {
            console.error(error);
        }
    }, [sorting]);

    async function initContent() {
        const res = await API_INIT_ACT_PLAN(`${_year}${(_month + 1).toLocaleString('en', { minimumIntegerDigits: 2 })}`);
        let data: any = initData(res);
        setData(data);
        setIsLoading(false);
    }

    const table = useMaterialReactTable({
        columns,
        data, //10,000 rows
        columnFilterDisplayMode: 'popover',
        defaultDisplayColumn: { enableResizing: false },
        enablePagination: false,
        enableColumnPinning: true,
        enableColumnVirtualization: true,
        enableGlobalFilterModes: true,
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
        // mrtTheme: (theme) => ({
        //     baseBackgroundColor: theme.palette.background.default, //change default background color
        // }),
        initialState: {
            columnPinning: { left: ['modelCode', 'type'] },
            showGlobalFilter: true,
            density: 'compact'
        },
        muiTableHeadCellProps: ({ column }) => ({
            sx: {
                backgroundColor: '#f5f5f5',
            },
        }),
        muiTableHeadProps: ({ head }) => (
            {
                sx: {
                    color: 'red'
                }
            }
        )
    });

    return <div className='tb-ukeharai p-4'>
        <div className='group-search flex gap-2 px-4 pt-4' >
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
                <Select value={_month} size='small' onChange={(e) => {
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
                <Button startIcon={<SearchIcon />} variant='contained' size='small' onClick={initContent}>ค้นหา</Button>
            </div>
        </div>
        <div className='p-4'>
            <MaterialReactTable table={table} />
        </div>
    </div>;
};

export default Index;
