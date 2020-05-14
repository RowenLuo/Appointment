import request from '@/utils/request';
import { SystemJudge } from './data.d';

export async function querySystemJudge(params?: SystemJudge) {
  return await request('/api/admin/kpi/list', {
    params,
  });
}

export async function removeSystemJudge(params: { kpiId: any }) {
  return request('/api/admin/kpi', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addSystemJudge(params: SystemJudge) {
  return request('/api/admin/kpi', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateSystemJudge(params: SystemJudge) {
  return request('/api/admin/kpi', {
    method: 'PATCH',
    data: {
      ...params,
    },
  });
}
