import AddIcon from '@mui/icons-material/Add';
import { Button, Card, FormControl, Grid, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, tableCellClasses } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState } from 'react';
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi2";
import PrimaryButton from '../../controls/FormControls/PrimaryButton';
import { useSnackbar } from '../../util/useSnackbar';
import { SUBMIT, TIME_SHEET, TOTAL_THIS_WEEK } from '../../util/string';


const TimeTracker = () => {
    const { showMessage } = useSnackbar();
    const columns = ['Date', 'Project', 'Comment', 'Time', 'Total', 'Add'];
    const [data, setData] = useState([
        {
            date: '',
            project: '',
            comment: '',
            time: '',
            total: '',
            add: ''
        },
    ]);

    const handleAddRow = () => {
        const previousRow = data[data.length - 1];
        if (
            previousRow.date === '' &&
            previousRow.project === '' &&
            previousRow.comment === '' &&
            previousRow.time === ''
        ) {
            // Display a message and create the first row if the data array is empty
            if (data.length === 0) {
                const newRow = {
                    date: '',
                    project: '',
                    comment: '',
                    time: '',
                    total: '',
                    add: '',
                };
                setData([newRow]);
            } else {
                showMessage({
                    message: 'Please fill all the fields',
                    severity: 'warning'
                });
            }
        } else {
            const newRow = {
                date: '',
                project: '',
                comment: '',
                time: '',
                total: '',
                add: '',
            };
            setData([...data, newRow]);
        }
    };

    const handleTimeChange = (value: string, index: number) => {
        const newData = [...data];
        newData[index].time = value;
        newData[index].total = value; // Update "Total" to be the same as "Time" for this row
        setData(newData);
    };

    const calculateTotalTime = (targetDate: string) => {
        const total = data
            .filter((row) => row.date === targetDate)
            .map((row) => parseFloat(row.time) || 0)
            .reduce((sum, time) => sum + time, 0);

        return total.toString();
    };



    // const handleTimeChange = (value: string, index: number) => {
    //     const newData = [...data];
    //     newData[index].time = value;
    //     // Update "Total" to be the sum of times for the same date
    //     const currentDate = newData[index].date;
    //     const total = newData
    //         .filter((row) => row.date === currentDate)
    //         .map((row) => parseFloat(row.time) || 0)
    //         .reduce((sum, time) => sum + time, 0);
    //     newData.forEach((row) => {
    //         if (row.date === currentDate) {
    //             row.total = total.toString();
    //         }
    //     });
    //     setData(newData);
    // };

    return (
        <Grid className='relative mt-1'>
            <PrimaryButton sx={{ position: 'absolute' }} className=' top-[-88px] right-[0px]' label={SUBMIT} fullWidth={false} />
            <Card className='px-8 py-6'>
                <Grid>
                    <Grid className='flex px-2' sx={{ justifyContent: 'space-between' }}>
                        <Grid>
                            <Typography textTransform='uppercase' color="primary" variant='h6'>
                                {TIME_SHEET}
                            </Typography>
                        </Grid>
                        <Grid className='flex'>
                            <Grid className='mr-6'><HiOutlineChevronLeft /></Grid>
                            <Grid className='ml-6'><HiOutlineChevronRight /></Grid>
                        </Grid>
                        <Grid><Typography variant='h6' sx={{ fontWeight: 600 }}>{TOTAL_THIS_WEEK}: 18 Hours</Typography></Grid>
                    </Grid>
                    <Grid className='mt-5'>
                        <TableContainer >
                            <Table className='w-full' sx={{
                                [`& .${tableCellClasses.root}`]: {
                                    borderBottom: "none"
                                }
                            }}>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell key={column}>{column}</TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row, index) => (
                                        <TableRow key={index}>
                                            <TableCell className="w-1/7 ">
                                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                    <DatePicker
                                                        label="Select Date"
                                                        slotProps={{ textField: { size: 'small' } }}
                                                        value={row.date}
                                                        onChange={(date) => {
                                                            const newData = [...data];
                                                            newData[index].date = date as string;
                                                            newData[index].total = calculateTotalTime(date as string);
                                                            setData(newData);
                                                        }}
                                                    />
                                                </LocalizationProvider>
                                            </TableCell>
                                            <TableCell className="w-1/7">
                                                <FormControl sx={{ m: 1, minWidth: 150 }} size="small">
                                                    <InputLabel id="demo-select-small-label">Project Name</InputLabel>
                                                    <Select
                                                        labelId="demo-select-small-label"
                                                        id="demo-select-small"
                                                        label="Project"
                                                    >
                                                        <MenuItem value=""><em>None</em></MenuItem>
                                                        <MenuItem value="sep">SEP</MenuItem>
                                                        <MenuItem value="clm">CLM</MenuItem>
                                                        <MenuItem value="gardiant">Gardiant</MenuItem>
                                                        <MenuItem value="ajni">Ajni</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </TableCell>
                                            <TableCell className="w-2/7">
                                                <TextField size='small' sx={{ width: '100%' }} label="Add Comments" />
                                            </TableCell>
                                            <TableCell className="w-1/7"><TextField size='small'
                                                sx={{ width: '50%' }}
                                                label="Time"
                                                value={row.time}
                                                onChange={(e) => handleTimeChange(e.target.value, index)} />
                                            </TableCell>
                                            <TableCell className="w-1/7">{row.total}</TableCell>
                                            <TableCell className="w-1/7">
                                                <Button variant="text" size="large" style={{ color: 'black' }} onClick={handleAddRow} startIcon={<AddIcon />} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}

export default TimeTracker;