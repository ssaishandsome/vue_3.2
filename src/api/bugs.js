import request from './request'

export const getBugs = (params) => {
    return request({
        url: '/bugs',
        params
    })
}

export const createBugs = (data) => {
    return request({
        url: '/bugs/create',
        method: 'post',
        data
    })
}

export const deleteBugs = (data) => {
    return request({
        url: `/bugs/${bug_id}`,
        method: 'get'
    })
}