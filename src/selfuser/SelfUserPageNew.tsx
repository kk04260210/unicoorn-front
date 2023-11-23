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
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import type { CreateUserParamsType } from './SelfUserTypesForManage';
import { useSelfUserApi } from './useSelfUserApi';

export const SelfUserPageNew: FC = () => {
  const navigate = useNavigate();

  const { createUser } = useSelfUserApi();

  const { control, getValues, formState } = useForm<CreateUserParamsType>({
    defaultValues: {
      userId: '',
      password: '',
      userName: '',
    },
    mode: 'onChange',
  });

  const handleGoToLogin = () => navigate('/login');

  const handleCreate = async () => {
    await createUser(getValues());
    navigate('/login');
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography
        variant="subtitle1"
        sx={{
          marginTop: 2,
          marginBottom: 2,
          cursor: 'pointer',
          '&:hover': { color: '#707070' },
        }}
        onClick={handleGoToLogin}
      >
        {'<< ログイン画面へ'}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4">
          新規登録
        </Typography>
      </Box>

      <Card sx={{ marginTop: 2, marginBottom: 2 }}>
        <CardContent>
          <Grid container spacing={2} alignItems="flex-start">
            <Grid item xs={12}>
              <FormControl fullWidth>
                <FormLabel>ユーザID(メールアドレス)</FormLabel>
                <Controller
                  control={control}
                  name="userId"
                  rules={{ required: 'ユーザIDを入力してください' }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      type="email"
                      placeholder="ユーザID(メールアドレス)"
                      size="small"
                      fullWidth
                      autoFocus
                      error={fieldState.error?.message !== undefined}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <FormLabel>パスワード</FormLabel>
                <Controller
                  control={control}
                  name="password"
                  rules={{ required: 'パスワードを入力してください' }}
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
            color="warning"
            sx={{ marginTop: 1 }}
            fullWidth
            disabled={!formState.isValid}
            onClick={handleCreate}
          >
            新規登録
          </Button>
        </CardContent>
      </Card>
    </Container>
  );
};
