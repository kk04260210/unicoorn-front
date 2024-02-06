import { Button } from "@mui/material";
import React, { FC } from "react";
import { themeColor } from "../../common/Theme";

type Props = {
  handleLogin: () => void;
    children: React.ReactNode,
};

export const ButtonLogin: FC<Props> = (props: Props) => {
  const { handleLogin, children } = props;
  const theme = themeColor;
  return (
    <Button
      variant="contained"
      size="large"
      onClick={handleLogin}
      sx={{
        marginTop: theme.spacing(2),
        color: 'white',
        background: '#D21919',
        flexGrow: 1,
        ':hover': { background: '#D21919' },
      }}
    >
      {children}
    </Button>
  );
};