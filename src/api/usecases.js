import request from './request'

export const getTests = (projectId,params) => {
    return request({
        url: `/testcases/${projectId}`,
        method: 'get',
        params
    })
}

export const createTests = (data) => {
    return request({
        url: '/testcases/create',
        method: 'post',
        data
    })
}

export const updateTests = (testCaseId, data) => {
    return request({
        url: `/testcases/${testCaseId}`,
        method: 'put',
        data
    })
}

export const deleteTests = (testCaseId) => {
    return request({
        url: `/api/test-cases/${testCaseId}`,
        method: 'get'
    })
}