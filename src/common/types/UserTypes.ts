import type { AuthorityType } from './AuthorityTypes';

export type UserType = {
  userId: string;
  userName: string;
  authority: AuthorityType;
  status: string;
};

export type UserTypeForView = UserType & {
  id: number;
  statusForView: string;
  authorityForView: string;
};
