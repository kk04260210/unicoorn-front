import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { BackLink } from '../common/components/BackLink';
import { UserCard } from '../common/components/UserCard';
import type { UserType } from '../common/types/UserTypes';
import type { UpdateProfileParamsType } from './SelfUserTypesForManage';
import { useSelfUserApi } from './useSelfUserApi';

export const SelfUserPageProfile: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userData } = location.state;

  const { updateProfile } = useSelfUserApi();

  const { control, getValues, formState } = useForm<UpdateProfileParamsType>({
    defaultValues: {
      password: '',
      userName: userData.userName,
    },
    mode: 'onChange',
  });

  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const userProfile: UserType = {
      userId: userData.userId,
      userName: userData.userName,
      authority: userData.authority,
      status: userData.status,
    };
    setUser(userProfile);
  }, []);

  const handleUpdate = async () => {
    const result = window.confirm('入力した内容でプロフィールを更新しますか？');
    if (result) {
      await updateProfile(getValues());
      navigate('/home');
    }
  };

  return user ? (
    <Container component="main" maxWidth="md">
      <BackLink />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4">
          プロフィール情報
        </Typography>
      </Box>

      <UserCard user={user} managed={false} />

      <Card sx={{ marginTop: 2, marginBottom: 2 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <FormLabel>新しいパスワード(更新しない場合は未入力)</FormLabel>
                <Controller
                  control={control}
                  name="password"
                  rules={{ required: false }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="password"
                      placeholder="パスワード"
                      size="small"
                      fullWidth
                      error={fieldState.error?.message !== undefined}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <FormLabel>ユーザ名</FormLabel>
                <Controller
                  control={control}
                  name="userName"
                  rules={{ required: 'ユーザ名を入力してください' }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      placeholder="ユーザ名"
                      size="small"
                      fullWidth
                      error={fieldState.error?.message !== undefined}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>

          <Button
            type="submit"
            variant="contained"
            color="secondary"
            sx={{ marginTop: 1 }}
            fullWidth
            disabled={!formState.isValid}
            onClick={handleUpdate}
          >
            更新
          </Button>
        </CardContent>
      </Card>
    </Container>
  ) : (
    <></>
  );
};
