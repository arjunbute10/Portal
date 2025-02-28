import { Card, Grid, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import EmptyState from "../../../controls/EmptyState";
import { HOLIDAY_CALENDAR } from "../../../util/string";
import { HolidayList, HolidayMasterData, HolidayRecord } from "../Calendar.model";
import { _getHolidayList, useHolidayList, useHolidayMaster } from "../Calendar.util";
import { useQuery } from "@tanstack/react-query";
import { useBanner } from "../../../controls/Banner";
import { useApi } from "../../../util/fetch/ApiProvider";
import { generateCardSkeletons } from "../../../util/commonUtility";

const HolidayCalendar = () => {
    const [selectedYear, setSelectedYear] = useState<number>(moment().year());
    const [uniqueYears, setUniqueYears] = useState<number[]>([]);
    const [holidaysToDisplay, setHolidaysToDisplay] = useState<HolidayList[]>([]);
    const [holidayData, setHolidayData] = useState<HolidayList[]>([]);
    const [cities, setCities] = useState<HolidayMasterData[]>([]);

    const { callApi } = useApi();
    const banner = useBanner();
    const holidayMaster = useHolidayMaster();
    // const holidayList = useHolidayList();

    const getHolidayList = () => {
        // if (holidayMaster.query.isSuccess && holidayMaster.query.data) {
        //     setCities(holidayMaster.query.data?.cities);
        //     if (cities.length > 0) {
        //         const fetchHolidayData = async (cities) => {
        //             const queryKey = ['Holiday', 'HolidayRecord', city.cityName];
        //             const { data } = await useQuery<HolidayRecord>(
        //                 queryKey,
        //                 () => {
        //                     const config = _getHolidayList(city.cityName);
        //                     return callApi(config);
        //                 },
        //                 {
        //                     useErrorBoundary: (error: any) => error.response?.status >= 201,
        //                     onError: (err: any) => {
        //                         banner.handleApiResponse(err);
        //                     }
        //                 }
        //             );
        //             return data;
        //         };

        //         const fetchDataForCities = async () => {
        //             const promises = cities.map(fetchHolidayData);
        //             const results = await Promise.all(promises);
        //             // setHolidayData(results);
        //         };

        //         fetchDataForCities();
        //     }
        // }
    }

    // Calculate the highest year and sort years in ascending order
    useEffect(() => {
        getHolidayList();




        //     && holidayList.query.isSuccess && holidayList.query.data.holidayList) {
        //     setHolidayData(holidayList.query.data?.holidayList);
        // }

        if (holidayData.length > 0) {
            console.log(holidayData)
            const years = holidayData.map(holiday => new Date(holiday.holiday_date).getFullYear());
            const yearsSet = Array.from(new Set(years));
            const sortedYears = yearsSet.sort((a, b) => a - b); // Sort in ascending order
            const highestYear = Math.max(...years);
            const currentYear = moment().year();
            // select current year if not present by Default select Highest year
            setSelectedYear(years.includes(currentYear) ? currentYear : highestYear);
            setUniqueYears(sortedYears);
        }
    }, []);

    // Update the holidays to display when selectedYear changes
    useEffect(() => {
        if (holidayData && selectedYear) {
            const filteredHolidays = holidayData.filter(
                holiday => new Date(holiday.holiday_date).getFullYear() === selectedYear
            );
            setHolidaysToDisplay(filteredHolidays);
        }
    }, [holidayData, selectedYear]);


    return (
        <>
            {/* {holidayList.query.isSuccess && !holidayList.query.data.holidayList &&
                <EmptyState title={'No Holiday List'} subTitle={'There are no Holidays get added.'} iconName='HiOutlineUser' />
            } */}
            {/* {!holidayList.query.isSuccess &&
                <Grid container className='pb-10' spacing={3}>
                    {generateCardSkeletons(3, true)}
                </Grid>
            } */}
            {holidayData.length > 0 &&
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Card className="p-5 space-y-8">
                            <Grid className="flex justify-between mx-3">
                                <Typography color='primary' variant="h5">{HOLIDAY_CALENDAR} - Pune</Typography>
                                <select
                                    className="select-year"
                                    value={selectedYear}
                                    onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                >
                                    {uniqueYears.map(year => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </Grid>
                            <Grid>
                                {holidaysToDisplay && holidaysToDisplay.map((holiday: HolidayList, index) => (
                                    <Grid key={index} className="flex justify-between mx-3 my-4">
                                        <Typography color={'#637381'} variant="body1">{holiday.holiday_value}</Typography>
                                        <Typography className="flex items-center" variant="body1" color="text.primary">
                                            {moment(holiday.holiday_date).format('DD MMMM')}
                                        </Typography>
                                    </Grid>
                                ))}
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            }
        </>
    );
}

export default HolidayCalendar;