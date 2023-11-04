import request from '@/utils/request';
import { PageResult } from '../typing';
import { Permission, Role } from '@/store/modules/user/typing';

export async function getRoles() {
  return request.get<any, PageResult<Role>>('/roles');
}

export async function getPermissions(): Promise<any> {
  return request.get<any, PageResult<Permission>>('/permissions');
}

export async function addPermission(data: Permission) {
  return request.post<Permission, any>('/permission', data);
}

export async function updatePermission(data: Permission) {
  return request.put<Permission, any>('/permission', data);
}
