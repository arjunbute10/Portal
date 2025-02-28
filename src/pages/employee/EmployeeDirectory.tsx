import { Grid } from '@mui/material';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Banner from '../../controls/Banner';
import { AllEmployeeRecords } from './Employee.model';
import EmployeeList from './EmployeeList';
import Filters, { AppliedFilters, ButtonInfoProps, FilterButton, FilterId, FilterTypes, emptyAppliedFilters } from '../../controls/Filters/Filters';
import { ADD_EMPLOYEE } from '../../util/string';

const INITIAL_COUNT = 9; // Number of data to load initially before requiring more to be added
const INCREASE_COUNT = 12; // Number of data to add when scrolled to the bottom

const PrimaryFilterIds = {
    All: 1,
} as const;

export interface AllEmployeesProps {
    loaded: boolean;
    items: AllEmployeeRecords[];
    refreshing?: boolean;
    totalRecordCount: number;
}

const EmployeeDirectory: React.FC<AllEmployeesProps> = (props) => {

    const { loaded, items: unfilteredItems, totalRecordCount } = props;

    const buttonInfo: ButtonInfoProps = {
        label: ADD_EMPLOYEE,
        link: '/add-employee'
    }

    const [appliedFilters, setAppliedFilters] = useState<AppliedFilters>();
    const [searchTerm, setSearchTerm] = useState<any>('');

    const primaryFilters = useMemo(() => getPrimaryFilters(unfilteredItems, totalRecordCount, appliedFilters), [unfilteredItems, appliedFilters, totalRecordCount]);

    const primaryItems = useMemo(() => filterItems_Primary(unfilteredItems, appliedFilters), [unfilteredItems, appliedFilters]);

    const items = useMemo(
        () => filterItems_Secondary(primaryItems, appliedFilters, searchTerm),
        [primaryItems, appliedFilters, searchTerm]
    );

    const searchableItemCount = useMemo(() => items.length, [items]);

    const SaveFilters = useCallback((appliedFilters: AppliedFilters) => {
        setAppliedFilters(appliedFilters);
        // savePrimaryFilters(appliedFilters.primary);
    }, []);

    useEffect(() => {
        //Read primary filters from localstorage.
        setAppliedFilters(getPrimaryFiltersFromLocalStorage);
    }, []); //Run only once when page loads.

    return (
        <>
            <Filters
                loaded={loaded}
                buttonInfo={buttonInfo}
                showSearch={true}
                showButton={true}
                totalItemsCount={searchableItemCount}
                onSearch={setSearchTerm}
                primaryFilters={primaryFilters}
                applyFilters={SaveFilters}
                appliedFilters={appliedFilters}
            />
            <Banner />
            <Grid container spacing={2}>
                <EmployeeList
                    loaded={loaded}
                    items={items}
                    useInfiniteScroll={true}
                    initialCount={INITIAL_COUNT}
                    increaseCount={INCREASE_COUNT}
                />
            </Grid>

        </>
    );
}

function isFilterSelected(group: FilterTypes, id: FilterId, appliedFilters: AppliedFilters | undefined) {
    if (!appliedFilters) return false;
    return appliedFilters[group].findIndex(f => f.id === id) >= 0;
}


export function getPrimaryFilters(items: AllEmployeeRecords[], totalRecordCount: number, appliedFilters?: AppliedFilters): FilterButton[] {
    let allCount = totalRecordCount;

    // items.forEach(item => {
    //     if (checkItemDays(item.date, 7)) {
    //         lastSevenDaysCount++;
    //     }
    //     if (checkItemDays(item.date, 15)) {
    //         lastFifteenDaysCount++;
    //     }
    //     if (checkItemDays(item.date, 30)) {
    //         lastThirtyDaysCount++;
    //     }
    // });
    return [
        {
            id: PrimaryFilterIds.All,
            text: 'All',
            filter: 'All',
            count: allCount,
            selected: isFilterSelected('primary', PrimaryFilterIds.All, appliedFilters),
            filterType: 'primary'
        },
    ];

    // return [
    //     {
    //         id: PrimaryFilterIds.LastSevenDays,
    //         text: 'Last 7 Days',
    //         filter: 'LastSevenDays',
    //         count: lastSevenDaysCount,
    //         selected: isFilterSelected('primary', PrimaryFilterIds.LastSevenDays, appliedFilters),
    //         filterType: 'primary'
    //     },
    //     {
    //         id: PrimaryFilterIds.LastFifteenDays,
    //         text: 'Last 15 Days',
    //         filter: 'LastFifteenDays',
    //         count: lastFifteenDaysCount,
    //         selected: isFilterSelected('primary', PrimaryFilterIds.LastFifteenDays, appliedFilters),
    //         filterType: 'primary'
    //     },
    //     {
    //         id: PrimaryFilterIds.LastThirtyDays,
    //         text: ' Last 30 Days',
    //         filter: 'LastThirtyDays',
    //         count: lastThirtyDaysCount,
    //         selected: isFilterSelected('primary', PrimaryFilterIds.LastThirtyDays, appliedFilters),
    //         filterType: 'primary',
    //     },
    //     {
    //         id: PrimaryFilterIds.All,
    //         text: ' All',
    //         filter: 'All',
    //         count: allCount,
    //         selected: isFilterSelected('primary', PrimaryFilterIds.All, appliedFilters),
    //         filterType: 'primary',
    //     },

    // ];
};

export function filterItems_Primary(items: AllEmployeeRecords[], filters?: AppliedFilters): AllEmployeeRecords[] {
    // if the item doesn't match with any primary filters, then it shouldn't be visible
    return items.filter(item => matchesPrimaryFilters(item, filters?.primary));
}

function matchesPrimaryFilters(item: AllEmployeeRecords, filters?: AppliedFilters['primary']): boolean {
    // Note: there has to be at least ONE primary filter applied to show this item
    if (filters) {
        if (filters.find(f => f.id === PrimaryFilterIds.All)) return true;
    }
    return false; // default return value is false, because see the "Note" above
}

function getPrimaryFiltersFromLocalStorage(): AppliedFilters {
    //Read primary filters from localstorage.
    const localStorageValue = localStorage.getItem('PRIMARY_EMP_FILTERS');
    if (localStorageValue)
        return { ...emptyAppliedFilters, primary: JSON.parse(localStorageValue) };
    else
        return {
            ...emptyAppliedFilters,
            primary: [
                {
                    id: PrimaryFilterIds.All,
                    text: 'All',
                    filterType: 'primary',
                }
            ],
        };
};


export function filterItems_Secondary(items: AllEmployeeRecords[], filters?: AppliedFilters, searchText?: string): AllEmployeeRecords[] {

    // If there are no matches to the advanced filters or searchText, return no results
    if (items.findIndex(isMatch) < 0) return [];

    // If there are items to return, include all events in the results
    return items.filter(item => isMatch(item));

    function isMatch(item: AllEmployeeRecords): boolean {
        return matchesSearchText(item, searchText);
    }
}

function matchesSearchText(item: AllEmployeeRecords, searchText?: string): boolean {
    // If there is no searchText, then the item is a match
    if (!searchText) return true;

    const search = searchText.toLowerCase();

    if (item.name?.toLowerCase()?.includes(search)) return true;
    // if (item.projectName?.toLowerCase()?.includes(search)) return true;
    if (item.email.toLowerCase().includes(search)) return true;
    // if (item.phone?.toLowerCase()?.includes(search)) return true;
    if (item.role?.toLowerCase()?.includes(search)) return true;
    return false;

}



export default EmployeeDirectory;