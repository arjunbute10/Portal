import { Grid } from '@mui/material';
import React from 'react'
import LearningCard from './LearningCard';

interface QuaterlyTrainingsProps {
}

const QuaterlyTrainings: React.FC<QuaterlyTrainingsProps> = () => {
    return (
        <Grid container spacing={5} className='py-10'>
            <Grid item xs={12} md={4} lg={4}>
                <LearningCard
                    image="/assets/images/redhat-img2.png"
                    title="Lizard"
                    description="Lizards are a widespread group of squamate reptiles"
                    buttonText="Completed"
                    messageCount={2}
                    seenCount={1}
                    fixedImgHeight={200}
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <LearningCard
                    image="/assets/images/azure-img2.png"
                    title="Lizard"
                    fixedImgHeight={200}
                    description="Lizards are a widespread group of squamate reptiles"
                    buttonText="Start"
                    messageCount={12}
                    seenCount={10}
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <LearningCard
                    image="/assets/images/azure-img2.png"
                    title="Lizard"
                    fixedImgHeight={200}
                    description="Lizards are a widespread group of squamate reptiles"
                    buttonText="Continue"
                    messageCount={12}
                    seenCount={10}
                />
            </Grid>
        </Grid>
    );
}

export default QuaterlyTrainings;