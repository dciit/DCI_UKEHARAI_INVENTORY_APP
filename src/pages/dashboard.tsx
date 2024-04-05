// @ts-nocheck
import { Button, CircularProgress, Grid, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { API_CHART_DATA } from "../Service";
import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title } from "chart.js";
import SearchIcon from '@mui/icons-material/Search';
import { Bar } from "react-chartjs-2";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { MChart, MContext } from "../interface";
import moment from "moment";
import { ThemeContext } from "../router/Routers";
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
// Chart.register(ChartDataLabels);
function Dashboard() {
    let delayed = false;
    const context: MContext = useContext(ThemeContext);
    const _months = context.months;
    const [load, setLoad] = useState<boolean>(true);
    const [_year, setYear] = useState<string>(moment().format('YYYY'));
    const [_month, setMonth] = useState<number>(parseInt(moment().format('MM')));
    const [rYear] = useState<string[]>([moment().add(-1, 'year').year().toString(), moment().year().toString()]);
    const [ym, setYm] = useState<string>(moment().format('YYYYMM'));
    const [chart, setChart] = useState<MChart[]>([]);
    useEffect(() => {
        init();
    }, []);

    useEffect(() => {
        setYm(`${_year}${_month.toLocaleString('en', { minimumIntegerDigits: 2 })}`);
    }, [_year, _month]);
    async function init() {
        let res: MChart[] = await API_CHART_DATA({ ym: ym });
        setChart(res);
    }
    useEffect(() => {
        if (chart.length > 0) {
            setLoad(false);
        }
    }, [chart])
    // useEffect(() => {
    //     if (typeof chartSale == 'object' && Object.keys(chartSale).length) {
    //         console.log(chartSale)
    //         setLoading(false);
    //     }
    // }, [chartSale]);
    return (
        // <iframe src="http://192.168.226.38:3000/dashboard/snapshot/tD1jLyxkuVgfojUC5KcU3t6f3GBv6fSi?orgId=1" className='w-[100%] h-[100%]'></iframe>
        <Grid container className="sticky top-0">
            <Grid item xs={12} px={3} pt={3} className="sticky top-0">
                <div className='group-search flex gap-2 px-4 py-4 bg-white rounded-lg mb-3 ' style={{ border: '1px solid #ddd' }} >
                    <div>
                        <Typography>Year</Typography>
                        <Select value={_year} size='small' onChange={(e) => setYear(e.target.value)} >
                            {
                                rYear.map((oYear: string, iYear: number) => {
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
                                    return <MenuItem value={(iMonth + 1)} key={(iMonth + 1)}>{oMonth}</MenuItem>
                                })
                            }
                        </Select>
                    </div>
                    <Stack gap={1} direction={'row'} alignItems={'flex-end'}>
                        <Typography>&nbsp;</Typography>
                        <Button startIcon={<SearchIcon />} variant='contained' onClick={() => init()}>ค้นหา</Button>
                        {/* {
                            Object.keys(data).length > 0 ? <ExportToExcel data={data} ym={`${_year}${(_month + 1).toLocaleString('en', { minimumIntegerDigits: 2 })}`} /> : <Button variant='contained' disabled>Export to excel</Button>
                        } */}
                    </Stack>
                </div>
            </Grid>
            {
                load ? <Grid item xs={12}>
                    <Stack direction={'column'} gap={1} justifyContent={'center'} alignItems={'center'}>
                        <Typography>กำลังโหลดข้อมูล ...</Typography>
                        <CircularProgress />
                    </Stack>
                </Grid> :
                    <Grid item xs={12}>
                        <Grid container height={'100%'}>
                            {
                                chart.map((oChart: MChart, iChart: number) => {
                                    return <Grid key={iChart} item xs={12} sm={12} md={12} lg={6} p={3}>
                                        <Stack direction={'column'}>
                                            <span className="font-semibold mb-3"> {oChart.name}</span>
                                            <div className="h-[350px]">
                                                <Bar
                                                    data={{
                                                        labels: oChart.chart.label,
                                                        datasets: oChart.chart.dataset
                                                    }}
                                                    options={{
                                                        animation: {
                                                            onComplete: () => {
                                                                delayed = true;
                                                            },
                                                            delay: (context) => {
                                                                let delay = 0;
                                                                if (context.type === 'data' && context.mode === 'default' && !delayed) {
                                                                    delay = context.dataIndex * 300 + context.datasetIndex * 100;
                                                                }
                                                                return delay;
                                                            },
                                                        },
                                                        scales: {
                                                            x: {
                                                                stacked: true,
                                                            },
                                                            y: {
                                                                stacked: true
                                                            }
                                                        },
                                                        indexAxis: 'y' as const,
                                                        responsive: true,
                                                        maintainAspectRatio: false,
                                                        plugins: {
                                                            datalabels: {
                                                                color: 'black',
                                                                font: {
                                                                    weight: 'bold',
                                                                    size: 10
                                                                },
                                                                display: function (context) {
                                                                    return context.dataset.data[context.dataIndex] !== 0; // or >= 1 or ...
                                                                }
                                                            },
                                                            legend: {
                                                                position: 'right' as const,
                                                            },
                                                            title: {
                                                                display: false,
                                                                text: 'SALE OF SKU',
                                                            },
                                                        },
                                                    }}
                                                />
                                            </div>
                                        </Stack>
                                    </Grid>
                                })
                            }
                        </Grid>
                    </Grid>
            }
        </Grid>
    )
}

export default Dashboard