import request from '@/utils/request';
import { TableListParams, SystemRole } from './data.d';

export async function queryRole(params?: SystemRole) {
  return request('/api/admin/role/list', {
    params,
  });
}

export async function removeRole(params: { key: any }) {
  return request('/api/admin/role', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addRole(params: SystemRole) {
  return request('/api/admin/role', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateRole(params: SystemRole) {
  return request('/api/admin/role', {
    method: 'PATCH',
    data: {
      ...params,
      method: 'update',
    },
  });
}
