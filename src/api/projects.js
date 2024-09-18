import request from './request'

export const getProjects = (params) => {
  return request({
    url: '/projects',
    params
  })
}

export const createProjects = (data)=>{
  return request({
    url: '/projects/create',
    method: 'post',
    data
  })
}