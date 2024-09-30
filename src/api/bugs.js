import request from './request'

export const getBugs = (params) => {
    return request({
        url: '/bugs',
        params
    })
}

export const createBugs = (data) => {
    return request({
        url: '/bug/create',
        method: 'post',
        data
    })
}

export const deleteBugs = (data) => {
    return request({
        url: `/api/bugs/${bug_id}`,
        method: 'get'
    })
}