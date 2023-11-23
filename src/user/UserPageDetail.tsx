import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FC, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

import { BackLink } from '../common/components/BackLink';
import { UserCard } from '../common/components/UserCard';
import { authorityOptions } from '../common/types/AuthorityTypes';
import type { UserType } from '../common/types/UserTypes';
import type { UpdateUserParamsType } from './UserTypesForManage';
import { useUserApi } from './useUserApi';

export const UserPageDetail: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { getUserDetail, updateUser, deleteUser } = useUserApi();

  const { control, getValues, formState } = useForm<UpdateUserParamsType>({
    defaultValues: {
      userId: location.state.userId,
      password: '',
      userName: location.state.userName,
      authority: location.state.authority,
      status: location.state.status,
    },
    mode: 'onChange',
  });

  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    getUserDetail(location.state.userId, setUser);
  }, []);

  const handleUpdate = async () => {
    const result = window.confirm('入力した内容でユーザを更新しますか？');
    if (result) {
      await updateUser(getValues());
      navigate('/user');
    }
  };

  const handleDelete = async () => {
    const result = window.confirm('このユーザを削除しますか？');
    if (result) {
      await deleteUser({
        userId: location.state.userId,
      });
      navigate('/user');
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
          ユーザ情報詳細
        </Typography>
      </Box>

      <UserCard user={user} managed={true} />

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
                      size="small"
                      placeholder="ユーザ名"
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
                <FormLabel>権限</FormLabel>
                <Controller
                  name="authority"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup value={field.value} row>
                      {authorityOptions.map((v) => (
                        <FormControlLabel
                          {...field}
                          key={v.value}
                          label={v.label}
                          value={v.value}
                          control={<Radio />}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <FormLabel>状態</FormLabel>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup value={field.value} row>
                      <FormControlLabel {...field} label="無効" value="false" control={<Radio />} />
                      <FormControlLabel {...field} label="有効" value="true" control={<Radio />} />
                    </RadioGroup>
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

      <Button variant="contained" color="error" sx={{ marginTop: 2, marginBottom: 2 }} onClick={handleDelete}>
        削除
      </Button>
    </Container>
  ) : (
    <></>
  );
};
