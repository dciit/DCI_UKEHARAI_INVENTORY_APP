import React, { useContext, useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import SearchIcon from '@mui/icons-material/Search';
import DialogActions from '@mui/material/DialogActions'
import Button from '@mui/material/Button'
import { Select, MenuItem, Stack, Typography } from '@mui/material'
import moment from 'moment'
import { MContext } from '../interface'
import { ThemeContext } from '../router/Routers'

function DialogFilterDashboard(props: any) {
    const { open, close, year, setYear, month, setMonth ,init} = props;
    const [rYear] = useState<string[]>([moment().add(-1, 'year').year().toString(), moment().year().toString()]);
    const context: MContext = useContext(ThemeContext);
    const _months = context.months;
    return (
        <Dialog open={open} onClose={() => close(false)} fullWidth maxWidth='sm'>
            <DialogTitle >

            </DialogTitle>
            <DialogContent dividers>
                <div className='group-search flex gap-2 p-2 bg-white rounded-lg mb-3 ' >
                    <div className="flex flex-col ">
                        <span>Year</span>
                        <Select value={year} size='small' onChange={(e) => setYear(e.target.value)} >
                            {
                                rYear.map((oYear: string, iYear: number) => {
                                    return <MenuItem value={oYear} key={iYear}>{oYear}</MenuItem>
                                })
                            }
                        </Select>
                    </div>
                    <div className="flex flex-col ">
                        <span>Month</span>
                        <Select value={month} size='small' onChange={(e: any) => {
                            setMonth(e.target.value);
                        }}>
                            {
                                _months.map((oMonth: string, iMonth: number) => {
                                    return <MenuItem value={(iMonth + 1)} key={(iMonth + 1)}>{oMonth}</MenuItem>
                                })
                            }
                        </Select>
                    </div>
                </div>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' className='border-[#5c5fc8] text-[#5c5fc8]' onClick={() => close(false)}>Close</Button>
                <Button variant='contained' className='bg-[#5c5fc8]' onClick={() => init()} startIcon={<SearchIcon />}>Search</Button>
            </DialogActions>
        </Dialog>
    )
}

export default DialogFilterDashboard