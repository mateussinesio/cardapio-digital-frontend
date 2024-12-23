import axios, { AxiosPromise } from "axios";
import { CategoryData } from "../interface/category-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const updateData = async (id: string, data: CategoryData): AxiosPromise<any> => {
    const token = localStorage.getItem('token');
    const response = axios.put(`${API_URL}/categories/${id}`, data, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });
    return response;
}

export function updateCategory(id: string) {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: (data: CategoryData) => updateData(id, data),
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["category-data"] });
        }
    })

    return mutate;
}