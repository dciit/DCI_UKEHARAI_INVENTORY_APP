import { Typography, Stack, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react'
import { API_INIT_ACT_PLAN } from '../Service';
import { ListCurpln, MActPlans } from '../interface';

function UkeharaiGroupModel() {
    const [loading] = useState<boolean>(false);
    const [data, setData] = useState<MActPlans[]>([]);
    let once = true;
    useEffect(() => {
        if (once) {
            init();
        }
    }, [once]);
    async function init() {
        let res = await API_INIT_ACT_PLAN('202403');
        setData(res.content);
    }
    return (
        <div>

            {
                loading ? <Stack className='w-full' alignItems={'center'}>
                    <CircularProgress />
                    <Typography>กำลังโหลดข้อมูล</Typography>
                </Stack> :
                    <table id='tbGroupModel' className='w-full'>
                        <thead>
                            <tr>
                                <th>Model Group</th>
                                <th>Line</th>
                                {
                                    [...Array(31)].map((o: any, i: number) => {
                                        return <th key={o}>{`D${(i + 1).toLocaleString('en', { minimumIntegerDigits: 2 })}`}</th>
                                    })
                                }
                            </tr>
                        </thead>
                        <tbody>
                            {
                                ['1YC', '2YC', 'SCR', 'ODM'].map((oModelGroup: string) => {
                                    let groupLine: MActPlans[] = data.filter((oData: MActPlans) => oData.modelGroup == oModelGroup);
                                    let rLine: number[] = [];
                                    if (groupLine.length) {
                                        let rGroup: any[] = groupLine.map((oData: MActPlans) => oData.listCurpln.map((oCurPln: ListCurpln) => oCurPln.wcno));
                                        rGroup.map((oGroup: any) => {
                                            rLine = [...rLine, ...oGroup];
                                        });
                                        rLine = Array.from(new Set(rLine.map((item: any) => item)));
                                    }
                                    // rLine.forEach(element => {
                                        
                                    // });
                                    return <>
                                        <tr>
                                            <td rowSpan={rLine.length+1}>{oModelGroup}</td>
                                        </tr>
                                        {
                                            rLine.sort().map((oLine: number) => {
                                                return <tr>
                                                    <td>{oLine}</td>
                                                </tr>
                                            })
                                        }
                                    </>
                                })
                            }
                        </tbody>
                    </table>
            }
        </div>
    )
}

export default UkeharaiGroupModel