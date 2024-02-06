import { Card, CardActions, CardHeader } from '@mui/material';
import { ContentLogin } from '../molecules/cardcontent';
import { ActionsLogin } from '../molecules/cardaction';
import { FC, useContext } from 'react';
import { themeColor } from '../../common/Theme';
import { HeaderLogin } from '../molecules/cardheader';

type Props = {
  handleLogin: () => void;
};

export const CardLogin: FC<Props> = (props: Props) => {
  const { handleLogin } = props;
  const theme = themeColor;

  return (
    <Card sx={{ marginTop: theme.spacing(10) }}>
      <HeaderLogin>JovNavi Account</HeaderLogin>
      <ContentLogin userId="userId" passwrod="passwrod" />
      <ActionsLogin handleLogin={handleLogin} />
    </Card>
  );
};
