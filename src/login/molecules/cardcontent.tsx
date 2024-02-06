import { CardContent } from '@mui/material';
import { TextField } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  userId: string;
  passwrod: string;
};

export const ContentLogin: FC<Props> = (props: Props) => {
  const { control, register } = useFormContext();

  return (
    <CardContent>
      <Controller
        control={control}
        name="userId"
        render={({ field, fieldState, formState }) => (
          <TextField
            {...register('userId', { required: 'userIdを入力してください' })}
            fullWidth
            id="email"
            type="email"
            label="メールアドレス"
            placeholder="xxxxxx@xxx.xx.xx"
            margin="normal"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field, fieldState, formState }) => (
          <TextField
            {...register('password', { required: 'passwordを入力してください' })}
            fullWidth
            id="password"
            type="password"
            label="パスワード"
            placeholder="パスワード"
            margin="normal"
          />
        )}
      />
    </CardContent>
  );
};
