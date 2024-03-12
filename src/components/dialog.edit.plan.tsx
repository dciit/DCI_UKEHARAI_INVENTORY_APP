//@ts-nocheck
import React, { useEffect, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import moment from 'moment'
import { CircularProgress, Grid, MenuItem, Select, Stack, TextField, Typography } from '@mui/material'
import { Column, Row, Id, MenuOption, CellChange, ReactGrid } from "@silevis/reactgrid";
import { UkeCurPln } from '../interface'
import { API_CHANGE_CURPLN, API_CHANGE_UKE_CURPLN, API_GET_CURPLN_BY_YM, API_GET_UKE_CUR_PLN } from '../Service'
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
function DialogEditPlan(props: any) {
    const { model, open, close, month, ym } = props;
    const [data, setData] = useState<any[]>([])
    const year = moment().format('YYYY')
    const [loading, setLoading] = useState<boolean>(true);
    const [wcno, setWcno] = useState<number[]>([]);
    const getPlan = (): UkeCurPln[] => [];
    const [rowIdChange, setRowIdChange] = useState<number>(99999);
    let once: boolean = true;
    let cols: any = [
        { columnId: "model", width: 200 },
        { columnId: "wcno", width: 150 },
    ];
    let cellsHeader: any = [
        { type: "header", text: "model" },
        { type: "header", text: "wcno" }
    ];

    [...Array(31)].map((o: any, i: number) => {
        let day = (i + 1).toLocaleString('en', { minimumIntegerDigits: 2 });
        cols.push({ columnId: `day${day}`.toUpperCase(), width: 65 });
        cellsHeader.push({ type: "header", text: `d${day}`.toUpperCase() });
    })
    const [curpln, setCurPln] = React.useState<UkeCurPln[]>(getPlan());
    useEffect(() => {
        if (open) {
            initData();
        }
    }, [open]);
    const applyChangesToPlan = (
        changes: CellChange[],
        prevPeople: UkeCurPln[]
    ): UkeCurPln[] => {
        changes.forEach((change) => {
            if (change.newCell.type === 'text') {
                const personIndex = change.rowId;
                const fieldName = change.columnId.toString().toLowerCase();
                prevPeople[personIndex][fieldName] = parseInt(change.newCell.text);
            }
        });
        return [...prevPeople];
    };

    const handleChanges = (changes: CellChange[]) => {
        let rowId: number = changes[0].rowId;
        setRowIdChange(rowId);
        changes.map((o, i) => {
            let newText = o.newCell.text;
            let oldText = o.previousCell.text;
            if ((Number.isNaN(newText)) || newText == '') {
                changes = changes.filter(function (oo, ii) {
                    return ii !== i
                });
            }
        });
        setCurPln((prevPeople) => applyChangesToPlan(changes, prevPeople));
    };

    const simpleHandleContextMenu = (
        selectedRowIds: Id[],
        selectedColIds: Id[],
        selectionMode: SelectionMode,
        menuOptions: MenuOption[]
    ): MenuOption[] => {
        return menuOptions;
    }
    const headerRow: Row = {
        rowId: "header",
        cells: cellsHeader
    };
    const checkEmpty = (oCurPln: any) => {
        return (oCurPln != null ? oCurPln : 0).toString();
    }
    const getRows = (curpln: UkeCurPln[]): Row[] => [
        headerRow,
        ...curpln.map<Row>((iPlan, idx) => ({
            rowId: idx,
            cells: [
                { type: "text", text: iPlan.model.toString() },
                { type: "text", text: iPlan.wcno.toString() },
                { type: "text", text: checkEmpty(iPlan.day01) },
                { type: "text", text: checkEmpty(iPlan.day02) },
                { type: "text", text: checkEmpty(iPlan.day03) },
                { type: "text", text: checkEmpty(iPlan.day04) },
                { type: "text", text: checkEmpty(iPlan.day05) },
                { type: "text", text: checkEmpty(iPlan.day06) },
                { type: "text", text: checkEmpty(iPlan.day07) },
                { type: "text", text: checkEmpty(iPlan.day08) },
                { type: "text", text: checkEmpty(iPlan.day09) },
                { type: "text", text: checkEmpty(iPlan.day10) },
                { type: "text", text: checkEmpty(iPlan.day11) },
                { type: "text", text: checkEmpty(iPlan.day12) },
                { type: "text", text: checkEmpty(iPlan.day13) },
                { type: "text", text: checkEmpty(iPlan.day14) },
                { type: "text", text: checkEmpty(iPlan.day15) },
                { type: "text", text: checkEmpty(iPlan.day16) },
                { type: "text", text: checkEmpty(iPlan.day17) },
                { type: "text", text: checkEmpty(iPlan.day18) },
                { type: "text", text: checkEmpty(iPlan.day19) },
                { type: "text", text: checkEmpty(iPlan.day20) },
                { type: "text", text: checkEmpty(iPlan.day21) },
                { type: "text", text: checkEmpty(iPlan.day22) },
                { type: "text", text: checkEmpty(iPlan.day23) },
                { type: "text", text: checkEmpty(iPlan.day24) },
                { type: "text", text: checkEmpty(iPlan.day25) },
                { type: "text", text: checkEmpty(iPlan.day26) },
                { type: "text", text: checkEmpty(iPlan.day27) },
                { type: "text", text: checkEmpty(iPlan.day28) },
                { type: "text", text: checkEmpty(iPlan.day29) },
                { type: "text", text: checkEmpty(iPlan.day30) },
                { type: "text", text: checkEmpty(iPlan.day31) },
            ]
        }))
    ];
    const getColumns = (): Column[] => cols;
    let rows = getRows(curpln);
    const columns = getColumns();

    async function initData() {
        if (ym != '') {
            let res = await API_GET_CURPLN_BY_YM(ym);
            if (Object.keys(res).length) {
                setCurPln(res);
            } else {
                alert('ไม่พบข้อมูลแผนการผลิต หรือ เกิดข้อผิดพลาดบางประการ');
                close(false)
            }
            // let content: UkeCurPln[] = [];
            // res.wcno.map((wcno: string) => {
            //     content.push({
            //         prdym: `${year}${month}`,
            //         model: model.model,
            //         line: wcno.toString(),
            //         wcno: wcno,
            //         day01: 0,
            //         day02: 0,
            //         day03: 0,
            //         day04: 0,
            //         day05: 0,
            //         day06: 0,
            //         day07: 0,
            //         day08: 0,
            //         day09: 0,
            //         day10: 0,
            //         day11: 0,
            //         day12: 0,
            //         day13: 0,
            //         day14: 0,
            //         day15: 0,
            //         day16: 0,
            //         day17: 0,
            //         day18: 0,
            //         day19: 0,
            //         day20: 0,
            //         day21: 0,
            //         day22: 0,
            //         day23: 0,
            //         day24: 0,
            //         day25: 0,
            //         day26: 0,
            //         day27: 0,
            //         day28: 0,
            //         day29: 0,
            //         day30: 0,
            //         day31: 0,
            //     });
            // })
            // setCurPln(content)
            // setWcno(res.wcno);
            // setData(res.data);
        } else {
            alert('ไม่พบข้อมูล YM ');
        }
    }

    useEffect(() => {
        if (curpln.length > 0) {
            setLoading(false);
        }
    }, [curpln]);
    async function handleRowChange() {
        let res = await API_CHANGE_UKE_CURPLN(curpln[rowIdChange]);
    }
    async function handleSavePlan() {
        let save = await API_CHANGE_CURPLN(curpln);
        if (save.status) {
            close();
        }
    }
    return (
        <Dialog open={open} onClose={() => close()} fullScreen>
            <DialogTitle >
                <Stack direction={'row'} gap={1}>
                    <span>EDIT CURRENT PLAN :</span>
                    <span className='text-[#3b82f6] font-bold'>{moment().month(parseInt(ym.substring(4, 6))).format('MMMM').toUpperCase()}</span>
                </Stack>
            </DialogTitle>
            <DialogContent dividers>
                <Stack gap={2}>
                    <div id='box-edit-plan' className='h-[100%] flex flex-col justify-center'>
                        <div className='h-fit'>
                            <div className=' bg-blue-500 text-white flex py-3 px-4 gap-2'>
                                <AssignmentOutlinedIcon />
                                <Typography>Excel Current Plan</Typography>
                            </div>
                            <div className='bg-white px-4 pt-4 pb-1 flex  items-start gap-3' style={{ borderLeft: '1px solid #ddd', borderRight: '1px solid #ddd', borderBottom: '1px solid #ddd' }}>
                                <TextField
                                    select
                                    label="Model Group"
                                    defaultValue="SCR"
                                    size='small'
                                    helperText="Please select your model group"
                                >
                                    {
                                        ['1YC', '2YC', 'SCR', 'ODM'].map(oGroup => {
                                            return <MenuItem value={oGroup}>{oGroup}</MenuItem>
                                        })
                                    }
                                </TextField>
                                <TextField placeholder='enter model name' size='small' helperText='Please enter model name' label="Model" InputLabelProps={{
                                    shrink: true,
                                }} />
                                <TextField
                                    select
                                    label="Line"
                                    size='small'
                                    defaultValue={'ALL'}
                                    helperText="Please select your line"
                                >
                                    {
                                        ['ALL', '1YC', '2YC', 'SCR', 'ODM'].map((oGroup,iGroup) => {
                                            return <MenuItem key={iGroup} value={oGroup}>{oGroup}</MenuItem>
                                        })
                                    }
                                </TextField>
                                <Button variant='contained' startIcon={<SearchOutlinedIcon />}>Search</Button>
                            </div>

                        </div>
                        {
                            loading ? <Stack className='w-full h-[100%]' direction={'column'} justifyContent={'center'} alignItems={'center'} gap={1}>
                                <CircularProgress />
                                <Typography>กำลังโหลดข้อมูล</Typography>
                            </Stack> :

                                <div className='wrapper'>
                                    <ReactGrid
                                        id="tbAdjPlan"
                                        stickyTopRows={1}
                                        rows={rows}
                                        columns={columns}
                                        onCellsChanged={handleChanges}
                                        enableRowSelection
                                        onContextMenu={simpleHandleContextMenu}
                                    />
                                </div>
                        }
                    </div>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleSavePlan()} variant='contained' >
                    Save
                </Button>
                <Button onClick={() => close()} variant='outlined' >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogEditPlan