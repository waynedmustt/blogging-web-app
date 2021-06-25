import { quadrantApi } from '../index';
import {coreService} from '../../core/service';

export const getBlogs = async () => {
    const apiUrl = coreService.getConfig('apiUrl');
    const config = {
        headers: {
            'Authorization': `Bearer ${coreService.getItem('accessToken')}`
        }
    };
    return quadrantApi.get(`${apiUrl}/blogs`, config)
    .then((res) => {return res})
    .catch((err) => {
        return coreService.checkAuthorization(err)
    })
}

export const getBlogByCode = async (code) => {
    const apiUrl = coreService.getConfig('apiUrl');
    const config = {
        headers: {
            'Authorization': `Bearer ${coreService.getItem('accessToken')}`
        }
    };
    return quadrantApi.get(`${apiUrl}/blogs/${code}`, config)
    .then((res) => {return res})
    .catch((err) => {
        return coreService.checkAuthorization(err)
    })
}

export const updateViewBlog = async (code, payload) => {
    const apiUrl = coreService.getConfig('apiUrl');
    const config = {
        headers: {
            'Authorization': `Bearer ${coreService.getItem('accessToken')}`
        }
    };
    return quadrantApi.put(`${apiUrl}/blogs/view/${code}`, payload, config)
    .then((res) => {return res})
    .catch((err) => {
        return coreService.checkAuthorization(err)
    })
}

export const createOrUpdateBlog = async (payload, code) => {
    const apiUrl = coreService.getConfig('apiUrl');
    const config = {
        headers: {
            'Authorization': `Bearer ${coreService.getItem('accessToken')}`
        }
    };

    let promise = null;

    if (code) {
        promise = quadrantApi.put(`${apiUrl}/blogs/${code}`, payload, config)
    } else {
        promise = quadrantApi.post(`${apiUrl}/blogs`, payload, config)
    }
    return promise
    .then((res) => {return res})
    .catch((err) => {
        return coreService.checkAuthorization(err)
    })
}

export const deleteBlog = async (id) => {
    const apiUrl = coreService.getConfig('apiUrl');
    const config = {
        headers: {
            'Authorization': `Bearer ${coreService.getItem('accessToken')}`
        }
    };
    return quadrantApi.delete(`${apiUrl}/blogs/${id}`, config)
    .then((res) => {return res})
    .catch((err) => {
        return coreService.checkAuthorization(err)
    })
}