import { Typography } from '@mui/material';

type Props = {
  id: string;
  variant: any;
  component: any;
  children: React.ReactNode;
};

export const BaseLabel = (props: Props) => {
  const { id = '', variant, component, children } = props;

  return (
    <Typography id={id} variant={variant} component={component}>
      {children}
    </Typography>
  );
};
