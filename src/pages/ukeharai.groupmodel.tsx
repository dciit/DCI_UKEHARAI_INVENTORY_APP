import { Typography, Stack, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react'

function UkeharaiGroupModel() {
    // const { data } = props;
    // const [_years, setYears] = useState<string[]>([]);
    // const [_year, setYear] = useState<string>('');
    // const [_months, setMonths] = useState<string[]>([]);
    // const [_month, setMonth] = useState<string>('');
    const [loading] = useState<boolean>(true);
    useEffect(() => {
        
    }, []);
    return (
        <div>

            {
                loading ? <Stack className='w-full' alignItems={'center'}>
                    <CircularProgress />
                    <Typography>กำลังโหลดข้อมูล</Typography>
                </Stack> :
                    <table>
                        <tbody>

                        </tbody>
                    </table>
            }
        </div>
    )
}

export default UkeharaiGroupModel