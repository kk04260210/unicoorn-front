import { CardActions } from "@mui/material";
import { ButtonLogin } from "../atoms/button";
import { FC } from "react";

type Props ={
    handleLogin: () =>void;
}

export const ActionsLogin:FC<Props> = (props : Props) =>{
      const { handleLogin } = props;
return (
  <CardActions>
      <ButtonLogin handleLogin={handleLogin}>ログイン</ButtonLogin>
  </CardActions>
);
};