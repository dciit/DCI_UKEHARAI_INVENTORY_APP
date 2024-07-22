// @ts-nocheck
import { Button, CircularProgress, Grid, MenuItem, Select, Stack, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { API_CHART_DATA } from "../Service";
import { Chart as ChartJS, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Title } from "chart.js";
import { Bar } from "react-chartjs-2";
import { MChart, MContext } from "../interface";
import moment from "moment";
import { ThemeContext } from "../router/Routers";
import { Chart } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import FilterListIcon from '@mui/icons-material/FilterList';
import DialogFilterDashboard from "../components/dialog.filter.dashboard";
import { contact } from "../constant";
Chart.register(ChartDataLabels);
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
    const [openDialogFilter, setOpenDialogFilter] = useState<boolean>(false);
    const [AxisMax, setAxisMax] = useState<number>(0)
    const AxisStep: number = 25000;
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
            let xAxisData = [];
            try {
                chart.map((o: MChart) => {
                    if (o.name.toUpperCase().includes('SALE')) {
                        let length: number = o.chart.dataset.length ? o.chart.dataset[0].data.length : 0;
                        [...Array(length)].map((_, iLength) => {
                            let xAxisFixIndex = [];
                            o.chart.dataset.map((oData: any) => {
                                xAxisFixIndex.push(oData.data[iLength])
                            })
                            xAxisData = [...xAxisData, ...[xAxisFixIndex.reduce((a, b) => a + b, 0)]]
                        })
                        o.chart.dataset.map((oData: any) => {
                            // console.log(oData.data);
                            xAxisData = [...xAxisData, ...oData.data]
                        })
                    } else {
                        o.chart.dataset.map((oData: any) => {
                            xAxisData = [...xAxisData, ...oData.data]
                        })
                    }

                })
                setAxisMax(Math.ceil((Math.max(...xAxisData) / AxisStep)) * AxisStep);
            } catch {
                alert(`ไม่สามารถคำนวนค่ามากสุดของแกน X ได้ ${contact}`)
            }
            setLoad(false);
        }
    }, [chart])
    return (
        <Grid container className=" top-0 h-[100%] ">
            {
                load ? <div className="flex flex-col items-center w-[100%] h-[100%] justify-center">
                    <span>กำลังโหลดข้อมูล</span>
                    <CircularProgress />
                </div> :
                    <Grid item xs={12} className="relative">
                        <div className="absolute top-5 right-5  bg-[#5c5fc8] cursor-pointer select-none hover:scale-105 duration-300 transition-all shadow-md text-white px-3 py-1 rounded-md" onClick={() => setOpenDialogFilter(true)}>
                            <FilterListIcon />
                            <span className="ml-2">Filter</span>
                        </div>
                        <Grid container height={'100%'}>
                            {
                                chart.map((oChart: MChart, iChart: number) => {
                                    let ttl: number = 0;
                                    let bgTTL: string = oChart.name.includes('SALE') == true ? 'bg-[#5c5fc8]' : (oChart.name.includes('STOCK') == true ? 'bg-[#459d95]' : 'bg-[#3b82f6]');
                                    try {
                                        ttl = oChart.chart.dataset.reduce((s, c) => s + c.data.reduce((sum, cv) => sum + (cv || 0)), 0)
                                    } catch (error) {
                                        ttl = 0
                                    }
                                    return <Grid key={iChart} item xs={12} sm={12} md={6} lg={4} p={3}>
                                        <Stack direction={'column'} >
                                            <div className="flex items-center gap-3">
                                                <div className="font-semibold"> {oChart.name}</div>
                                                <div className={`flex flex-row ${bgTTL} px-3 pt-[4px] pb-[6px] rounded-md text-white gap-1 drop-shadow-md font-['Roboto']`}>
                                                    <span className="text-[#eeeded]">TTL :</span>
                                                    <span>{ttl.toLocaleString('en')}</span>
                                                </div>
                                            </div>
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
                                                                    delay = context.dataIndex * 200 + context.datasetIndex * 100;
                                                                }
                                                                return delay;
                                                            },
                                                        },
                                                        scales: {
                                                            x: {
                                                                stacked: true,
                                                                max: AxisMax == 0 ? 250000 : AxisMax,
                                                                ticks: {
                                                                    stepSize: AxisStep,
                                                                }
                                                            },
                                                            y: {
                                                                stacked: true,
                                                                min: 0, // Set your minimum value
                                                                max: 100 // Set your maximum value                                                           
                                                            }
                                                        },
                                                        indexAxis: 'y' as const,
                                                        responsive: true,
                                                        maintainAspectRatio: false,
                                                        plugins: {
                                                            datalabels: {
                                                                anchor: 'end',
                                                                align: 'end',
                                                                color: 'black',
                                                                formatter: function (value, context) {
                                                                    const datasetIndex = context.datasetIndex;
                                                                    const dataIndex = context.dataIndex;
                                                                    if (datasetIndex === context.chart.data.datasets.length - 1) {
                                                                        const total = context.chart.data.datasets.reduce((sum, dataset) => sum + dataset.data[dataIndex], 0);
                                                                        return total > 0 ? total.toLocaleString('en') : '';
                                                                    } else {
                                                                        return oChart.name.includes('SALE') == true ? '' : Number(value).toLocaleString('en');
                                                                    }

                                                                },
                                                                font: {
                                                                    weight: 'bold',
                                                                    size: 10
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
            <DialogFilterDashboard open={openDialogFilter} setOpen={setOpenDialogFilter} init={init} year={_year} month={_month} setYear={setYear} setMonth={setMonth} />





        </Grid>
    )
}

export default Dashboard