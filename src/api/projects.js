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

export const getModules = (projectId) =>{
  return request({
    url:`module/list/${projectId}`,
    method: 'get',
  })
}

export const createModules = (data)=>{
  return request({
    url: '/module/add',
    method: 'post',
    data
  })
}