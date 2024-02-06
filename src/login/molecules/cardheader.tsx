import { CardHeader } from "@mui/material";
import { FC } from "react";


type Props = {
  children: React.ReactNode;
};

export const HeaderLogin:FC<Props> = (props : Props) =>{
    const {children} = props;
    return (
      <CardHeader
        title={children}
        sx={{
          textAlign: 'center',
          background: '#D21919',
          color: '#fff',
        }}
      />
    );
}