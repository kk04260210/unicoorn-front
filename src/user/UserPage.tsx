import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import { FC, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useLoginUser } from '../_wheel/security/LoginUserProvider';
import { Authority } from '../common/types/AuthorityTypes';
import type { UserType, UserTypeForView } from '../common/types/UserTypes';
import { useUserApi } from './useUserApi';

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    width: 50,
  },
  {
    field: 'statusForView',
    headerName: '状態',
    width: 50,
  },
  {
    field: 'authorityForView',
    headerName: '権限',
    width: 80,
  },
  {
    field: 'userName',
    headerName: 'ユーザ名',
    width: 120,
  },
  {
    field: 'userId',
    headerName: 'ユーザID',
    width: 200,
  },
];

export const UserPage: FC = () => {
  const navigate = useNavigate();
  const { getUsers } = useUserApi();
  const { getAuthority } = useLoginUser();

  const [users, setUsers] = useState<Array<UserType>>([]);

  useEffect(() => {
    if (getAuthority() === Authority.admin) {
      getUsers(setUsers);
    }
  }, []);

  const viewUsers = useMemo<Array<UserTypeForView>>(() => {
    const viewUsers: Array<UserTypeForView> = [];
    users.map((value, index) => {
      const view = { ...value } as UserTypeForView;
      // テーブル表示用に列を追加
      view.id = index + 1;
      view.statusForView = String(view.status) === 'true' ? '' : '❌';
      view.authorityForView = String(view.authority) === 'admin' ? '管理者' : 'ユーザ';

      viewUsers.push(view);
    });
    return viewUsers;
  }, [users]);

  const handleGoToHome = () => navigate('/home');

  const handleGoToUserAdd = () => navigate('/user/add');

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    navigate(`/user/${params.row.userId}`, { state: params.row });
  };

  return (
    <Container component="main" maxWidth="md">
      <Typography
        variant="subtitle1"
        sx={{
          marginTop: 2,
          marginBottom: 2,
          cursor: 'pointer',
          '&:hover': { color: '#707070' },
        }}
        onClick={handleGoToHome}
      >
        {'<< ホームへ'}
      </Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h4">
          ユーザ情報管理
        </Typography>
      </Box>
      <Box sx={{ marginTop: 3, width: '100%' }}>
        <DataGrid
          rows={viewUsers}
          columns={columns}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          onRowClick={handleRowClick}
        />
        <Typography variant="subtitle2">※編集するユーザの行をクリック</Typography>
      </Box>
      <Button variant="contained" color="warning" sx={{ marginTop: 2, marginBottom: 2 }} onClick={handleGoToUserAdd}>
        追加
      </Button>
    </Container>
  );
};
