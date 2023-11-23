export type AddTaskParamsType = {
  title: string;
  limitDay: string;
};

export type ToggleTaskParamsType = {
  taskId: string;
  complete: boolean;
};

export type DeleteTaskParamsType = {
  taskId: string;
};

export type TaskType = {
  taskId: string;
  userId: string;
  title: string;
  limitDay: Date;
  complete: boolean;
  limitDayToString: string;
};
