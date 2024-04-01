//@ts-nocheck
import { useEffect, useRef } from 'react';
import { DownloadTableExcel } from "react-export-table-to-excel";
import { MActPlan, MActPlans } from '../interface';
import { Button } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
function ExportToExcel(props: any) {
    const { data, ym } = props;
    const tableRef = useRef(null);
    var ExcelName = `UKEHARAI-${ym}`;
    return <>
        <DownloadTableExcel
            filename={ExcelName}
            sheet="D/O Plan"
            currentTableRef={tableRef.current}
        >
            <Button variant='contained' startIcon={<FileDownloadOutlinedIcon />}>
                Export to excel
            </Button>
        </DownloadTableExcel>
        <table ref={tableRef} className="hidden">
            <tbody>
                <tr>
                    <th>Model</th>
                    <th>Sebango</th>
                    <th>Type</th>
                    <th>Grp Model</th>
                    <th>SBU</th>
                    <th>Line</th>
                    <th>Customer</th>
                    <th>Pltype</th>
                    {
                        [...Array(31)].map((oDay: any, iDay: number) => {
                            return <td key={iDay}>{(iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 })}</td>
                        })
                    }
                    <th>Total</th>
                </tr>
                {
                    data.filter((o: MActPlans, iData: number) => o.type != 'empty').map((oData: MActPlans, iData: number) => {
                        let total: number = 0;
                        [...Array(31)].map((oDay: any, iDay: number) => {
                            let val: string = oData[`d${(iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 })}`];
                            total += parseInt(val != '' ? val : '0');
                        })
                        return <tr key={iData}>
                            <td>{oData.modelCode}</td>
                            <td>{oData.sebango}</td>
                            <td>{oData.type}</td>
                            <td>{oData.modelGroup}</td>
                            <td>{oData.sbu}</td>
                            <td>{oData.line}</td>
                            <td>{oData.customer}</td>
                            <td>{oData.pltype}</td>
                            {
                                [...Array(31)].map((oDay: any, iDay: number) => {
                                    return <td key={oDay}>{oData[`d${(iDay + 1).toLocaleString('en', { minimumIntegerDigits: 2 })}`]}</td>
                                })
                            }
                            <td>{total}</td>
                        </tr>
                    })
                }
            </tbody>
        </table>
    </>
}
export default ExportToExcel;