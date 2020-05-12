import request from '@/utils/request';
import { SystemCourse } from './data.d';

export async function querySysteCourse(params?: SystemCourse) {
  return request('/api/admin/course/list', {
    params,
  });
}

export async function removeSysteCourse(params: { key: any }) {
  return request('/api/admin/course', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addSysteCourse(params: SystemCourse) {
  return request('/api/admin/course', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateSysteCourse(params: SystemCourse) {
  return request('/api/admin/course', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
