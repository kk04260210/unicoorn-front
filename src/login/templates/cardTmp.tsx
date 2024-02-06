import { FC } from 'react';
import { CardLogin } from '../organisms/card';
import { themeColor } from '../../common/Theme';
import {  Link } from 'react-router-dom';

type Props = {
  handleLogin: () => void;
};

export const TmpCard: FC<Props> = (props: Props) => {
  const theme = themeColor;
  const { handleLogin } = props;
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '80vh',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <span
        // FIXME ここどうにかして！！ by みやまえ
        // noValidate
        // autoComplete="off"
        style={{
          width: 320,
          margin: theme.spacing(0),
          textAlign: 'center',
        }}
      >
        <CardLogin handleLogin={handleLogin} />
        <div
          style={{
            width: 320,
            margin: theme.spacing(0),
            textAlign: 'left',
            fontSize:15,
          }}
        >
          <Link to={'/mail'}>パスワードがわからない方はこちら</Link>
        </div>
      </span>
      
      <img
        src="src\img\iconGIF.gif"
        alt="logo"
        style={{
          position: 'absolute',
          bottom: 25,
          left: 'calc(50% - 5vmin)',
          height: '10vmin',
          pointerEvents: 'none',
          animation: 'spin infinite 10s linear',
        }}
      />
      <p
        style={{
          position: 'absolute',
          bottom: -30,
          left: '50%',
          transform: 'translateY(-50%) translateX(-50%)',
          fontSize: 'calc(10px + 1vmin)',
        }}
      >
        JobNavi
      </p>
    </div>
  );
};
