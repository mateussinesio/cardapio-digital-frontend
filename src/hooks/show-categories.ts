import axios, { AxiosPromise } from "axios";
import { useQuery } from "@tanstack/react-query";
import { CategoryData } from "../interface/category-data";

const API_URL = 'http://localhost:8080';

const fetchData = async (): AxiosPromise<CategoryData[]> => {
    const response = axios.get(API_URL + '/categories', {withCredentials: true});
    return response;
}

export function showCategories() {
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['category-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}
