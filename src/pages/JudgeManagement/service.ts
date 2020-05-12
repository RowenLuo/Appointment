import request from '@/utils/request';
import { SystemJudge } from './data.d';

export async function querySystemJudge(params?: SystemJudge) {
  return request('/api/admin/judge/list', {
    params,
  });
}

export async function removeSystemJudge(params: { key: any }) {
  return request('/api/admin/judge', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addSystemJudge(params: SystemJudge) {
  return request('/api/admin/judge', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateSystemJudge(params: SystemJudge) {
  return request('/api/admin/judge', {
    method: 'PATCH',
    data: {
      ...params,
    },
  });
}
