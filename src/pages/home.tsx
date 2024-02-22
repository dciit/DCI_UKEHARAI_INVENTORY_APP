import { Box, Button , Grid, MenuItem, Select, Stack, Typography } from '@mui/material'
import moment from 'moment';
import  { useState } from 'react'
import { useNavigate } from 'react-router-dom';
interface MMonth {
    name: string;
    img: string;
}
function Home() {
    const base = import.meta.env.VITE_PATH;
    const navigate = useNavigate();
    const [year, setYear] = useState<string>(moment().format('YYYY'));
    const [monthTh] = useState<MMonth[]>([
        { name: "มกราคม", img: `src/assets/month-2.webp` },
        { name: "กุมภาพันธ์", img: `src/assets/month-2.webp` },
        { name: "มีนาคม", img: `src/assets/month-2.webp` },
        { name: "เมษายน", img: `src/assets/month-2.webp` },
        { name: "พฤษภาคม", img: `src/assets/month-2.webp` },
        { name: "มิถุนายน", img: `src/assets/month-2.webp` },
        { name: "กรกฎาคม", img: `src/assets/month-2.webp` },
        { name: "สิงหาคม", img: `src/assets/month-2.webp` },
        { name: "กันยายน", img: `src/assets/month-2.webp` },
        { name: "ตุลาคม", img: `src/assets/month-2.webp` },
        { name: "พฤศจิกายน", img: `src/assets/month-2.webp` },
        { name: "ธันวาคม", img: `src/assets/month-2.webp` }
    ]);
    async function handleEdit(m: number) {
        navigate(`../../${base}/edit/${m}`)
    }
    return (
        <Stack p={6} spacing={3}>
            <Stack>
                <Typography>ค้นหา</Typography>
                <Select size='small' value={year} onChange={(e) => {
                    setYear(e.target.value)
                }}>
                    {
                        [...Array(3)].map((o: string, i: number) => {
                            let itemYear = parseInt(moment().format('YYYY')) + (i);
                            return <MenuItem key={o} value={itemYear}>{
                                itemYear
                            }</MenuItem>
                        })
                    }
                </Select>
            </Stack>
            <Box sx={{ flexGrow: 1 }} p={3} style={{border:'1px solid #ddd'}} className = 'rounded-lg bg-[#f6f8fa]'>
                <Grid container spacing={4}>
                    {
                        monthTh.map((month: MMonth, i: number) => {
                            return <Grid item xs={6} sm={6} md={3} lg={2}>
                                {/* <Card sx={{ maxWidth: 345 }} className='bg-[#f6f8fa] cursor-pointer select-none'>
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {month.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" className='font-bold text-[1em]'>
                                            {
                                                moment((i + 1), 'M').format('MMMM')
                                            }
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button className='bg-white' size="small" onClick={() => handleEdit(i + 1)}>แก้ไข</Button>
                                        <Button className='bg-white' size="small">ดูข้อมูล</Button>
                                    </CardActions>
                                </Card> */}
                                <Box className = 'bg-white rounded-lg select-none cursor-pointer hover:scale-105 duration-300 transition-all' style={{ border: '1px solid #ddd' }} px={2} pt={2} pb={1}>
                                    <Stack>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {month.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary" className='font-bold text-[1em]'>
                                            {
                                                moment((i + 1), 'M').format('MMMM')
                                            }
                                        </Typography>
                                    </Stack>
                                    <Stack direction={'row'} pt={3} pb={1} gap={1}>
                                        <Button  size="small"  variant='contained' onClick={() => handleEdit(i + 1)}>แก้ไข</Button>
                                        <Button  size="small" variant='outlined'>ดูข้อมูล</Button>
                                    </Stack>
                                </Box>
                            </Grid>
                        })
                    }
                </Grid>
            </Box>

        </Stack>
    )
}

export default Home