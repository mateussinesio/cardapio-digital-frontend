import axios, { AxiosPromise } from "axios";
import { ItemData } from "../interface/item-data";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const fetchItems = async (category: string): AxiosPromise<ItemData[]> => {
    const response = axios.get(`${API_URL}/items/${category}`);
    return response;
}

export function showItems(category: string) {
    const query = useQuery({
        queryFn: () => fetchItems(category),
        queryKey: ['item-data', category],
        retry: 2
    });

    return {
        ...query,
        data: query.data?.data
    }
}