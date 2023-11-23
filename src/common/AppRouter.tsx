import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { useLoginUser } from '../_wheel/security/LoginUserProvider';
import { GourmetPage } from '../gourmet/GourmetPage';
import { HomePage } from '../home/HomePage';
import { LoginPage } from '../login/LoginPage';
import { SelfUserPageNew } from '../selfuser/SelfUserPageNew';
import { SelfUserPageProfile } from '../selfuser/SelfUserPageProfile';
import { TaskPage } from '../task/TaskPage';
import { UserPage } from '../user/UserPage';
import { UserPageAdd } from '../user/UserPageAdd';
import { UserPageDetail } from '../user/UserPageDetail';
import { WeatherPage } from '../weather/WeatherPage';
import { ZipPage } from '../zip/ZipPage';
import { MainTemplate } from './MainTemplate';
import { Authority } from './types/AuthorityTypes';
import { BmiPage } from '../bmi/BmiPage';

type RouterType = {
  path: `/${string}`;
  children: JSX.Element;
};

// TODO 全員アクセス可
const AuthRouters: Array<RouterType> = [
  {
    path: '/home',
    children: <HomePage />,
  },
  {
    path: '/task',
    children: <TaskPage />,
  },
  {
    path: '/gourmet',
    children: <GourmetPage />,
  },
  {
    path: '/weather',
    children: <WeatherPage />,
  },
  {
    path: '/zip',
    children: <ZipPage />,
  },
  {
    path: '/profile',
    children: <SelfUserPageProfile />,
  },
  {
    path: '/bmi',
    children: <BmiPage />,
  },
  // {
  //   path: '/dog',
  //   children: < />,
  // },
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
