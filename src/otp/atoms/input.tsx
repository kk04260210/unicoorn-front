import { TextField } from '@mui/material';
import { FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  otp: string;
  setotp: (value: string) => void;
  children: React.ReactNode;
  handleOtp: () => void;
  otpCheck: boolean;
};

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  borderColor: 'text.primary',
  width: '100%',
};

export const InputOtp: FC<Props> = (props: Props) => {
  const { otp, setotp, children, handleOtp, otpCheck } = props;
  const { control, register } = useFormContext();
  return (
    <div>
      <Controller
        control={control}
        name="otp"
        rules={{ required: 'ワンタイムパスワードを入力してください' }}
        render={({ fieldState }) => (
          <>
            <label>{children}</label>
            <TextField
              {...register('otp', { required: 'ワンタイムパスワードを入力してください' })}
              placeholder={'xxxxxxxxxx'}
              autoComplete="new-password"
              id="otp"
              name="otp"
              style={{
                ...commonStyles,
                borderTop: 0,
                ...commonStyles,
                borderRight: 0,
                ...commonStyles,
                borderLeft: 1,
                outline: 'none',
              }}
              //onChange
              onBlur={(e) => {
                setotp(e.target.value);
              }}
              // onBlur={handleOtp}
            />
          </>
        )}
      />
    </div>
  );
};
function setState(arg0: { number: string }) {
  throw new Error('Function not implemented.');
}
function register(
  arg0: string,
  arg1: { required: boolean; maxLength: number },
): import('react/jsx-runtime').JSX.IntrinsicAttributes &
  import('react').ClassAttributes<HTMLInputElement> &
  import('react').InputHTMLAttributes<HTMLInputElement> {
  throw new Error('Function not implemented.');
}
