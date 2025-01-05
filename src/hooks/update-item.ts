import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const updateData = async (id: string, formData: FormData): AxiosPromise<any> => {
    const response = axios.put(`${API_URL}/items/${id}`, formData, {
        withCredentials: true, // Garante que o cookie seja enviado
        headers: {
            'Content-Type': 'multipart/form-data'  // Garantir que o Content-Type seja 'multipart/form-data'
        }
    });
    return response;
}

export function updateItem(id: string) {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: (formData: FormData) => updateData(id, formData),
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["item-data"] });
        }
    });

    return mutate;
}
