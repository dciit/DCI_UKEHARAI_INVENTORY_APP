import { useEffect } from "react"

function FormWarningPDF() {
    useEffect(() => {
    }, []);
    return (
        <div className='flex items-center justify-center bg-gray-300'>
            <div className='page-a3 bg-white' >
                <div className='p-6 flex justify-between flex-col h-full'>
                    <table className='w-full'>
                        <tr>
                            <td>
                                <span>DCI</span>
                            </td>
                            <td colSpan={35} className='text-right'>Secret</td>
                        </tr>
                        <tr>
                            <td colSpan={24}>&nbsp;</td>
                            <td colSpan={4}>APPROVED BY</td>
                            <td colSpan={4}>CHECKED BY</td>
                            <td colSpan={4}>ISSUED BY</td>
                        </tr>
                        <tr>
                            <td colSpan={5}>
                                Delivery Control Sheet
                            </td>
                        </tr>
                        <tr>
                            <td>-</td>
                        </tr>
                        <tr>
                            <td>-</td>
                        </tr>
                        <tr>

                            <td>CUSTOMER</td>
                            <td className='bg-yellow-300'>Group Model</td>
                            <td>MODELNAME</td>
                            <td>SEBANGO</td>
                            <td>PLTYPE</td>
                            {
                                [...Array(31)].map((o: any, i: number) => {
                                    return <td key={o}>{`D${(i + 1).toLocaleString('en', { minimumIntegerDigits: 2 })}`}</td>
                                })
                            }
                            <td>SUM</td>
                        </tr>
                        <tr>
                            Summary
                        </tr>
                    </table>
                    <span>aทดสอบ</span>
                </div>
            </div>
        </div>
    )
}

export default FormWarningPDF