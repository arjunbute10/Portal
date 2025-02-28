import { Grid, Typography } from '@mui/material';
import IconElement from '../util/commonUtility';
import clsx from 'clsx';

type EmptyStateProps = {
    title: string,
    subTitle: string,
    iconName?: string,
    small?: boolean,
}

export default function EmptyState({ title, subTitle, iconName = 'HiOutlineHome', small = false }: EmptyStateProps) {

    return (
        <Grid container xs={12} className={clsx(
            "flex items-center justify-center",
            {" h-[55vh]": !small}
        )}>
            <Grid item className='text-center space-y-1'>
                <IconElement iconName={iconName.toString()} classes='w-full'/>
                <Typography variant='h3' fontSize={'120%'}>{title}</Typography>
                <Typography variant='subtitle1' sx={{fontWeight: 500}}>{subTitle}</Typography>
            </Grid>
        </Grid>
    )
}

