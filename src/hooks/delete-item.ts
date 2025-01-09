import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const deleteData = async (id: string) => {
    await axios.delete(`${API_URL}/items/${id}`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export function deleteItem() {
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: (id: string) => deleteData(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["item-data"] });
        }
    })

    return mutate;
}
