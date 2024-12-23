import axios from "axios";

const API_URL = 'http://localhost:8080';

export const deleteItem = async (id: string) => {
    try {
        await axios.delete(`${API_URL}/items/${id}`);
        console.log("Item deletado com sucesso!");
    } catch (error) {
        console.error("Erro ao deletar o item:", error);
    }
};