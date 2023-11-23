import { Divider, Grid, Select, TextField } from '@mui/material';
import { MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { BackLink } from '../common/components/BackLink';
import type { GourmetParamsType, ShopType } from './GourmetTypes';
import { areaCodeOptions } from './components/AeraCodeOptions';
import { ShopCard } from './components/ShopCard';
import { useGourmetApi } from './useGourmetApi';

export const GourmetPage: FC = () => {
  const { getGourmetList } = useGourmetApi();

  const [list, setList] = useState<Array<ShopType>>([]);

  const { control, getValues, formState } = useForm<GourmetParamsType>({
    defaultValues: {
      shopName: '',
      areaCode: areaCodeOptions[0].value,
    },
    mode: 'onChange',
  });

  const handleSearch = () => getGourmetList(getValues(), setList);

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
        <Typography component="h1" variant="h4">
          グルメ検索
        </Typography>

        <Box sx={{ width: '100%', maxWidth: '400px', marginTop: 3 }}>
          <Controller
            control={control}
            name="shopName"
            rules={{ required: '店名を入力してください' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                placeholder="店名"
                size="small"
                sx={{ marginBottom: 1 }}
                fullWidth
                autoFocus
                error={fieldState.error?.message !== undefined}
                helperText={fieldState.error?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="areaCode"
            render={({ field }) => (
              <Select {...field} size="small" fullWidth>
                {areaCodeOptions.map((v) => (
                  <MenuItem key={v.value} value={v.value}>
                    {v.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: 1, marginBottom: 2 }}
            fullWidth
            disabled={!formState.isValid}
            onClick={handleSearch}
          >
            検索
          </Button>
        </Box>

        <Divider />

        <Grid container spacing={2}>
          {list?.map((data) => (
            <ShopCard key={data.id} shop={data} />
          ))}
        </Grid>
      </Box>
    </Container>
  );
};
