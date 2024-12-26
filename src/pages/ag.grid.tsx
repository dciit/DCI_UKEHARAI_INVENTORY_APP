//@ts-nocheck
import { useEffect, useMemo, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ModuleRegistry, ClientSideRowModelModule } from 'ag-grid-community';
import { PropUkeInfo } from '../interface';
import { APIGetUkeInfoRedis, APISetUkeInfoRedis } from '../Service';
import { Button, Segmented, Space } from 'antd';
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineDownload } from "react-icons/ai";

ModuleRegistry.registerModules([
    ClientSideRowModelModule
]);
let times = 1;


function AgGrid() {
    const [modelGroup, setModelGroup] = useState<string>('1YC');
    const customCell = ((params: any) => {
        // const rowNode = params.node; // Access the row node
        // const rowIndex = rowNode.rowIndex; // Retrieve row index
        const { value, data } = params;
        // return <Button size='small' onClick={() => handleBlur(params, data)}>{value}</Button> 
        return <span className={`text-bold ${((data.model == 'DIVIDER')) && 'text-white'}`}>{value}</span>
    })

    const customCellVal = ((params: any) => {
        const { value } = params;
        try {
            return <span className={`${Number(value.replace(',', '')) < 0 && 'text-red-600'} drop-shadow-lg tracking-wider`}>{value}</span>
        } catch {
            return <span className={`text-red-600`}>Error</span>
        }
    })
    const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
    const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
    const [rowData, setRowData] = useState<PropUkeInfo[]>([]);
    const [columnDefs] = useState([
        { field: "model", headerName: "Models", pinned: 'left', cellRenderer: customCell, cellStyle: { fontWeight: 'bold' } },
        { field: "sebango", pinned: 'left' },
        { field: "type", pinned: 'left', cellStyle: { fontWeight: 'bold' } },
        { field: "pltype", pinned: 'left', headerName: 'Pallet Type' },
        { field: "fgGroup", headerName: "Grp Model", cellStyle: { fontWeight: 'bold' }, cellRenderer: customCell },
        { field: "sbu", headerName: "SBU" },
        { field: "line", headerName: "Line" },
        { field: "customer", headerName: "Customer", cellStyle: { fontWeight: 'bold' } },
        { field: 'd01', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd02', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd03', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd04', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd05', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd06', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd07', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd08', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd09', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd10', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd11', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd12', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd13', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd14', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd15', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd16', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd17', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd18', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd19', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd20', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd21', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd22', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd23', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd24', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd25', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd26', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd27', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd28', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd29', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd30', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: 'd31', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
        { field: "total", pinned: 'right', cellStyle: { textAlign: 'right', fontWeight: 'bold' }, cellRenderer: customCellVal },
    ]);
    // const handleBlur = (params: any, data: any) => {
    //     params.api.refreshCells({ rowNodes: [params.node] }); // Refresh row
    // }
    const defaultColDef = useMemo(() => {
        return {
            valueFormatter: (params: any) => {
                times++;
                return params.value;
            },
            cellClass: "custom-border",
            filter: "agTextColumnFilter",
            cellDataType: false,
            sortable: false,
        };
    }, []);
    const FuncSetUkeInfoRedis = async () => {
        const RESLoadUkeInfo = await APISetUkeInfoRedis(`202412`);
        if (RESLoadUkeInfo != null) {
            setRowData(RESLoadUkeInfo);
        }
    }
    const FuncGetUkeInfoRedis = async () => {
        const res: PropUkeInfo[] = await APIGetUkeInfoRedis(`202412`);
        setRowData(res.filter(x => x.fgGroup == modelGroup));
    };
    useEffect(() => {
        FuncGetUkeInfoRedis();
    }, [modelGroup]);

    return (
        <div style={containerStyle} className='p-3 flex flex-col gap-3 h-full'>
            <div className='flex justify-between'>
                <Space >
                    Model Group :
                    <Segmented
                        value={modelGroup}
                        options={['1YC', '2YC', 'SCR', 'ODM']}
                        onChange={(e) => setModelGroup(e)}
                    />
                </Space>
                <div className='flex items-center justify-end gap-2'>
                    <Button type='primary' icon={<AiOutlineSearch />} onClick={() => FuncGetUkeInfoRedis()}>ค้นหา</Button>
                    <Button onClick={() => FuncSetUkeInfoRedis()} icon={<AiOutlineDownload />} >โหลดข้อมูล</Button>
                </div>
            </div>
            <div style={{ height: "100%", boxSizing: "border-box" }}>
                <div
                    style={gridStyle}
                    className={
                        "ag-theme-quartz"
                    }
                >
                    <div id="myGrid" className="ag-theme-alpine ag-small w-[100%] h-[100%]" >
                        <AgGridReact
                            // gridOptions={gridOptions}
                            columnDefs={columnDefs}
                            rowData={rowData}
                            defaultColDef={defaultColDef}
                            suppressColumnVirtualisation={false}
                            suppressRowVirtualisation={true}
                            domLayout='normal'
                            onFirstDataRendered={(params) => {
                                const allColumnIds = params.api.getAllGridColumns().map((col) => col.getId());
                                params.api.autoSizeColumns(allColumnIds);
                            }}
                            rowClassRules={{
                                'row-total-saleforecast': (params) => params.data.type == 'Total Sales Plan&Forecast',
                                'row-saleforecast': (params) => params.data.type == 'Sales Plan&Forecast',
                                'row-delivery': (params) => params.data.type == 'Delivery',
                                'row-total-inventory': (params) => params.data.type == 'Total Inventory',
                                'row-inventory': (params) => params.data.type == 'Inventory',
                                'row-total-inventory-balance': (params) => params.data.type == 'Total Inventory (Balance)',
                                'row-inventory-balance': (params) => params.data.type == 'Inventory Balance (Pltype)',
                                'row-inbound': (params) => params.data.type == 'Total Inbound Finishgoods',
                                'row-current-plan': (params) => params.data.type == 'Current Plan of Line',
                                'row-result-main': (params) => params.data.type == 'Result_Main Assembly',
                                'row-result-final': (params) => params.data.type == 'Result_Final Line',
                                'row-total-current-plan': (params) => params.data.type == 'Total Current Plan',
                                'row-hold': (params) => params.data.type == 'Inventory (Hold)',
                                'row-pdt': (params) => params.data.type == 'Inventory (PDT)',
                                'row-inventory-planning': (params) => params.data.type == 'Inventory Planning',
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AgGrid