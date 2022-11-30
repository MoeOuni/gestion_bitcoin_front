import axios from "../Utils/axios";
import user_axios from "../Utils/axiosUsers";

export const fetchCurrencys = async () => axios.get("/");
export const createCurrencys = async (data) => axios.post("/", data);
export const deleteCurrency = async (id) => axios.delete(`/${id}`);
export const updateCurrency = async (data) => axios.put(`/`, data);

export const fetchClients = async () => axios.get(`/owners`);
export const createClient = async (data) => axios.post(`/owners`, data);
export const deleteClient = async (id) => axios.delete(`/owners/${id}`);
export const updateClient = async (data) => axios.put("/owners", data);

export const getUsers = async () => user_axios.get("/all");
