import { Box, Container, Divider } from "@mui/material";
import { BackLink } from "../../common/components/BackLink";
import { BaseLabel } from "../../mail/atoms/label";
import { Controller } from "react-hook-form";
import { InputPass, RePassInput } from "../atoms/input";
import { ButtonPass } from "../atoms/button";
import { ModalPass } from "../organisms/modal";
import { FC } from "react";

type Props = {
  control: any;
  password: string;
  setPassword: (value: string) => void;
  passError: String;
  setpassError: (mailerror: string) => void;
  passwordType: string;
  setPasswordType: any;
  repassword: string;
  setrePassword: (value: string) => void;
  repasswordType: string;
  setrePasswordType: any;
  handleCheck: () => void;
  passwordMatch: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
};

export const TmpPass:FC<Props> = (props:Props) =>{
    const {control,password,setPassword,passError,setpassError,passwordType,setPasswordType,repassword,setrePassword,repasswordType,setrePasswordType
    ,passwordMatch,handleCheck,handleOpen,handleClose,open
    } = props;
    return (
      <Container component="main" maxWidth="md">
        <BackLink />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <BaseLabel id="" component="h1" variant="h4">
            パスワード変更画面
          </BaseLabel>
          <Box sx={{ width: '100%', maxWidth: '400px', marginTop: 3 }}>
            <Controller
              control={control}
              name="password"
              rules={{ required: 'パスワードを入力してください' }}
              render={({}) => (
                <div>
                  <InputPass
                    password={password}
                    setPassword={setPassword}
                    passError={passError}
                    setpassError={setpassError}
                    passwordType={passwordType}
                    setPasswordType={setPasswordType}
                    handleCheck={handleCheck}
                  >
                    新しいパスワード
                  </InputPass>
                  <RePassInput
                    repassword={repassword}
                    repasswordType={repasswordType}
                    setrePassword={setrePassword}
                    setrePasswordType={setrePasswordType}
                    passwordMatch={passwordMatch}
                    handleCheck={handleCheck}
                  >
                    新しいパスワード(再入力)
                  </RePassInput>
                </div>
              )}
            />
            <ButtonPass handleOpen={handleOpen} passwordMatch={passwordMatch}>
              変更
            </ButtonPass>
            <ModalPass handleClose={handleClose} open={open}/>
          </Box>
          <Divider />
        </Box>
      </Container>
    );
}