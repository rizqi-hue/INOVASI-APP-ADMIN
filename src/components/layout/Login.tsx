import PropTypes from 'prop-types';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import {
    Button,
    Card,
    CardActions,
    CircularProgress
} from '@mui/material';
import {
    Form,
    TextInput,
    required,
    useLogin,
    useNotify,
    useTranslate,
} from 'react-admin';

import Box from '@mui/material/Box';
// import Logo from './logo_dumas.png';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const translate = useTranslate();

    const notify = useNotify();
    const login = useLogin();
    const location = useLocation();

    const handleSubmit = (auth: FormValues) => {
        setLoading(true);
        login(
            auth,
            location.state ? (location.state as any).nextPathname : '/admin/dashboard'
        ).catch((error: Error) => {
            setLoading(false);
            notify(
                typeof error === 'string'
                    ? error
                    : typeof error === 'undefined' || !error.message
                        ? 'ra.auth.sign_in_error'
                        : error.message,
                {
                    type: 'error',
                    messageArgs: {
                        _:
                            typeof error === 'string'
                                ? error
                                : error && error.message
                                    ? error.message
                                    : undefined,
                    },
                }
            );
        });
    };

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <Box
                sx={{
                    display: 'flex',
                    // flexDirection: 'column',
                    flexDirection: 'row',
                    minHeight: '100vh',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    // background:
                    //     'url(https://source.unsplash.com/random/1600x900)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                }}
            >

                <Card sx={{ backgroundColor: 'white', boxShadow: 'none', borderRadius: '10px', width: '350px' }}>
                    <Box
                        sx={{
                            margin: '1em',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                    >
                        {/* <img src={Logo} style={{ width: '100%', marginRight: '13px' }} /> */}

                        {/* <Avatar sx={{ bgcolor: 'secondary.main' }}>
                            <LockIcon />
                        </Avatar> */}
                    </Box>
                    <Box
                        sx={{
                            marginTop: '1em',
                            display: 'flex',
                            justifyContent: 'center',
                            color: (theme: any) => theme.palette.grey[500],
                        }}
                    >
                    </Box>
                    <Box sx={{ padding: '0 1em 1em 1em' }}>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextInput
                                autoFocus
                                variant="filled"
                                source="PhoneNumber"
                                label={"No. HP"}
                                disabled={loading}
                                validate={required()}
                                fullWidth
                            />
                        </Box>
                        <Box>
                            <TextInput
                                variant="filled"
                                source="Password"
                                label={"Kata sandi"}
                                type="password"
                                disabled={loading}
                                validate={required()}
                                fullWidth
                            />
                        </Box>
                    </Box>

                    <CardActions >
                        <Button
                            sx={{
                                paddingY: '10px'
                            }}
                            variant="contained"
                            type="submit"
                            color="primary"
                            disabled={loading}
                            fullWidth
                        >
                            {loading && (
                                <CircularProgress size={25} thickness={2} />
                            )}
                            {translate('ra.auth.sign_in')}
                        </Button>
                    </CardActions>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                    }}>
                        {/* <span style={{ textAlign: 'center', marginBottom: '10px' }}>
                            Problem to access ? < br />
                            Please let us know your problem by mail to < br />
                            sisfo@halal.go.id
                        </span>
                        <span style={{ fontWeight: '600' }}>Connected to</span>
                        <div style={{
                            display: 'flex',
                            gap: '10px',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '30px'
                        }}>

                        </div> */}
                    </div>
                </Card>

            </Box>
        </Form>
    );
};

Login.propTypes = {
    authProvider: PropTypes.func,
    previousRoute: PropTypes.string,
};

export default Login;

interface FormValues {
    PhoneNumber?: string;
    Password?: string;
}
