import { Card, Grid, IconButton, InputAdornment, Skeleton } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import PrimaryButton from '../FormControls/PrimaryButton';
import SearchBox from './Search';
import { HiOutlineMagnifyingGlass, HiOutlineXMark } from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';



export interface ButtonInfoProps {
    label: string;
    link: string;
}

export type FilterTypes = 'primary';

export type FilterId = number | string;

export interface FilterButton {
    id: FilterId,
    text: string,
    filter: string,
    count: number,
    selected: boolean,
    filterType: FilterTypes,
    showAlert?: boolean,
}

export interface FilterProps extends SearchboxProps {
    loaded: boolean;
    primaryFilters: FilterButton[],
    applyFilters: ApplyFilters,
    showSearch?: boolean,
    showButton?: boolean,
    appliedFilters?: AppliedFilters,
    buttonInfo: ButtonInfoProps
}

export interface SearchboxProps {
    totalItemsCount: number,
    onSearch: (term: string) => void
}

export const emptyAppliedFilters: AppliedFilters = {
    primary: [],
};

export type AppliedFilters = Record<FilterTypes, Pick<FilterButton, 'id' | 'text' | 'filterType'>[]>;
type ApplyFilters = (filters: AppliedFilters) => void;

const Filters: React.FC<FilterProps> = (props) => {

    const {
        loaded,
        showSearch = false,
        showButton = false,
        primaryFilters,
        totalItemsCount,
        appliedFilters,
        buttonInfo,
        applyFilters,
        onSearch,
    } = props;

    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState('');

    const handleButtonClick = (e: Event, link: string) => {
        e.preventDefault();
        navigate(link);
    }

    const clearSearch = useCallback(() => {
        setSearchTerm('');
        onSearch('');
    }, [onSearch]);

    const setValue = useCallback((term?: string) => {
        setSearchTerm(term || '');
        onSearch(term || '');
    }, [onSearch]);

    const [selectedTab, setSelectedTab] = useState(primaryFilters[1]);

    useEffect(() => {

        if (appliedFilters) {
            const index = primaryFilters.findIndex(x => x.selected === true);
            if (index > -1) {
                setSelectedTab(primaryFilters[index]);
            }

            const counts: Record<FilterTypes, number> =
            {
                primary: appliedFilters.primary?.length
            };

            const cleaned: AppliedFilters =
            {
                primary: appliedFilters.primary.filter(f => primaryFilters.findIndex(x => x.id === f.id) >= 0),
            };

            if (cleaned.primary?.length !== counts.primary) {
                applyFilters(cleaned);
            }
        }
    }, [primaryFilters, appliedFilters, applyFilters]);

    // const removeFilter = useCallback((filterType: FilterTypes, btnId: FilterId) => {
    //     if (!appliedFilters) return;
    //     if (appliedFilters[filterType].findIndex(e => e.id === btnId) < 0) return;
    //     const newGroup = appliedFilters[filterType].filter(e => e.id !== btnId);

    //     const result = { ...appliedFilters, [filterType]: newGroup };
    //     applyFilters(result);
    // }, [appliedFilters, applyFilters]);

    // const focusFilter = useCallback((filterType: FilterTypes, btnId: FilterId, text: string) => {
    //     if (filterType) {
    //         const result = { ...(appliedFilters || emptyAppliedFilters), [filterType]: [{ id: btnId, text, filterType }] };
    //         applyFilters(result);
    //     }
    // }, [appliedFilters, applyFilters]);

    // const toggleFilter = useCallback((filterType: FilterTypes, btnId: FilterId, text: string) => {
    //     if (filterType) {
    //         const curGroup = appliedFilters ? appliedFilters[filterType] : [];
    //         const containsId = curGroup.findIndex(e => e.id === btnId) >= 0;
    //         const newGroup = containsId ? curGroup.filter(e => e.id !== btnId) : [...curGroup, { id: btnId, text, filterType }];

    //         const result = { ...(appliedFilters || emptyAppliedFilters), [filterType]: newGroup };
    //         applyFilters(result);
    //     }
    // }, [appliedFilters, applyFilters]);


    return (
        <>
            <Grid container sx={{ my: 3 }}>
                <Card className="p-5 w-full">
                    <Grid container className='flex justify-between items-center'>
                        <Grid item xs={12} md={8} className='flex'>
                            {showSearch &&
                                <Grid item xs={12} md={8} sx={{ mx: 3 }}>
                                    {!loaded ?
                                        <Skeleton sx={{ height: 65 }} />
                                        :
                                        <SearchBox
                                            placeholder={`Search in ${totalItemsCount} Employees`}
                                            value={searchTerm}
                                            size='small'
                                            fullWidth
                                            setValue={setValue}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <IconButton
                                                        edge="start"
                                                        disabled
                                                    >
                                                        <HiOutlineMagnifyingGlass />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        title="Clear Search"
                                                        edge="end"
                                                        onClick={clearSearch}
                                                        onMouseDown={clearSearch}
                                                    >
                                                        <HiOutlineXMark />
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                        />
                                    }
                                </Grid>
                            }
                        </Grid>
                        {showButton && buttonInfo &&
                            <Grid item xs={12} md={2} className='text-end'>
                                {!loaded ?
                                    <Skeleton sx={{height:65}} /> :
                                    <PrimaryButton variant='outlined' type='button' fullwidth={false} label={buttonInfo.label} onClick={(e: any) => handleButtonClick(e, buttonInfo.link)} />

                                }
                            </Grid>
                        }
                    </Grid>
                </Card >
            </Grid >

        </>
    );
}

export default Filters;