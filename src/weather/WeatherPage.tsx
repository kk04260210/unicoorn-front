import { Card, Divider, Select } from '@mui/material';
import { MenuItem } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { BackLink } from '../common/components/BackLink';
import type { WeatherParamsType, WeatherType } from './WeatherTypes';
import { cityCodeOptions } from './components/CityCodeOptions';
import { OneDayWeather } from './components/OneDayWeather';
import { useWeatherApi } from './useWeatherApi';

export const WeatherPage: FC = () => {
  const { getWeatherList } = useWeatherApi();

  const [weather, setWeather] = useState<WeatherType>();

  const { control, getValues, formState } = useForm<WeatherParamsType>({
    defaultValues: {
      cityCode: cityCodeOptions[0].value,
    },
    mode: 'onChange',
  });

  const handleSearch = () => getWeatherList(getValues(), setWeather);

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
          天気予報検索
        </Typography>

        <Box sx={{ width: '100%', maxWidth: '400px' }}>
          <Controller
            control={control}
            name="cityCode"
            render={({ field }) => (
              <Select {...field} size="small" fullWidth autoFocus>
                {cityCodeOptions.map((v) => (
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

        {weather != undefined && (
          <Card sx={{ marginTop: 2, padding: 3 }}>
            <Typography variant="h5">{weather.locationName}の天気</Typography>

            <List dense={true}>
              {weather != undefined &&
                weather.forecasts.map((data) => (
                  <ListItem key={data.dateLabel}>
                    <OneDayWeather dateLabel={data.dateLabel} telop={data.telop} image={data.image} />
                  </ListItem>
                ))}
            </List>

            <Divider sx={{ marginBottom: 2 }} />

            <Typography variant="subtitle2">{weather.description.replace(/\s+/g, '')}</Typography>
          </Card>
        )}
      </Box>
    </Container>
  );
};
