import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const deleteData = async (id: string) => {
    const token = localStorage.getItem('token'); // Obtenha o token do localStorage
    if (!token) {
        throw new Error("Token não encontrado");
    }
    await axios.delete(`${API_URL}/categories/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`, // Adicione o token ao header
            'Content-Type': 'application/json'
        }
    });
}

export function useDeleteCategory() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: (id: string) => deleteData(id),
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["category-data"] });
        }
    })

    return mutate;
}