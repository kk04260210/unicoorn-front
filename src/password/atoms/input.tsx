import { FC } from 'react';
import PasswordStrengthBar from 'react-password-strength-bar';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  password: string;
  setPassword: (value: string) => void;
  passError: String;
  setpassError: (mailerror: string) => void;
  children: React.ReactNode;
  passwordType: string;
  setPasswordType: any;
  handleCheck: () => void;
};

type reProps = {
  repassword: string;
  setrePassword: (value: string) => void;
  repasswordType: string;
  setrePasswordType: any;
  handleCheck: () => void;
  passwordMatch: boolean;
  children: React.ReactNode;
};

const commonStyles = {
  bgcolor: 'background.paper',
  m: 1,
  borderColor: 'text.primary',
  width: '100%',
};

export const InputPass: FC<Props> = (props: Props) => {
  const handleBlur = (e: { target: { value: any } }) => {
    const pass = e.target.value;
    if (!pass) {
      setpassError('パスワードを入力してください');
    } else if (pass.length < 10) {
      setpassError('10桁以上で入力してください');
    } else if (pass.length > 50) {
      setpassError('50桁以下で入力してください');
    } else {
      setpassError('');
    }
  };

  const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const { password, setPassword, passError, setpassError, passwordType, setPasswordType } = props;
  
  return (
    <div>
      <label style={{ fontSize: 20 }}>新しいパスワード</label>
      <div style={{ display: 'flex', marginTop: 6, marginBottom: 20 }}>
        <input
          value={password}
          type={passwordType}
          placeholder={'パスワードを入力してください'}
          autoComplete="new-password"
          required
          onChange={(e) => {
            onChangeEvent(e);
          }}
          minLength={10}
          onBlur={handleBlur}
          className="Password"
          style={{
            ...commonStyles,
            borderTop: 0,
            ...commonStyles,
            borderRight: 0,
            ...commonStyles,
            borderLeft: 1,
            outline: 'none',
          }}
        />
        {passwordType === 'password' && (
          <VisibilityOffIcon onClick={() => setPasswordType('text')} className="Password__visual" />
        )}
        {passwordType === 'text' && (
          <VisibilityIcon onClick={() => setPasswordType('password')} className="Password__visual" />
        )}
      </div>
      {passError && <p style={{ color: 'red' }}>{passError}</p>}
      <PasswordStrengthBar
        password={password}
        onChangeScore={(score) => {
          console.log(score);
        }}
      />
    </div>
  );
};

export const RePassInput: FC<reProps> = (props: reProps) => {
  const { repassword, repasswordType, setrePassword, setrePasswordType, passwordMatch, children } = props;
  const { control, register } = useFormContext();

  const onChangeEvent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setrePassword(e.target.value);
  };

  return (
    <div>
      <label style={{ fontSize: 20, marginTop: 5 }}>{children}</label>
      <Controller
        name="otp"
        control={control}
        render={({ fieldState }) => (
          <div style={{ display: 'flex', marginTop: 6 }}>
            <input
              {...register('password', { required: 'passwordを入力してください' })}
              id="password"
              value={repassword}
              type={repasswordType}
              placeholder={'パスワードを再入力してください'}
              autoComplete="new-password"
              required
              onChange={(e) => {
                onChangeEvent(e);
              }}
              className="Password1"
              style={{
                ...commonStyles,
                borderTop: 0,
                ...commonStyles,
                borderRight: 0,
                ...commonStyles,
                borderLeft: 1,
                outline: 'none',
              }}
            />

            {repasswordType === 'password' && (
              <VisibilityOffIcon onClick={() => setrePasswordType('text')} className="Password__visual" />
            )}
            {repasswordType === 'text' && (
              <VisibilityIcon onClick={() => setrePasswordType('password')} className="Password__visual" />
            )}
          </div>
        )}
      />
      {passwordMatch === false && repassword !== '' && <div style={{ color: 'red' }}>パスワードが一致しません</div>}
    </div>
  );
};
