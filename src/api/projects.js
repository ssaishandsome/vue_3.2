import request from './request'

export const getProjects = (params) => {
  return request({
    url: '/projects',
    params
  })
}