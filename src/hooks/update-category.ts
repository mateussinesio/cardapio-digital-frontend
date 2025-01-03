import axios, { AxiosPromise } from "axios";
import { CategoryData } from "../interface/category-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const updateData = async (id: string, data: CategoryData, imageFile: File | null): AxiosPromise<any> => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('name', data.name);
    if (imageFile) formData.append('image', imageFile);

    const response = axios.put(`${API_URL}/categories/${id}`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
}

export function updateCategory(id: string) {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: (data: { categoryData: CategoryData, imageFile: File | null }) => 
            updateData(id, data.categoryData, data.imageFile),
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["category-data"] });
        }
    });

    return mutate;
}
