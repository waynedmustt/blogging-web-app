import { quadrantApi } from '../index';
import {coreService} from '../../core/service';

export const sendComment = async (payload) => {
    const apiUrl = coreService.getConfig('apiUrl');
    const config = {
        headers: {
            'Authorization': `Bearer ${coreService.getItem('accessToken')}`
        }
    };
    return quadrantApi.post(`${apiUrl}/comments`, payload, config)
    .then((res) => {return res})
    .catch((err) => {
        return coreService.checkAuthorization(err)
    })
}