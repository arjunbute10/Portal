
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';
import clsx from 'clsx';
type LoadingProps = {
    fullScreen?: boolean;
    className?: string;
};
const Loading = (props: LoadingProps) => {
    const { fullScreen, className } = props;
    return (
        <Grid container className={clsx('flex items-center justify-center mt-10', fullScreen && "h-[55vh]", className)}>
            <CircularProgress color="primary" />
        </Grid>);
};

export default Loading;