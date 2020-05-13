import request from '@/utils/request';
import { TableListParams, SystemCollage } from './data.d';

export async function querySystemCollage(params?: SystemCollage) {
  return request('/api/admin/college/list', {
    params,
  });
}

export async function removeSystemCollage(params: { collegeId: any }) {
  return request('/api/admin/college', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addSystemCollage(params: SystemCollage) {
  return request('/api/admin/college', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateSystemCollage(params: SystemCollage) {
  return request('/api/admin/college', {
    method: 'PATCH',
    data: {
      ...params,
    },
  });
}
