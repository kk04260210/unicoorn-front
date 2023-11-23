import { Dispatch, SetStateAction, useCallback } from 'react';

import { useMessage } from '../_wheel/common/MessageProvider';
import { useAxios } from '../_wheel/security/ApiClient';
import type { AddTaskParamsType, DeleteTaskParamsType, TaskType, ToggleTaskParamsType } from './TaskTypes';

const URL_API_TASK = import.meta.env.VITE_REACT_APP_URL_TASK;
const URL_API_TASK_CSV = import.meta.env.VITE_REACT_APP_URL_TASK_CSV;

export const useTaskApi = () => {
  const { outMessage } = useMessage();
  const { apiClient } = useAxios();

  const getTaskList = useCallback(async (setList: Dispatch<SetStateAction<Array<TaskType>>>) => {
    let dataList: Array<TaskType> = [];

    await apiClient(true)
      .get(URL_API_TASK)
      .then((res) => {
        dataList = res.data.body;
        setList(dataList);
      });
  }, []);

  const addTask = useCallback(async (params: AddTaskParamsType) => {
    await apiClient(true)
      .post(URL_API_TASK, params)
      .then((res) => {
        if (res.data.responseCode === '200') {
          outMessage('タスクを追加しました', false);
        } else {
          outMessage(res.data.message, true);
        }
      });
  }, []);

  const toggleTask = useCallback(async (params: ToggleTaskParamsType) => {
    await apiClient(true)
      .put(URL_API_TASK, params)
      .then((res) => {
        if (res.data.responseCode === '200') {
          outMessage('タスクを変更しました', false);
        } else {
          outMessage(res.data.message, true);
        }
      });
  }, []);

  const deleteTask = useCallback(async (params: DeleteTaskParamsType) => {
    await apiClient(true)
      .delete(URL_API_TASK + '?taskId=' + params.taskId)
      .then((res) => {
        if (res.data.responseCode === '200') {
          outMessage('タスクを削除しました', false);
        } else {
          outMessage(res.data.message, true);
        }
      });
  }, []);

  const exportCSV = useCallback(async () => {
    await apiClient(true)
      .get(URL_API_TASK_CSV)
      .then((res) => {
        // CSV出力
        const url = URL.createObjectURL(new Blob([res.data], { type: 'text/csv' }));
        const linkEl = document.createElement('a');
        linkEl.href = url;
        linkEl.setAttribute('download', 'todo-export.csv');
        document.body.appendChild(linkEl);
        linkEl.click();
        URL.revokeObjectURL(url);
        linkEl.parentNode!.removeChild(linkEl);
      });
  }, []);

  return { getTaskList, addTask, toggleTask, deleteTask, exportCSV };
};
