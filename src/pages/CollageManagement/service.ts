import request from '@/utils/request';
import { TableListParams, SystemCollage } from './data.d';

export async function querySystemCollage(params?: SystemCollage) {
  return request('/api/admin/collage/list', {
    params,
  });
}

export async function removeSystemCollage(params: { key: any }) {
  return request('/api/admin/collage', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addSystemCollage(params: SystemCollage) {
  return request('/api/admin/collage', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateSystemCollage(params: SystemCollage) {
  return request('/api/admin/collage', {
    method: 'PATCH',
    data: {
      ...params,
    },
  });
}
