import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const deleteData = async (id: string) => {
    await axios.delete(`${API_URL}/categories/${id}`, {
        withCredentials: true, // Garante que o cookie seja enviado
        headers: {
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
