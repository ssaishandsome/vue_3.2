import request from './request'

export const getTests = (params) => {
    return request({
        url: '/api/test-cases',
        params
    })
}

export const createTests = (data) => {
    return request({
        url: '/api/test-cases',
        method: 'post',
        data
    })
}

export const deleteTests = (testId) => {
    return request({
        url: `/api/test-cases/${testId}`,
        method: 'get'
    })
}