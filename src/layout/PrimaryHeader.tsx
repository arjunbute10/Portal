import Typography from '@mui/material/Typography'

type PrimaryHeaderProps = {
    label: string
}

export default function PrimaryHeader({ label }: PrimaryHeaderProps) {
    return (
        <Typography variant="h2">
            {label}
        </Typography>
    )
}

