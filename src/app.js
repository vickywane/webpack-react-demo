import React, { Suspense, Component } from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { Provider, inject, observer } from 'mobx-react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';

import Routes from './screens/routes';

import {
  TodoStore,
  ModalStore,
  MusicStore,
  MessageStore,
  WelcomeStore,
  BotStore,
  NotificationStore,
  AuthStore,
  SettingStore,
  StorageStore,
  SchedulerStore,
} from './state/stores/index';
import client from './data/config';

import Icon from './assets/btn-min.svg';

const electron = window.require('electron');
const ipc = electron.remote.getCurrentWindow();

const Renderer = require('electron').ipcRenderer;

const Header = () => {
  const close = () => {
    ipc.minimize();
    console.log(ipc);
  };

  const minimize = () => {
    console.log(ipc);
    ipc.minimize();
  };

  const maximize = () => {
    console.log(ipc);
    ipc.maximize();
  };

  const tray = () => {
    Renderer.send('create-tray');
  };

  const Nav = styled.div`
    background: #3a3a3a;
  `;

  const Hover = styled.div({
    cursor: 'pointer',
  });

  const Btn = styled.div`
    &:hover {
      cursor: pointeyarn watfb;
    }
  `;

  return (
    <Nav draggable>
      <Flex justifyBetween>
        <div
          style={{
            color: 'white',
            fontSize: '1em',
            paddingTop: '7px',
            paddingLeft: '15px',
            MozWindowDragging: 'drag',
          }}
        >
          <p>Remotify</p>
        </div>

        <div style={{ paddingRight: '7px ' }}>
          <Flex>
            <Hover
              style={{ paddingRight: '50px' }}
              onClick={() => {
                tray();
              }}
            >
              <img style={{ maxWidth: '1.2em' }} src={Icon} alt={'dock'} />{' '}
            </Hover>

            <div style={{ paddingRight: '5px' }}>
              <Flex>
                <Hover
                  onClick={() => {
                    tray();
                  }}
                  style={{ paddingRight: '12px' }}
                >
                  <img style={{ maxWidth: '1.2em' }} src={Icon} alt={'min'} />{' '}
                </Hover>
                <Hover
                  onClick={() => {
                    maximize();
                  }}
                  style={{ paddingRight: '12px' }}
                >
                  <img style={{ maxWidth: '1.2em' }} src={Icon} alt={'max'} />
                </Hover>
                <Hover
                  onClick={() => {
                    close();
                  }}
                >
                  <img
                    style={{ maxWidth: '1.1em', paddingRight: '10px' }}
                    src={Icon}
                    alt={'clos'}
                  />
                </Hover>
              </Flex>
            </div>
          </Flex>
        </div>
      </Flex>
    </Nav>
  );
};

class App extends Component {
  componentDidMount() {
    const { authenticated } = this.props.AuthStore;

    {
      !authenticated ? Renderer.send('authenticate-user') : null;
    }
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <Suspense fallback={'i am loading here '}>
          <Header />
          <Routes />
        </Suspense>
      </ApolloProvider>
    );
  }
}

const Stuff = inject('AuthStore')(observer(App));

ReactDOM.render(
  <Provider
    AuthStore={AuthStore}
    TodoStore={TodoStore}
    ModalStore={ModalStore}
    MusicStore={MusicStore}
    MessageStore={MessageStore}
    WelcomeStore={WelcomeStore}
    BotStore={BotStore}
    NotificationStore={NotificationStore}
    SettingStore={SettingStore}
    StorageStore={StorageStore}
    SchedulerStore={SchedulerStore}
  >
    <Stuff />
  </Provider>,
  document.getElementById('root'),
);
