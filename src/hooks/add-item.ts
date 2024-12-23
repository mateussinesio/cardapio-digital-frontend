import axios, { AxiosPromise } from "axios";
import { ItemData } from "../interface/item-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const postData = async (data: ItemData): AxiosPromise<any> => {
    const token = localStorage.getItem('token');
    const response = axios.post(API_URL + '/items', data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response;
}

export function addItem() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["item-data"] });
        }
    })

    return mutate;
}