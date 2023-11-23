import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import { FC, MouseEventHandler, memo } from 'react';

type Props = {
  titleText: string;
  descText: string;
  buttonText: string;
  buttonColor: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning' | undefined;
  handle: MouseEventHandler<HTMLButtonElement> | undefined;
};

export const FuncCard: FC<Props> = memo((props: Props) => {
  const { titleText, descText, buttonText, buttonColor, handle } = props;

  return (
    <Card>
      <CardHeader
        title={titleText}
        titleTypographyProps={{ variant: 'h6', align: 'center' }}
        sx={{
          backgroundColor: (theme) => theme.palette.grey[300],
        }}
      />
      <CardContent>
        <Typography align="center">{descText}</Typography>
      </CardContent>
      <CardActions>
        <Button fullWidth variant="contained" color={buttonColor} onClick={handle}>
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
});
