import { Button, CircularProgress, Divider } from '@mui/material'
import { useEffect, useState } from 'react'
import { colorText } from '../constant';
import moment, { Moment } from 'moment';
import SearchIcon from '@mui/icons-material/Search';
import { ParamIotResult, PropsIotResult } from '../interface';
import { ApiGetIotResult } from '../Service';
const typeList = [
    'MAIN', 'FINAL'
]
function ResultPage() {
    let dtNow: Moment = moment();
    const [param, setParam] = useState<ParamIotResult>({ type: typeList[0], year: dtNow.format('YYYY'), month: dtNow.format(`M`), line: '%' });
    const [data, setData] = useState<PropsIotResult[]>([]);
    const [dataDefault, setDataDefault] = useState<PropsIotResult[]>([]);
    const [load, setLoad] = useState<boolean>(false);
    const [search, setSearch] = useState<string>('');
    const handleSearch = async () => {
        setLoad(true);
        let res = await ApiGetIotResult(param);
        setData(res);
        setDataDefault(res);
        setLoad(false);
    }
    useEffect(() => {
        let cloneData: PropsIotResult[] = Array.from(dataDefault);
        if (search.trim().length > 0) {
            cloneData = cloneData.filter((o: PropsIotResult) => o.modelName.includes(search) || o.lineName.substring(-1).includes(search) || o.model_No.includes(search) || o.shiftDate.includes(search) || o.cnt.toString().includes(search));
            setData([...cloneData]);
        } else {
            setData([...dataDefault]);
        }
    }, [search])
    return (
        <div className='p-6 flex flex-col gap-3'>
            <div id='filter' className='rounded-md border p-4 shadow-sm flex  gap-6'>
                <div className='flex-none'>
                    <div className='flex-none'>ค้นหา</div>
                    <div className='grow pl-3 flex items-center gap-3'>
                        <div className='flex flex-col gap-1 min-w-[150px]'>
                            <small className={`${colorText}`}>ประเภทของข้อมูล</small>
                            <select className='bg-[#f9fafb] border border-[#d1d5db] pl-2 h-[36px] pb-[2px] focus-visible:outline-none cursor-pointer rounded-md text-gray-600 w-full'>
                                {
                                    typeList.map((oType: string, iType: number) => <option value={oType} key={iType}>{oType}</option>)
                                }
                            </select>
                        </div>
                        <div className='flex flex-col gap-1 min-w-[75px]'>
                            <small className={`${colorText}`}>ไลน์</small>
                            <select className=' pr-2 bg-[#f9fafb] border border-[#d1d5db] pl-2 h-[36px] pb-[2px] focus-visible:outline-none cursor-pointer rounded-md text-gray-600 w-full' onChange={(e) => setParam({ ...param, line: e.target.value })}>
                                <option value="%">%</option>
                                {
                                    [...Array(8)].map((_: string, iLine: number) => <option value={iLine + 1} key={iLine}>{iLine + 1}</option>)
                                }
                            </select>
                        </div>
                        <div className='flex flex-col gap-1 min-w-[150px]'>
                            <small className={`${colorText}`}>ปี</small>
                            <select className=' pr-2 bg-[#f9fafb] border border-[#d1d5db] pl-2 h-[36px] pb-[2px] focus-visible:outline-none cursor-pointer rounded-md text-gray-600 w-full' onChange={(e) => setParam({ ...param, year: e.target.value })} value={param.year}>
                                {
                                    [moment().format('YYYY'), moment().subtract(1, 'year').format('YYYY')].map((oYear: string, iYear: number) => <option value={iYear} key={iYear}>{oYear}</option>)
                                }
                            </select>
                        </div>
                        <div className='flex flex-col gap-1 min-w-[150px]'>
                            <small className={`${colorText}`}>เดือน</small>
                            <select className=' pr-2 bg-[#f9fafb] border border-[#d1d5db] pl-2 h-[36px] pb-[2px] focus-visible:outline-none cursor-pointer rounded-md text-gray-600 w-full' onChange={(e) => setParam({ ...param, month: e.target.value })} value={param.month}>
                                {
                                    ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((oMonth: string, iMonth: number) => <option value={iMonth + 1} key={iMonth}>{`${oMonth.toUpperCase()} (${(iMonth + 1).toString().padStart(2, '0')})`}</option>)
                                }
                            </select>
                        </div>
                    </div>
                </div>
                <div className=' flex-none flex items-end justify-end'>
                    <Button variant='contained' startIcon={<SearchIcon />} onClick={handleSearch}>ค้นหา</Button>
                </div>
                <div className='grow items-center flex justify-end pr-6 w-full mt-2 pl-3 sticky top-3'>
                    <div className='border rounded-md px-6 py-2 text-red-500 font-semibold drop-shadow-sm shadow-sm bg-white'>Secret</div>
                </div>
            </div>
            <div className='rounded-md border p-4 shadow-sm'>
                <p>ข้อมูลผลผลิต</p>
                <Divider className='mt-2 mb-3' />
                <div className='mb-3 flex justify-end w-full '>
                    <input type="text" className='border rounded-md px-3 py-1 bg-[#f9fafb] ' placeholder='ค้นหาเพิ่มเติม' onChange={(e) => setSearch(e.target.value)} value={param.search} />
                </div>
                <div className='h-[500px] overflow-auto'>
                    <table className='w-full text-sm max-h-[500px]'>
                        <thead>
                            <tr>
                                <td className='border font-semibold pl-3 py-1'>Model Code</td>
                                <td className='border font-semibold pl-3'>Model Name</td>
                                <td className='border font-semibold text-end pr-3'>Qty</td>
                                <td className='border font-semibold text-center'>Line</td>
                                <td className='border font-semibold pl-3'>Insert Date</td>
                            </tr>
                        </thead>
                        <tbody className='bg-[#f9fafb]'>
                            {
                                load == true ? <tr><td colSpan={5} className='text-center border'><div className='p-2 flex flex-col items-center justify-center gap-2'>
                                    <CircularProgress />
                                    <span>กําลังโหลด...</span>
                                </div></td></tr> :
                                    data.length == 0 ? <tr><td colSpan={5} className='text-center border'><div className='p-2'>ไม่พบข้อมูล</div></td></tr> :
                                        data.map((oData: PropsIotResult, iData: number) => <tr key={iData}>
                                            <td className='border pl-3 py-1'>{oData.model_No != null ? oData.model_No.toString().padStart(4, '0') : '-'}</td>
                                            <td className='border pl-3'>{oData.modelName}</td>
                                            <td className='border font-semibold text-end pr-3'>{oData.cnt.toLocaleString('en')}</td>
                                            <td className='border text-center'>{oData.lineName}</td>
                                            <td className='border pl-3'>{oData.shiftDate}</td>
                                        </tr>)
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ResultPage