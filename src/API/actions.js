import axios from "../Utils/axios";

export const fetchCurrencys = async () => axios.get("/");
export const createCurrencys = async (data) => axios.post("/", data);
export const deleteCurrency = async (id) => axios.delete(`/${id}`);
export const updateCurrency = async (data) => axios.put(`/`, data);

export const fetchClients = async () => axios.get(`/owners`);
export const createClient = async (data) => axios.post(`/owners`, data);
