import { Box, Button, Card, CardContent, Container, Divider, Grid, TextField, Typography } from '@mui/material';
import { FC, useState } from 'react';
import { BackLink } from '../common/components/BackLink';
import { BmiData, BmiForm } from './BmiTypes';
import { Controller, useForm } from 'react-hook-form';
import { useBmiApi } from './useBmiApi';

export const BmiPage: FC = () => {
  const URL_API_ENDPOINT = import.meta.env.VITE_REACT_APP_ENDPOINT_URL;

  const { getBmiData } = useBmiApi();

  const [bmiData, setBmiData] = useState<BmiData>({ ans: '', path: '', comment: '' });

  const { control, getValues, formState } = useForm<BmiForm>({
    defaultValues: {
      weight: '',
      height: '',
    },
    mode: 'onChange',
  });

  const handleSearch = () => getBmiData(getValues(), setBmiData);

  return (
    <>
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
            BMI計算
          </Typography>

          <Box sx={{ width: '100%', maxWidth: '400px', marginTop: 3 }}>
            <Controller
              control={control}
              name="height"
              rules={{ required: '身長を入力してください' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  placeholder="身長(cm)"
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
              name="weight"
              rules={{ required: '体重を入力してください' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  placeholder="体重(kg)"
                  size="small"
                  sx={{ marginBottom: 1 }}
                  fullWidth
                  autoFocus
                  error={fieldState.error?.message !== undefined}
                  helperText={fieldState.error?.message}
                />
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
          {bmiData.ans && (
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4} sx={{ margin: '5px auto', maxWidth: '350px' }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {bmiData.ans}
                    </Typography>
                    <Typography variant="subtitle1">{bmiData.comment}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
};
