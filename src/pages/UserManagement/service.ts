import request from '@/utils/request';
import { SystemSearchParams, SystemUser } from './data.d';

export async function querySystemUsers(params?: SystemUser) {
  return request('/api/admin/user/list', {
    params,
  });
}

export async function addSystemUser(params: SystemUser) {
  return request('/api/admin/user', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateSystemUser(params: SystemUser) {
  return request('/api/admin/user', {
    method: 'PATCH',
    data: {
      ...params,
    },
  });
}

export async function removeSystemUser(params: { key?: any }) {
  return request('/api/admin/user', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}