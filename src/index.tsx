import * as ReactDOM from 'react-dom/client';
import { App } from './App';
import './index.css';
import { LoginGlobalParams } from './login/LoginGlobalParams';
import { MailGlobalGlobalParams } from './mail/MailGlobalParams';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <MailGlobalGlobalParams>
    <LoginGlobalParams>
      <App />
    </LoginGlobalParams>
  </MailGlobalGlobalParams>,
);
