import axios, { AxiosPromise } from "axios";
import { CategoryData } from "../interface/category-data";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

interface UpdateCategoryParams {
    categoryData: CategoryData;
    imageFile: File | null;
    removeImage: boolean;
}

const updateData = async (id: string, data: CategoryData, imageFile: File | null, removeImage: boolean): AxiosPromise<any> => {
    const formData = new FormData();
    formData.append('name', data.name);
    if (imageFile) formData.append('image', imageFile);
    formData.append('removeImage', removeImage.toString());

    const response = axios.put(`${API_URL}/categories/${id}`, formData, {
        withCredentials: true,
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response;
}

export function updateCategory(id: string) {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: (data: UpdateCategoryParams) => 
            updateData(id, data.categoryData, data.imageFile, data.removeImage),
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["category-data"] });
        }
    });

    return mutate;
}
