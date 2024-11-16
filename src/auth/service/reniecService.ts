import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ReniecService {
    private readonly apiUrl = 'https://api.apis.net.pe/v2/reniec/dni?numero';
    private readonly apiToken = process.env.RENIEC_API_TOKEN;

    async getDniData(dni: string): Promise<any> {
        try {
            const response = await axios.get(`${this.apiUrl}=${dni}`, {
                headers: {
                    Authorization: `Bearer ${this.apiToken}`,
                },
            });
            return response.data;
        } catch (error) {
            throw new HttpException(
                'Error al consultar la API RENIEC',
                HttpStatus.BAD_REQUEST,
            );
        }
    }
}
