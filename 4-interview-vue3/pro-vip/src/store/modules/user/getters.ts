import { GetterTree } from 'vuex';
import { UserState } from './typing';
import { RootState } from '@/store/root-state';

export const getters: GetterTree<UserState, RootState> = {
  role: state => state.role,
  info: state => state.extra,
  username: state => state.username,
  nickname: state => state.nickname,
  avatar: state => state.avatar,
  allowRouters: state => state.allowRouters,
  currentUser: state => state,
};
