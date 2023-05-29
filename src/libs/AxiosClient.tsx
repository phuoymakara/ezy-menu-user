import axios from "axios";

export const AxiosClient = axios.create({baseURL: process.env.NEXT_PUBLIC_FOOD_URL})

