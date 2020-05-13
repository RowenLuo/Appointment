import request from '@/utils/request';
import { TableListParams, SystemAppoinment } from './data.d';

export async function querySystemAppointment(params?: SystemAppoinment) {
  return request('/api/admin/appointment/list', {
    params,
  });
}

export async function removeSystemAppointment(params: { appointmentId: any }) {
  return request('/api/admin/appointment', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addSystemAppointment(params: SystemAppoinment) {
  return request('/api/admin/appointment', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateSystemAppointment(params: SystemAppoinment) {
  return request('/api/admin/appointment', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
