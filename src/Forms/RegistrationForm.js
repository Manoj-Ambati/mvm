// create registration form with error validation using yup react hook form and material ui

import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import useAddDetailsService from '../Hooks/useAddDetailsService';
import Snackbar from '@mui/material/Snackbar';
import SummaryModal from '../Modals/SummaryModal'

import "yup-phone";
import {
    Button,
    TextField,
    Typography,
    Container,
    makeStyles,
    Avatar,
    CssBaseline,
} from '@material-ui/core';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';


const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        marginBottom: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(3),
        backgroundColor: theme.palette.secondary.main,
    }, 
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },  
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



const schema = yup.object().shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phone: yup.string().phone("IN", true).required(),
    email: yup.string().email('Email is invalid').required('Email is required')
});


export const RegistrationForm = () => {
    // use material ui styles
    const classes = useStyles();
    const [Submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({});
    const {
        mutate,
        error,
        isSuccess,
      } = useAddDetailsService()

    // use react hook form
    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
    });

    // handle form submit
    const onSubmit = (data) => {
        const payload = { ...data, id: new Date().getTime()}
        mutate(payload)
        setFormData(data)
        setSubmitted(true)        
    }

    useEffect(() => {
        isSuccess && <Snackbar
        open={isSuccess}
        autoHideDuration={3000}
        onClose={null}
        message="User added successfully"
        action={null}
      />
    }, [isSuccess])

    useEffect(() => {
        error && <Snackbar
        open={error}
        autoHideDuration={3000}
        onClose={null}
        message="Unable to add user"
        action={null}
      />
    }, [error])

    const resetSubmission = () => {
        setSubmitted(false)
        reset({
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
          })
        
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                {/* avatar */}
                <Avatar className={classes.avatar}>
                    <AppRegistrationIcon />
                </Avatar>
                {/* title */}
                <Typography component="h1" variant="h5">
                    Registration Form
                </Typography>
                {/* form */}
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    {/* first name */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="firstName"
                        label="First Name"
                        name="firstName"
                        autoComplete="firstName"
                        autoFocus
                        {...register('firstName')}
                        error={!!errors?.firstName}
                        helperText={errors?.firstName?.message}
                    />
                    {/* last name */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="lastName"
                        {...register('lastName')}
                        error={!!errors?.lastName}
                        helperText={errors?.lastName?.message}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="phone"
                        label="Phone Number"
                        name="phone"
                        autoComplete="phone"
                        {...register('phone')}
                        error={!!errors?.phone}
                        helperText={errors?.phone?.message}
                    />
                    {/* email */}
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        {...register('email')}
                        error={!!errors?.email}
                        helperText={errors?.email?.message}
                    />
                    {/* submit button */}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                    Register
                    </Button>
                </form>
            </div>
            {Submitted && <SummaryModal updatemodalStatus= {resetSubmission } modalStatus = {Submitted} data={formData}/>}
        </Container>
        
    );
}