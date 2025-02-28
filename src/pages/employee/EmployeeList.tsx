import { Grid, Skeleton } from '@mui/material';
import React from 'react';
import MyDefaultCard from '../../controls/DefaultCard';
import EmptyState from '../../controls/EmptyState';
import { AllEmployeeRecords } from './Employee.model';
import InfiniteScroll from '../../controls/InfiniteScroll';
import { generateCardSkeletons } from '../../util/commonUtility';
import { NO_DATA } from '../../util/string';

export interface EmployeeListProps {
    loaded: boolean;
    items: AllEmployeeRecords[];
    useInfiniteScroll?: boolean,
    initialCount?: number,
    increaseCount?: number,
}

const EmployeeList: React.FC<EmployeeListProps> = (props) => {
    const { loaded, items, initialCount, increaseCount, useInfiniteScroll } = props;


    const renderedItems = React.useMemo(() => items.map((item: AllEmployeeRecords) =>
        <React.Fragment>
            <Grid item key={item.name} xs={12} md={4} lg={4}>
                <MyDefaultCard item={item}/>
            </Grid>
        </React.Fragment>
    ), [items]);

    return (
        <>
            {items.length > 0 &&
                <InfiniteScroll items={renderedItems} increaseCount={useInfiniteScroll ? increaseCount : undefined} initialCount={initialCount} />
            }
            {items.length === 0 && loaded &&
                <EmptyState title={NO_DATA} subTitle={'There are no Employees Available!'} iconName='HiOutlineUserGroup' />
            }
            {items.length === 0 && !loaded &&
                generateCardSkeletons(6)
            }
        </>
    );
}

export default EmployeeList;