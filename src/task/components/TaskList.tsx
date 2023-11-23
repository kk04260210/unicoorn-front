import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, List, ListItem, ListItemText, Typography } from '@mui/material';
import { FC, memo } from 'react';

import type { TaskType } from '../TaskTypes';

type Props = {
  title: string;
  list: TaskType[];
  handleToggle: (taskId: string, complete: boolean) => void;
  handleDelete: (taskId: string) => void;
};

export const TaskList: FC<Props> = memo((props: Props) => {
  const { title, list, handleToggle, handleDelete } = props;

  return (
    <>
      {list.length !== 0 && (
        <>
          <Typography variant="h6">{title}</Typography>
          <List dense={true}>
            {list.map((task) => (
              <ListItem
                key={task.taskId}
                divider
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      aria-label="check"
                      onClick={() => handleToggle(task.taskId, task.complete)}
                      sx={{
                        marginRight: 1,
                      }}
                    >
                      <CheckIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(task.taskId)}>
                      <DeleteIcon />
                    </IconButton>
                  </>
                }
              >
                <ListItemText primary={task.title} secondary={`${task.limitDayToString}まで`} />
              </ListItem>
            ))}
          </List>
        </>
      )}
    </>
  );
});
