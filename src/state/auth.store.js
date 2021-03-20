import { observable, decorate, action } from 'mobx';

// getting electron api
const electron = window.require('electron');
const Renderer = require('electron').ipcRenderer;

const Details = {
  name: 'Aderemi Okeowo',
  organization: 'Fundry',
  role: 'FrontEnd Engineer',
  department: 'Frontend Team',
  hoursPerWeek: 40,
};

class AuthStore {
  authenticated = true;
  welcomed = false;

  name = '';
  organization = '';
  department = '';
  role = '';
  hoursPerWeek = null;

  openWelcomeModal = () => {
    this.welcomed = true;
  };

  closeWelcomeModal = () => {
    this.welcomed = false;
  };

  AuthUser = () => {
    this.authenticated = true;

    Renderer.send('authenticate-user');

    Renderer.send('authenticated', Details);
    this.welcomed = true;
  };

  UnAuthUser = () => {
    this.authenticated = false;
  };
}

const DecoratedAuthStore = decorate(AuthStore, {
  //observables
  authenticated: observable,
  welcomed: observable,

  // user details
  name: observable,
  organization: observable,
  department: observable,

  //actions
  AuthUser: action,
  UnAuthUser: action,
});

const store = new AuthStore();

export default store;
