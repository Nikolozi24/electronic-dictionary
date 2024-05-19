import React from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
import Page from '@/components/Page';

const DashboardApp = (): JSX.Element => {
    return (
        <Page title="Dashboard | Minimal-UI">
                <Box sx={{ pb: 5 }}>
                    <Typography variant="h4">Hi, Welcome to dashboard</Typography>
                </Box>
        </Page>
    );
};

export default DashboardApp;
