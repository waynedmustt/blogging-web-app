import { quadrantApi } from '../index';
import {coreService} from '../../core/service';

export const register = async (users) => {
    const apiUrl = coreService.getConfig('apiUrl');
    return quadrantApi.post(`${apiUrl}/users/register`, users)
    .then((res) => {return res})
    .catch((err) => {return err})
}

export const login = async (users) => {
    const apiUrl = coreService.getConfig('apiUrl');
    return quadrantApi.post(`${apiUrl}/auth/login`, users)
    .then((res) => {return res})
    .catch((err) => {return err})
}