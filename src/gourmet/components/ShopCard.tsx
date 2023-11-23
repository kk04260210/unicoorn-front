import { Button, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { Card } from '@mui/material';
import { memo } from 'react';

import type { ShopType } from '../GourmetTypes';

type Props = {
  shop: ShopType;
};

export const ShopCard = memo((props: Props) => {
  const { shop } = props;

  const handleOpenTab = () => window.open(shop.url, '_blank');

  return (
    <Grid item xs={12} sm={6} md={4} sx={{ margin: '5px auto', maxWidth: '350px' }}>
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardMedia component="img" sx={{ height: '150px' }} image={shop.image} alt={shop.name} />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {shop.name}
          </Typography>
          <Typography variant="subtitle1">{shop.address}</Typography>
          <Typography variant="subtitle2">{shop.access}</Typography>
        </CardContent>
        <CardActions>
          <img src={shop.logo_image} alt={shop.name} style={{ width: '50px' }} loading="lazy" />
          <Button size="small" sx={{ marginLeft: 1 }} onClick={handleOpenTab}>
            Link
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
});
