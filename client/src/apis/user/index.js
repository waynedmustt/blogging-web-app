import { quadrantApi } from '../index';
import {coreService} from '../../core/service';

export const getMe = async () => {
    const apiUrl = coreService.getConfig('apiUrl');
    const config = {
        headers: {
            'Authorization': `Bearer ${coreService.getItem('accessToken')}`
        }
    };
    return quadrantApi.get(`${apiUrl}/me`, config)
    .then((res) => {return res})
    .catch((err) => {
        return coreService.checkAuthorization(err)
    })
}