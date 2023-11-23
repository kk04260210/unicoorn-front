import { Grid, Typography } from '@mui/material';
import { FC } from 'react';

type Props = { dateLabel: string; telop: string; image: string };

export const OneDayWeather: FC<Props> = (props: Props) => {
  const { dateLabel, telop, image } = props;

  return (
    <Grid container spacing={1} sx={{ alignItems: 'center' }}>
      <Grid item xs={2}>
        <Typography>{dateLabel}</Typography>
      </Grid>
      <Grid item xs={2}>
        <Typography>
          <img
            src={`${image}?w=164&h=164&fit=crop&auto=format`}
            srcSet={`${image}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
            alt={telop}
            loading="lazy"
          />
        </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>{telop}</Typography>
      </Grid>
    </Grid>
  );
};
