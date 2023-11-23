export const authorityOptions = [
  { value: 'user', label: 'ユーザ' },
  { value: 'admin', label: '管理者' },
];

export const Authority = {
  user: 'user',
  admin: 'admin',
} as const;

export type AuthorityType = (typeof Authority)[keyof typeof Authority];
