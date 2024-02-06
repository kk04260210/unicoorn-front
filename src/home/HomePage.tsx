import Grid from '@mui/material/Grid';
import { FC, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useLoginUser } from '../_wheel/security/LoginUserProvider';
import { UserCard } from '../common/components/UserCard';
import { Authority } from '../common/types/AuthorityTypes';
import type { UserType } from '../common/types/UserTypes';
import { FuncCard } from './components/FuncCard';
import { useHomeApi } from './useHomeApi';

export const HomePage: FC = () => {
  const navigate = useNavigate();
  const { getProfile } = useHomeApi();
  const { getAuthority } = useLoginUser();
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    getProfile(setUser);
  }, []);

  const handleGoToTask = () => navigate('/task');

  const handleGoToZip = () => navigate('/zip');

  const handleGoToWeather = () => navigate('/weather');

  const handleGoToGourmet = () => navigate('/gourmet');

  const handleGoToUser = () => navigate('/user');

  const handleGoToBmi = () => navigate('/bmi');

  const handleGoToDog = () => navigate('/dog');


  return user ? (
    <>
      <Link to={'/profile'} state={{ userData: user }} style={{ textDecoration: 'none' }}>
        <UserCard user={user} managed={false} />
      </Link>
      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={6} md={4}>
          <FuncCard
            titleText="タスク管理"
            descText="日々のタスクを管理"
            buttonText="タスク管理"
            buttonColor="primary"
            handle={handleGoToTask}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <FuncCard
            titleText="グルメ検索"
            descText="おすすめグルメを検索"
            buttonText="グルメ検索"
            buttonColor="info"
            handle={handleGoToGourmet}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <FuncCard
            titleText="BMI計算"
            descText="身長と体重であなたのBMIを計算"
            buttonText="BMI計算"
            buttonColor="info"
            handle={handleGoToBmi}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <FuncCard
            titleText="犬"
            descText="犬の検索検索ぅ"
            buttonText="犬検索"
            buttonColor="info"
            handle={handleGoToDog}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <FuncCard
            titleText="郵便番号検索"
            descText="住所の検索検索ぅ"
            buttonText="郵便番号検索"
            buttonColor="info"
            handle={handleGoToZip}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <FuncCard
            titleText="天気予報"
            descText="天気予報を教えるよん♡"
            buttonText="天気予報"
            buttonColor="info"
            handle={handleGoToWeather}
          />
        </Grid>

        {getAuthority() === Authority.admin && (
          <Grid item xs={6} md={4}>
            <FuncCard
              titleText="ユーザ管理"
              descText="ユーザ情報を管理"
              buttonText="ユーザ管理"
              buttonColor="warning"
              handle={handleGoToUser}
            />
          </Grid>
        )}
      </Grid>
    </>
  ) : (
    <></>
  );
};
