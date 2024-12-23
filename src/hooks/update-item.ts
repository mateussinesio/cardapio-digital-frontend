import axios, { AxiosPromise } from "axios";
import { ItemData } from "../interface/item-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const updateData = async (id: string, data: ItemData): AxiosPromise<any> => {
    const token = localStorage.getItem('token');
    const response = axios.put(`${API_URL}/items/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response;
}

export function updateItem(id: string) {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: (data: ItemData) => updateData(id, data),
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["item-data"] });
        }
    })

    return mutate;
}