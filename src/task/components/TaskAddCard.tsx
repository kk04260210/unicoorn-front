import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { FC, memo } from 'react';
import { Control, Controller } from 'react-hook-form';

import type { AddTaskParamsType } from '../TaskTypes';

type Props = {
  control: Control<AddTaskParamsType>;
  isValid: boolean;
  handleAdd: () => void;
};

export const TaskAddCard: FC<Props> = memo((props: Props) => {
  const { control, isValid, handleAdd } = props;

  return (
    <Card sx={{ marginTop: 2, marginBottom: 2 }}>
      <CardContent>
        <Grid container spacing={2} alignItems="flex-start">
          <Grid item xs={12} md={8}>
            <Controller
              control={control}
              name="title"
              rules={{ required: 'タイトルを入力してください' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  placeholder="タイトル"
                  size="small"
                  fullWidth
                  autoFocus
                  error={fieldState.error?.message !== undefined}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Controller
              control={control}
              name="limitDay"
              rules={{ required: '期限日を入力してください' }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  type="date"
                  placeholder="期限日"
                  size="small"
                  fullWidth
                  error={fieldState.error?.message !== undefined}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Grid>
        </Grid>

        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: 2 }}
          fullWidth
          disabled={!isValid}
          onClick={handleAdd}
        >
          追加
        </Button>
      </CardContent>
    </Card>
  );
});
