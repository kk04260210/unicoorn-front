import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useLoginUser } from '../_wheel/security/LoginUserProvider';
import { LoginPage } from '../login/LoginPage';
import { SelfUserPageNew } from '../selfuser/SelfUserPageNew';  
import { UserPage } from '../user/UserPage';
import { UserPageAdd } from '../user/UserPageAdd';
import { UserPageDetail } from '../user/UserPageDetail';
import { MainTemplate } from './MainTemplate';
import { Authority } from './types/AuthorityTypes';
import { PasswordPage } from '../password/passwordPage';
import { MailPage } from '../mail/mailPage';
import { OtpPage } from '../otp/otpPage';
import { MailTokenPage } from '../token/mailPage';

type RouterType = {
  path: `/${string}`;
  children: JSX.Element;
};

// TODO 全員アクセス可
const AuthRouters: Array<RouterType> = [
  {
    path: '/pass',
    children: <PasswordPage />,
  },
  {
    path: '/mail',
    children: <MailPage />,
  },
  {
    path: '/otp',
    children: <OtpPage />,
  },
  {
    path: '/token',
    children: <MailTokenPage />,
  },
  {
    path: '/auth',
    children: <AuthPage />,
  },
];

// TODO 管理者のみアクセス可
const AdminRouters: Array<RouterType> = [
  {
    path: '/user',
    children: <UserPage />,
  },
  {
    path: '/user/add',
    children: <UserPageAdd />,
  },
  {
    path: '/user/:userId',
    children: <UserPageDetail />,
  },
];

export const AppRouter: FC = () => {
  const { isLogin, getAuthority } = useLoginUser();

  return (
    <Routes>
      <Route key={'/login'} path={'/login'} element={<LoginPage />} />
      <Route key={'/new'} path={'/new'} element={<SelfUserPageNew />} />

      {isLogin() && (
        <Route path="/" element={<MainTemplate />}>
          {AuthRouters.map((route) => (
            <Route key={route.path} path={route.path} element={route.children} />
          ))}

          {getAuthority() === Authority.admin &&
            AdminRouters.map((route) => <Route key={route.path} path={route.path} element={route.children} />)}
        </Route>
      )}

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};
