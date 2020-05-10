import request from '@/utils/request';
import { SystemSearchParams, SystemUser } from './data.d';

export async function querySystemUsers(params?: SystemSearchParams) {
  return request('/api/admin/user/list', {
    params,
  });
}

export async function addSystemUser(params: SystemUser) {
  return request('/api/admin/user', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateSystemUser(params: SystemUser) {
  return request('/api/admin/user', {
    method: 'PATCH',
    data: {
      ...params,
      method: 'update',
    },
  });
}

export async function removeSystemUser(params: { key?: any }) {
  return request('/api/admin/user', {
    method: 'DELETE',
    data: {
      ...params,
      method: 'delete',
    },
  });
}