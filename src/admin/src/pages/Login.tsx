import { Link as RouterLink } from 'react-router-dom';
import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, Stack, Link, Container, Typography } from '@mui/material';
import AuthLayout from '../layouts/AuthLayout';
import Page from '@/components/Page';
import { MHidden } from '@/components/@material-extend';
import { LoginForm } from '@/components/authentication/login';
import IllustrationLoginImage from '@/assets/images/illustrations/illustration_login.png';

const RootStyle = styled(Page)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'flex'
    }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
    width: '100%',
    maxWidth: 464,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'flex',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(12, 0)
}));

const Login = (): JSX.Element => {
    return (
        <RootStyle>
            <AuthLayout>
                Don’t have an account? &nbsp;
                <Link underline="none" variant="subtitle2" component={RouterLink} to="/register">
                    Get started
                </Link>
            </AuthLayout>

            <MHidden width="mdDown">
                <SectionStyle>
                    <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
                        Hi, Welcome Back
                    </Typography>
                    <img src={IllustrationLoginImage} alt="login" />
                </SectionStyle>
            </MHidden>

            <Container maxWidth="sm">
                <ContentStyle>
                    <Stack sx={{ mb: 5 }}>
                        <Typography variant="h4" gutterBottom>
                            Sign in to Dictionary
                        </Typography>
                        <Typography sx={{ color: 'text.secondary' }}>
                            Enter your details below.
                        </Typography>
                    </Stack>

                    <LoginForm />

                    <MHidden width="smUp">
                        <Typography variant="body2" align="center" sx={{ mt: 3 }}>
                            Don’t have an account?&nbsp;
                            <Link variant="subtitle2" component={RouterLink} to="register">
                                Get started
                            </Link>
                        </Typography>
                    </MHidden>
                </ContentStyle>
            </Container>
        </RootStyle>
    );
};

export default Login;
