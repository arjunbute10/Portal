import * as React from 'react';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Box } from '@mui/material';
import { HiBookOpen, HiOutlineUserGroup, HiTrophy, HiUserGroup } from "react-icons/hi2";
import { useState } from 'react';
import UpcomingSeminars from './UpcomingSeminars';
import MandatoryCourses from './MandatoryCourses';
import QuaterlyTrainings from './QuaterlyTrainings';

interface TabPanelProps {
}

export default function BasicTabs(props: TabPanelProps) {
    const [value, setValue] = useState('upcomingSeminars');

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <TabList onChange={handleChange}>
                <Tab label="Upcoming Seminars" value='upcomingSeminars' icon={<HiOutlineUserGroup size={22} />} iconPosition='start' />
                <Tab label="Quaterly Trainings" value='quaterlyTrainings' icon={<HiTrophy />} iconPosition='start' />
                <Tab label="Mandatory Courses" value='mandatoryCourses' icon={<HiBookOpen />} iconPosition='start' />
            </TabList>
            <TabPanel value='upcoming-seminars'>{<UpcomingSeminars />}</TabPanel>
            <TabPanel value='quaterly-trainings'>{<QuaterlyTrainings />}</TabPanel>
            <TabPanel value='mandatory-courses'>{<MandatoryCourses />}</TabPanel>
        </TabContext>
    );
}
