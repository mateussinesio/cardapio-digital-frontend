import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const postData = async (formData: FormData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/items', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
    });
    return response;
}

export function addItem() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: (formData: FormData) => postData(formData),
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["item-data"] });
        }
    });

    return mutate;
}
