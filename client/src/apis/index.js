import { coreService } from '../core/service';
import axios from 'axios';

export const quadrantApi = axios.create({
    baseURL: coreService.getConfig('apiUrl'),
    responseType: 'json'
});