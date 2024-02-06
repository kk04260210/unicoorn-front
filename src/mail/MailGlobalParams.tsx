import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from 'react';

type Props = {
  children: ReactNode;
};

export const MailGlobalContext = createContext(
  {} as {
    taskList: never[];
    setTaskList: Dispatch<SetStateAction<never[]>>;
  },
);

export const MailGlobalGlobalParams: FC<Props> = (props) => {
  const { children } = props;

  // タスクを配列で保持するState(初期値: 空の配列[])
  const [taskList, setTaskList] = useState([]);

  // valueにグローバルに扱う値を設定
  return <MailGlobalContext.Provider value={{ taskList, setTaskList }}>{children}</MailGlobalContext.Provider>;
};
