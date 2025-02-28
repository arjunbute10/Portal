import { Grid } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import React from 'react';
import PrimaryButton from '../../controls/FormControls/PrimaryButton';



interface LearningCardProps {
    image: string;
    title: string;
    description: string;
    buttonText: string;
    messageCount: number;
    seenCount: number;
    fixedImgHeight: number;
}

const LearningCard: React.FC<LearningCardProps> = (props: LearningCardProps) => {
    let buttonVariant: any = 'contained'; // Default variant

    if (props.buttonText === 'Join Now' || props.buttonText === 'Continued' || props.buttonText === 'Start') {
        buttonVariant = 'outlined';
    }

    return (
        <Card>
            <CardMedia
                component="img"
                style={{ objectFit: 'cover', height: props.fixedImgHeight }}
                image={props.image}
                alt={props.title}
            />
            <Grid className='pt-5 pb-10 px-10 space-y-6'>
                <Grid>
                    <Typography gutterBottom variant="h5" component="div">
                        {props.title}
                    </Typography>
                    <Typography variant="h6" fontWeight={400}>
                        {props.description}
                    </Typography>
                </Grid>
                <PrimaryButton label={props.buttonText} variant={buttonVariant} />
            </Grid>

            {/* <CardActions className=''>
                 <Grid container justifyContent="flex-end" sx={{ marginRight: 2 }} className='space-x-4'>
                    <Grid item className='flex items-center'>
                        <IconButton>
                            <HiOutlineChatBubbleLeftEllipsis color='text.bodyLight' />
                        </IconButton>
                        <Typography color='text.bodyLight'>12</Typography>
                    </Grid>
                    <Grid item className='flex items-center'>
                        <IconButton>
                            <HiOutlineEye color='text.bodyLight' />
                        </IconButton>
                        <Typography color='text.bodyLight'>10</Typography>
                    </Grid>
                </Grid> 
            </CardActions> */}
        </Card>
    );
}


export default LearningCard;