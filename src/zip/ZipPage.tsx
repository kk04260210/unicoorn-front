import { Divider } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { BackLink } from '../common/components/BackLink';
import type { ZipParamsType, ZipType } from './ZipTypes';
import { useZipApi } from './useZipApi';

export const ZipPage: FC = () => {
  const { getZipList } = useZipApi();

  const [list, setList] = useState<Array<ZipType>>([]);

  const { control, getValues, formState } = useForm<ZipParamsType>({
    defaultValues: {
      zipCode: '',
    },
    mode: 'onChange',
  });

  const handleSearch = () => getZipList(getValues(), setList);

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
          住所検索
        </Typography>

        <Box sx={{ width: '100%', maxWidth: '400px', marginTop: 3 }}>
          <Controller
            control={control}
            name="zipCode"
            rules={{ required: '郵便番号を入力してください' }}
            render={({ field, fieldState }) => (
              <TextField
                {...field}
                placeholder="郵便番号"
                size="small"
                fullWidth
                autoFocus
                error={fieldState.error?.message !== undefined}
                helperText={fieldState.error?.message}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && formState.isValid) {
                    handleSearch();
                  }
                }}
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

          <Divider />

          <Grid sx={{ marginTop: 2 }}>
            {list?.map((data) => (
              <Card key={data.prefcode}>
                <CardContent>{data.address1 + data.address2 + data.address3}</CardContent>
              </Card>
            ))}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};
