import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { Box, CircularProgress, FormControl, InputLabel, NativeSelect, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { API_ADJUST_INVENTORY_MAIN, API_GET_ADJUST_INVENTORY_MAIN } from '../Service'
import moment from 'moment'
import { useSelector } from 'react-redux'
import { SaveAsOutlined } from '@mui/icons-material'
import { EkbWipPartStock } from '../interface'
function DialogAdjustInventoryMain(props: any) {
    const empcode = useSelector((state: any) => state.reducer.emp?.EmpCode);
    const { open, close, model } = props;
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [val, setVal] = useState<string>('0');
    const [monthSelected, setMonthSelected] = useState<string>('02');
    useEffect(() => {
        if (open && Object.keys(model).length) {
            initData();
            // setMonthSelected(moment().add(-1, 'month').format('MM'));
            setLoading(false);
        } else {
            // setMonthSelected(moment().add(-1, 'month').format('MM'))
        }
    }, [open]);
    async function initData() {
        if (model.modelCode != undefined) {
            let res: EkbWipPartStock = await API_GET_ADJUST_INVENTORY_MAIN({ model: model.modelCode, wcno: '999', ym: `${moment().format('YYYY')}${monthSelected}`, val: val.toString(), empcode: empcode });
            if (Object.keys(res).length && typeof res.bal != 'undefined' && res.bal != null) {
                setVal(res.bal.toString());
            } else {
                setVal('0');
            }
        }

    }
    async function handleSaveInventoryMain() {
        if (empcode != '') {
            if (val == '') {
                return false;
            }
            let res: any = await API_ADJUST_INVENTORY_MAIN({ model: model.modelCode, wcno: '999', ym: `${moment().format('YYYY')}${monthSelected}`, val: val.toString(), empcode: empcode });
            if (res?.status) {
                setError(false);
            } else {
                setError(true);
            }
        } else {
            setError(true);
        }
    }
    useEffect(() => {
        initData();
    }, [monthSelected])
    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth="xs">
            <DialogTitle fontSize={16}>EDIT INVENTORY  <span className='font-bold'>(MAIN)</span></DialogTitle>
            <DialogContent dividers>
                <Box>
                    {
                        loading ? <Stack alignItems={'center'} gap={1}>
                            <CircularProgress />
                            <Typography>กำลังโหลดข้อมูล</Typography>
                        </Stack> :
                            <Stack gap={3}>
                                <Stack>
                                    <Stack direction={'row'} gap={1}>
                                        <Typography>MODEL :</Typography>
                                        <Typography className='font-bold'>{model.modelCode}</Typography>
                                    </Stack>
                                    <Stack direction={'row'} gap={1}>
                                        <Typography>SEBANGO :</Typography>
                                        <Typography className='font-bold'>{model.sebango}</Typography>
                                    </Stack>
                                </Stack>
                                <FormControl fullWidth>
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Month
                                    </InputLabel>
                                    <NativeSelect
                                        disabled={true}
                                        onChange={(e: any) => {
                                            setMonthSelected(e.target.value)
                                        }}
                                        defaultValue={monthSelected}
                                    >
                                        {
                                            ['2'].map((o: string, i: number) => {
                                                let month = Number(o).toLocaleString('en', { minimumIntegerDigits: 2 })
                                                return <option key={o+i} value={month}>{month} - {moment(month, 'MM').format('MMMM').toUpperCase()}</option>
                                            })
                                        }
                                    </NativeSelect>
                                </FormControl>
                                <TextField type='number' size='small' label='Inventory Main' InputLabelProps={{ shrink: true }} value={val} onChange={(e: any) => setVal(e.target.value)} />
                                {
                                    error && <Typography variant='caption' color={'error'}>เกิดข้อผิดพลาดระหว่างการบันทึกข้อมูล ติดต่อผู้พัฒนา เบียร์ (611)</Typography>
                                }
                            </Stack>
                    }
                </Box>
            </DialogContent>
            <DialogActions>

                <Button size='small' variant='contained' onClick={() => handleSaveInventoryMain()} disabled={val == '' ? true : false} startIcon={<SaveAsOutlined />}>Save</Button>
                <Button size='small' onClick={() => {
                    setVal('0')
                    close(false)
                }}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogAdjustInventoryMain