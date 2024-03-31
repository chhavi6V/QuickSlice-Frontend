import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import LoadingButton from '@mui/lab/LoadingButton';
import {
    TextField,
    FormControl,
    FormHelperText,
    Button,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

const formSchema = yup.object().shape({
    email: yup.string().email().optional(),
    name: yup.string().min(1, 'Name is required'),
    addressLine1: yup.string().min(1, 'Address Line 1 is required'),
    city: yup.string().min(1, 'City is required'),
    country: yup.string().min(1, 'Country is required'),
});

function UserProfileForm({
    currentUser,
    onSave,
    isLoading,
    title = 'User Profile',
  }) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: currentUser    
    })

    useEffect(() => {
        reset(currentUser);
    }, [currentUser, reset]);
    
  return (
        <form onSubmit={handleSubmit(onSave)} className="space-y-4 bg-gray-50 rounded-lg md:p-10">
        <Grid container spacing={2}> 
            <Grid item xs={12}>
                <h2>{title}</h2>
                <FormHelperText>View and change your profile information here</FormHelperText>
            </Grid>
            <Grid item xs={12}>
                <FormControl fullWidth>
                <TextField
                    {...register('email')}
                    id="email"
                    label="Email"
                    disabled
                    className="bg-white"
                />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
          <FormControl fullWidth error>
            <TextField
              {...register('name')}
              id="name"
              label="Name"
              error={!!errors.name}
            />
            {errors.name?.message && (
              <FormHelperText>{errors.name.message}</FormHelperText>
            )}
          </FormControl>
        </Grid>
            <Grid item md={4} xs={12}>
                <FormControl fullWidth>
                <TextField
                    {...register('addressLine1')}
                    id="addressLine1"
                    label="Address Line 1"
                    error={!!errors.addressLine1}
                    helperText={errors.addressLine1?.message}
                    className="bg-white"
                />
                </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
                <FormControl fullWidth>
                <TextField
                    {...register('city')}
                    id="city"
                    label="City"
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    className="bg-white"
                />
                </FormControl>
            </Grid>
            <Grid item md={4} xs={12}>
                <FormControl fullWidth>
                <TextField
                    {...register('country')}
                    id="country"
                    label="Country"
                    error={!!errors.country}
                    helperText={errors.country?.message}
                    className="bg-white"
                />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                {isLoading ? (
                <LoadingButton
                loading
                loadingPosition="start"
                variant="outlined"
                >
                    Loading...
                </LoadingButton>
                ) : (
                <Button variant="contained" type="submit">
                    Submit
                </Button>
                )}
            </Grid>
        </Grid>
        </form>
  )
}

export default UserProfileForm