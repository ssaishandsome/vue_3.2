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
    url:`/module/list/${projectId}`,
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

export const getUsers = (params) =>{
  return request({
    url: '/user/showAllUser',
    method: 'get',
    params
  })
}

export const addUsers = (params) => {
  return request({
    url: '/projects/addMember',
    method: 'post',
    params
  })
}

export const getMembers = (params) => {
  return request({
    url: '/projects/memberList',
    method: 'get',
    params
  })
}

export const deleteProject = (projectId) => {
  return request({
    url: `/projects/delete/${projectId}`,
    method: 'delete',

  })
}