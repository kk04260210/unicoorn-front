import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import type { LoginParamsType } from './LoginTypes';
import { useLoginApi } from './useLoginApi';

const appVersion: string = import.meta.env.VITE_REACT_APP_VERSION ?? '';

export const LoginPage: FC = () => {
  const { login } = useLoginApi();

  const { control, getValues, formState } = useForm<LoginParamsType>({
    defaultValues: {
      userId: '',
      password: '',
    },
    mode: 'onChange',
  });

  const handleLogin = () => login(getValues());

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Stack textAlign={'center'} sx={{ maxWidth: 400, marginTop: 10 }}>
        <Grid>
          <Typography component="h1" variant="h4">
            WebPortal
          </Typography>
        </Grid>

        <Grid sx={{ marginTop: 5 }}>
          <Card>
            <CardContent>
              <Box onSubmit={handleLogin}>
                <Controller
                  control={control}
                  name="userId"
                  rules={{ required: 'ユーザID(メールアドレス)を入力してください' }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      placeholder="ユーザID(メールアドレス)"
                      sx={{ mb: 2 }}
                      fullWidth
                      autoFocus
                      error={fieldState.error?.message !== undefined}
                      helperText={fieldState.error?.message}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && formState.isValid) {
                          handleLogin();
                        }
                      }}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="password"
                  rules={{ required: 'パスワードを入力してください' }}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      placeholder="パスワード"
                      type="password"
                      fullWidth
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && formState.isValid) {
                          handleLogin();
                        }
                      }}
                      error={fieldState.error?.message !== undefined}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ marginTop: 3 }}
                  fullWidth
                  disabled={!formState.isValid}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Grid item>
            <Link to="/new">{'新規登録'}</Link>
          </Grid>
        </Grid>

        <Grid sx={{ marginTop: 2 }}>{appVersion}</Grid>
      </Stack>
    </Container>
  );
};
