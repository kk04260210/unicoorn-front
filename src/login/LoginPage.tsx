import { FC } from 'react';
import { useLoginApi } from './useLoginApi';
import { LoginParamsType } from './LoginTypes';
import { useForm, FormProvider } from 'react-hook-form';
import { themeColor } from '../common/Theme';
import { TmpCard } from './templates/cardTmp';

type Props = {
  handleEmailChange: React.ChangeEventHandler<HTMLInputElement>;
  handlePasswordChange: React.ChangeEventHandler<HTMLInputElement>;
  isButtonDisabled: boolean;
  handleLogin: () => void;
};

export const LoginPage: FC<Props> = () => {
  const { login } = useLoginApi();
  const theme = themeColor;

  const useFormMethods = useForm<LoginParamsType>({
    defaultValues: {
      // FIXME: 直打ちテスト
      userId: '',
      password: '',
    },
    mode: 'onChange',
  });
  const { getValues } = useFormMethods;

  const handleLogin = () => login(getValues());
  return (
    <FormProvider {...useFormMethods}>
      <TmpCard handleLogin={handleLogin} />
    </FormProvider>
  );
};
