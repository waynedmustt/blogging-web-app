import { quadrantApi } from '../index';
import {coreService} from '../../core/service';

export const getRole = async () => {
    const apiUrl = coreService.getConfig('apiUrl');
    return quadrantApi.get(`${apiUrl}/roles`)
    .then((res) => {return res})
    .catch((err) => {return err})
}