import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

import { BackLink } from '../common/components/BackLink';
import type { AddTaskParamsType, TaskType } from './TaskTypes';
import { TaskAddCard } from './components/TaskAddCard';
import { TaskList } from './components/TaskList';
import { useTaskApi } from './useTaskApi';

export const TaskPage: FC = () => {
  const { getTaskList, addTask, toggleTask, deleteTask, exportCSV } = useTaskApi();

  const [list, setList] = useState<Array<TaskType>>([]);

  const { control, getValues, formState, reset } = useForm<AddTaskParamsType>({
    defaultValues: {
      title: '',
      limitDay: '',
    },
    mode: 'onChange',
  });

  const handleAdd = useCallback(async () => {
    await addTask(getValues());
    // 入力値初期化
    reset();
    await getTaskList(setList);
  }, []);

  const handleToggle = useCallback(async (taskId: string, complete: boolean) => {
    await toggleTask({
      taskId: taskId,
      complete: complete,
    });
    await getTaskList(setList);
  }, []);

  const handleDelete = useCallback(async (taskId: string) => {
    await deleteTask({
      taskId: taskId,
    });
    await getTaskList(setList);
  }, []);

  const handleExportCSV = () => {
    const result = window.confirm('タスクをCSV形式で出力しますか？');
    if (result) {
      exportCSV();
    }
  };

  useEffect(() => {
    getTaskList(setList);
  }, []);

  // 未完了リスト
  const incompletedList = useMemo(() => list.filter((task: TaskType) => !task.complete), [list]);

  // 完了リスト
  const completedList = useMemo(() => list.filter((task: TaskType) => task.complete), [list]);

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
          タスク管理
        </Typography>
      </Box>

      <TaskAddCard control={control} isValid={formState.isValid} handleAdd={handleAdd} />

      <Grid container spacing={2} alignItems="flex-start">
        <Grid item xs={12} md={6}>
          <TaskList
            title="未完了タスク"
            list={incompletedList}
            handleToggle={handleToggle}
            handleDelete={handleDelete}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TaskList title="完了タスク" list={completedList} handleToggle={handleToggle} handleDelete={handleDelete} />
        </Grid>
      </Grid>

      <Button variant="outlined" sx={{ marginTop: 2 }} onClick={handleExportCSV}>
        CSV出力
      </Button>
    </Container>
  );
};
