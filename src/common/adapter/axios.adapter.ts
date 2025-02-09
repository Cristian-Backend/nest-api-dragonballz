import { Injectable } from "@nestjs/common";
import { HttpAdapter } from "../interfaces/http-adapter.interface";
import axios, { AxiosInstance } from 'axios';

// esto sirve por si axios cambia 
@Injectable()
export class AxiosAdapter implements HttpAdapter{

    private  axios: AxiosInstance = axios; // AxiosInstance es una interfaz que nos permite hacer peticiones HTTP
    async get<T>(url: string): Promise<T> {
        try {
            const { data } = await this.axios.get<T>(url)
            return data;
        } catch (error) {
            throw new Error(`This is an error - checks logs`);
        }
        
    }

}