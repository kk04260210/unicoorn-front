import { TextField } from '@mui/material';
import {  FC } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  mail: string;
  setmail: (value: string) => void;
  children: React.ReactNode;
  handleTokenMail: () => void;
  mailCheck: boolean;
};

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  borderColor: 'text.primary',
  width: '100%',
};

export const MailTokenInput: FC<Props> = (props: Props) => {
  const { mail, setmail, children, handleTokenMail, mailCheck } = props;
  const { control, register } = useFormContext();

  return (
    <div>
      <Controller
        control={control}
        name="userNo"
        rules={{ required: '学籍番号を入力してください' }}
        render={({ fieldState }) => (
          <TextField
            {...register('userNo', { required: 'userNoを入力してください' })}
            placeholder={'XXXXXXXX'}
            autoComplete="new-password"
            id="userNo"
            name="userNo"
            style={{
              ...commonStyles,
              borderTop: 0,
              ...commonStyles,
              borderRight: 0,
              ...commonStyles,
              borderLeft: 1,
              height: 20,
              outline: 'none',
            }}

            //onChange
            onBlur={(e) => {
              setmail(e.target.value);
            }}
            // onBlur={handleTokenMail}
          />
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
