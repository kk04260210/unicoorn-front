import type { AuthorityType } from '../common/types/AuthorityTypes';

export type AddUserParamsType = {
  userId: string;
  password: string;
  userName: string;
  authority: AuthorityType;
};

export type UpdateUserParamsType = {
  userId: string;
  password: string;
  userName: string;
  authority: AuthorityType;
  status: string;
};

export type DeleteUserParamsType = {
  userId: string;
};
