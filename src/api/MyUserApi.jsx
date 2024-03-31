import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { useSnackbar } from 'notistack';
import {useEffect} from 'react'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyUser = () => {
    const { enqueueSnackbar } = useSnackbar();
    const {getAccessTokenSilently} = useAuth0();

    const getMyUserRequest = async() => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
            method: "GET",
            headers: {
                Authorization : `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
        });
        if(!response.ok){
            throw new Error("Failed to fetch user");
        }

        return response.json();
    };

    const {data: currentUser, isLoading, error} = useQuery("fetchCurrentUser", getMyUserRequest);

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error.toString(), { variant: 'error' });
        }
    }, [error, enqueueSnackbar]);

    return {currentUser, isLoading};
};

export const useCreateMyUser = () => {
    const {getAccessTokenSilently} = useAuth0();
    const createMyUserRequest = async (user) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
        method: "POST",
        headers: {
            Authorization : `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    if (!response.ok) {
        throw new Error("Failed to create");
    }
};

    const {mutateAsync: createUser, isLoading, isError, isSuccess} = useMutation(createMyUserRequest);

    return {
        createUser,
        isLoading,
        isError,
        isSuccess
    };
};

export const useUpdateMyUser = () => {
    const { enqueueSnackbar } = useSnackbar();

    const {getAccessTokenSilently} = useAuth0();
    const updateMyUserRequest = async (formData) => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/user`, {
        method: "PUT",
        headers: {
            Authorization : `Bearer ${accessToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        });
        if (!response.ok) {
            throw new Error("Failed to update user");
        }
        return response.json();
    };
    const {mutateAsync: updateUser, isLoading, isError, isSuccess, error, reset} = useMutation(updateMyUserRequest);

    useEffect(() => {
        if (isError) {
            enqueueSnackbar('Failed to update user', { variant: 'error' });
        }
    }, [isError, enqueueSnackbar]);

    useEffect(() => {
        if (!isLoading) {
            enqueueSnackbar('User profile updated', { variant: 'success' });
        }
    }, [isLoading, enqueueSnackbar]);

    return {
        updateUser,
        isLoading,
    };
};