//@ts-nocheck
import React, { useEffect, useMemo, useState } from 'react'
import { Column, Row, Id, MenuOption, CellChange, ReactGrid } from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { MModels, UkeCurPln } from '../interface';
import { API_DISTRIBUTION, API_GET_CURPLNS, API_GET_MODELS } from '../Service';
import { Badge, Box, Button, Card, CardContent, CircularProgress, Divider, Grid, IconButton, MenuItem, Select, Stack, Typography } from '@mui/material';
import { SearchOutlined } from '@mui/icons-material';
import { MRT_ColumnDef, MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import CircleIcon from '@mui/icons-material/Circle';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import moment from 'moment';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import DialogEditPlan from '../components/dialog.edit.plan';
const getPlan = (): UkeCurPln[] => [];
let cols: any = [
    { columnId: "MODEL", width: 150 },
    { columnId: "LINE", width: 150 }
];
let cellsHeader: any = [
    { type: "header", text: "MODEL" },
    { type: "header", text: "LINE" }
];
const _months = [
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
    "ธันวาคม"]
// [...Array(31)].map((o: any, i: number) => {
//     let day = (i + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
//     cols.push({ columnId: `d${day}`.toUpperCase(), width: 75 });
//     cellsHeader.push({ type: "header", text: `d${day}`.toUpperCase() });
// })
const getColumns = (): Column[] => cols;
const headerRow: Row = {
    rowId: "header",
    cells: cellsHeader
};

const getRows = (people: UkeCurPln[]): Row[] => [
    headerRow,
    ...people.map<Row>((plan, idx) => ({
        rowId: idx,
        cells: [
            { type: "text", text: plan.model },
            { type: "text", text: plan.line },
            // { type: "text", text: plan.d01.toString() },
            // { type: "text", text: plan.d02.toString() },
            // { type: "text", text: plan.d03.toString() },
            // { type: "text", text: plan.d04.toString() },
            // { type: "text", text: plan.d05.toString() },
            // { type: "text", text: plan.d06.toString() },
            // { type: "text", text: plan.d07.toString() },
            // { type: "text", text: plan.d08.toString() },
            // { type: "text", text: plan.d09.toString() },
            // { type: "text", text: plan.d10.toString() },
            // { type: "text", text: plan.d11.toString() },
            // { type: "text", text: plan.d12.toString() },
            // { type: "text", text: plan.d13.toString() },
            // { type: "text", text: plan.d14.toString() },
            // { type: "text", text: plan.d15.toString() },
            // { type: "text", text: plan.d16.toString() },
            // { type: "text", text: plan.d17.toString() },
            // { type: "text", text: plan.d18.toString() },
            // { type: "text", text: plan.d19.toString() },
            // { type: "text", text: plan.d20.toString() },
            // { type: "text", text: plan.d21.toString() },
            // { type: "text", text: plan.d22.toString() },
            // { type: "text", text: plan.d23.toString() },
            // { type: "text", text: plan.d24.toString() },
            // { type: "text", text: plan.d25.toString() },
            // { type: "text", text: plan.d26.toString() },
            // { type: "text", text: plan.d27.toString() },
            // { type: "text", text: plan.d28.toString() },
            // { type: "text", text: plan.d29.toString() },
            // { type: "text", text: plan.d30.toString() },
            // { type: "text", text: plan.d31.toString() },
        ]
    }))
];

const applyChangesToPlan = (
    changes: CellChange[],
    prevPeople: UkeCurPln[]
): UkeCurPln[] => {
    changes.forEach((change) => {
        if (change.newCell.type === 'text') {
            const personIndex = change.rowId;
            const fieldName = change.columnId;
            prevPeople[personIndex][fieldName] = change.newCell.text;
        }
    });
    return [...prevPeople];
};


const PageAdjustPlan = (props: any) => {
    // const { data } = props;
    const year: string = moment().format('YYYY');
    // const [ym, setYm] = useState<string>(`${year}${month}`);
    const [people, setPeople] = React.useState<UkeCurPln[]>(getPlan());
    const rows = getRows(people);
    // const columns = getColumns();
    const [models, setModels] = useState<MModels[]>([]);
    const [once, setOnce] = useState<boolean>(true);
    const modelgroups: string[] = ['1YC', '2YC', 'SCR', 'ODM'];
    const [modelgroup, setModelGroup] = useState<string>(modelgroups[0]);
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<Person[]>([]);
    const [openDialogEditPlan, setOpenDialogEditPlan] = useState<boolean>(false);
    const [modelSelected, setModelSelected] = useState<MModels>();
    const [monthSelected, setMonthSelected] = useState<string>('');
    const [curplns, setCurplns] = useState<UkeCurPln[]>([]);
    const [ymSelected, setYmSelected] = useState<string>('');
    useEffect(() => {
        if (once)
            initModel();
    }, [once]);
    useEffect(() => {
        if (models.length) {
            setLoading(false);
            initRow();
        }
    }, [models]);
    useEffect(() => {
        if (data.length) {
            console.log('eff data')
        }
    }, [data])
    async function initModel() {
        // let fetch_current_plan = await API_GET_CURPLNS(year);
        // setCurplns(fetch_current_plan);
        // let fetch_models = await API_GET_MODELS();
        // let init_models: MModels[] = [];
        // fetch_models.map((oModel: MModels) => {
        //     let item_models: MModels = {
        //         modelCode: oModel.modelCode,
        //         model: oModel.model,
        //         open: false,
        //         modelType: oModel.modelType
        //     }
        //     init_models.push(item_models);
        // });
        // setModels([...init_models]);
        // setData([...data, ...init_models]);
    }

    async function initRow() {
        let rRow: UkeCurPln[] = [];
        // [...Array(100)].map((o: any, i: number) => {
        //     let iRow: UkeCurPln = {

        //     };
        //     rRow.push(iRow);
        // });
        // console.log(rRow)
    }
    const handleChanges = (changes: CellChange[]) => {
        changes.map((o, i) => {
            let newText = o.newCell.text;
            let oldText = o.previousCell.text;
            if ((Number.isNaN(newText)) || newText == '') {
                changes = changes.filter(function (oo, ii) {
                    return ii !== i
                });
            }
        });
        setPeople((prevPeople) => applyChangesToPlan(changes, prevPeople));
    };

    const simpleHandleContextMenu = (
        selectedRowIds: Id[],
        selectedColIds: Id[],
        selectionMode: SelectionMode,
        menuOptions: MenuOption[]
    ): MenuOption[] => {
        return menuOptions;
    }


    //nested data is ok, see accessorKeys in ColumnDef below
    type Person = {
        model: string;
        modelCode: string;
    };
    let cols: any[] = [
        {
            accessorKey: 'modelCode', //access nested data with dot notation
            header: 'MODEL CODE',
            size: 150,
        },
        {
            accessorKey: 'model',
            header: 'MODEL',
            size: 150,
        },
    ];
    // [...Array(12)].map((o: any, iMonth: number) => {
    //     let txtMonth: string = (iMonth + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
    //     cols.push({
    //         accessorKey: `M${txtMonth}`, //access nested data with dot notation
    //         header: `M${txtMonth}`,
    //         size: 50,
    //         Cell: ({ cell }) => {
    //             return <div><IconButton color='erro'><SearchIcon /></IconButton></div>
    //         }
    //     })
    // })
    const columns = useMemo<MRT_ColumnDef<Person>[]>(
        () => cols,
        [],
    );
    const table = useMaterialReactTable({
        columns,
        data,
    });

    // async function handleOpenModel(oModel: MModels, open: boolean) {
    //     oModel.open = open;
    //     let index: number = models.findIndex(o => o.modelCode == oModel.modelCode && o.model == oModel.model && o.modelType == oModel.modelType);
    //     if (index != -1) {
    //         models[index] = oModel;
    //         models.map((o, i: number) => {
    //             if (i != index) {
    //                 models[i].open = false;
    //             }
    //         })
    //     }
    //     setModels([...models])
    // }

    // async function handleEditPlan(oModel: MModels, nMonth: string) {
    //     setMonthSelected(nMonth)
    //     setModelSelected(oModel);
    // }


    // async function handleDistribution(oModel: MModels, nMonth: string) {
    //     if (confirm(`คุณต้องการ Distribution Current Plan ประจำเดือน : ${moment().month(parseInt(nMonth)).format('MMMM').toUpperCase()}`)) {
    //         let distribution = await API_DISTRIBUTION({
    //             ym: `${year}${nMonth}`,
    //             model: oModel.model
    //         });
    //         console.log(distribution)
    //     }
    // }
    async function handleCloseDialogEditPlan() {
        setYmSelected('');
    }
    useEffect(() => {
        if (modelSelected != null && Object.keys(modelSelected).length) {
            setOpenDialogEditPlan(true);
        } else {
            setMonthSelected('');
            setOpenDialogEditPlan(false);
        }
    }, [modelSelected]);

    async function handleOpenEditPlan(ym: string) {
        setYmSelected(ym);
    }
    useEffect(() => {
        if (ymSelected != '') {
            setOpenDialogEditPlan(true);
        } else {
            setOpenDialogEditPlan(false);
        }
    }, [ymSelected])
    return (
        <div>
            <Grid container>
                <Grid item xs={12}>
                    <Box sx={{
                        border: '1px solid #ddd',
                        borderRadius: '8px',
                        padding: '16px',
                        background: 'white'
                    }}>
                        <Stack>
                            <Stack direction={'row'} alignItems={'start'} gap={2}>
                                <Stack direction={'row'} alignItems={'center'} >
                                    <Typography>Model Group</Typography>
                                    <Box sx={{
                                        paddingLeft: '16px'
                                    }}>
                                        <Select size='small' value={modelgroup} onChange={(e) => setModelGroup(e.target.value)}>
                                            {
                                                modelgroups.map((oModelGroup: string, iModelGroup: number) => {
                                                    return <MenuItem key={iModelGroup} value={oModelGroup}> {oModelGroup}</MenuItem>
                                                })
                                            }
                                        </Select>
                                    </Box>
                                </Stack>
                                <Button variant='contained' startIcon={<SearchOutlined />}>Search</Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Grid>
                <Grid container item xs={12} spacing={1} pt={2}>
                    {
                        [...Array(12)].map((oMonth, iMonth: number) => {
                            let txtMonth = (iMonth + 1).toLocaleString('en', { minimumIntegerDigits: 2 })
                            return <Grid item xs={4} onClick={() => handleOpenEditPlan(`${year}${txtMonth}`)}>
                                <Card>
                                    <CardContent>
                                        <Stack gap={2}>
                                            <Stack direction={'row'} justifyContent={'space-between'}>
                                                <Stack direction={'column'}>
                                                    <Typography className='font-bold'>{moment().month(txtMonth).format('MMMM').toUpperCase()}</Typography>
                                                    <Typography variant='caption'>{
                                                        _months[iMonth]
                                                    }</Typography>
                                                </Stack>
                                                <Stack>
                                                    <div className='bg-blue-500 text-white px-2 rounded-lg pt-1 pb-2'>
                                                        แจกจ่าย
                                                    </div>
                                                </Stack>
                                            </Stack>
                                            <Stack direction={'row'} justifyContent={'space-between'}>
                                                <Stack direction={'row'} gap={2}>
                                                    <CircleIcon className='text-green-500' />
                                                    <Typography>REV : XX</Typography>
                                                </Stack>
                                                <Typography>{moment().format('DD/MM/YYYY')}</Typography>
                                            </Stack>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Grid>
                        })
                    }
                </Grid>
            </Grid>
            <DialogEditPlan open={openDialogEditPlan} close={handleCloseDialogEditPlan} ym={ymSelected} />
        </div>
    );
}

export default PageAdjustPlan
