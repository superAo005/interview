import request from '@/utils/request';
import { TableListItem } from '@/views/list/typing';

export async function queryFakeList(params = {}) {
  return request.get<any, TableListItem[]>('/fake_list', {
    params,
  });
}
