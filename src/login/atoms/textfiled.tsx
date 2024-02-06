import { TextField } from '@mui/material';
import { Dispatch, FC, SetStateAction, createContext, useState } from 'react';
import { UseFormGetValues, UseFormRegister, useForm } from 'react-hook-form';
import { LoginParamsType } from '../LoginTypes';
import { useFormContext } from 'react-hook-form';

type Props = {
  userId: string;
  password: string;
};

export const IdText: FC<Props> = (props) => {
  const { register } = useFormContext();
  const { userId, password } = props;
  return (
    <>
      <TextField
        {...register('userId', { required: 'userIdを入力してください' })}
        fullWidth
        id={userId}
        type="email"
        label="メールアドレス"
        placeholder="xxxxxx@xxx.xx.xx"
        margin="normal"
      />

      <TextField
        {...register('password', { required: 'passwordを入力してください' })}
        fullWidth
        id={password}
        type="password"
        label="パスワード"
        placeholder="パスワード"
        margin="normal"
      />
    </>
  );
};
