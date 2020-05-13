import request from '@/utils/request';
import { TableListParams, SystemClass } from './data.d';

export async function querySystemClass(params?: SystemClass) {
  return request('/api/admin/class/list', {
    params,
  });
}

export async function removeSystemClass(params: { classId: any }) {
  return request('/api/admin/class', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addSystemClass(params: SystemClass) {
  return request('/api/admin/class', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateSystemClass(params: SystemClass) {
  return request('/api/admin/class', {
    method: 'PATCH',
    data: {
      ...params,
    },
  });
}
