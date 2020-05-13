import request from '@/utils/request';
import { SystemJudge } from './data.d';

export async function querySystemJudge(params?: SystemJudge) {
  return request('/api/admin/api/list', {
    params,
  });
}

export async function removeSystemJudge(params: { apiId: any }) {
  return request('/api/admin/api', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addSystemJudge(params: SystemJudge) {
  return request('/api/admin/api', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateSystemJudge(params: SystemJudge) {
  return request('/api/admin/api', {
    method: 'PATCH',
    data: {
      ...params,
    },
  });
}
