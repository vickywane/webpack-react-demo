import { observer, inject } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { FiActivity } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Flex from 'styled-flex-component';

import Clock from '../../components/clock';
import Head from '../../components/head';
import { Keep } from '../../extensions/';

const electron = window.require('electron');
const ipc = electron.ipcRenderer;

const Home = props => {
  const Button = styled.button`
    background: #0e2f5a;
    text-align: right;
    border-radius: 3px;
    height: 40px;
    border: 1px solid #0e2f5a;
    color: #fff;
    margin: 0 1em;
    padding: 0.25em 2em;
    font-size: 1em;
    outline: none;
    &:hover {
      color: #0e2f5a;
      background: #fff;
    }
  `;

  const [Name, setName] = useState('');
  const [Org, setOrg] = useState('');
  const [Role, setRole] = useState('');
  const [Department, setDepartment] = useState('');

  useEffect(() => {
    ipc.send('retrieve-details');
    ipc.on('read-details', (event, arg) => {
      setName(arg.name);
      setOrg(arg.organization);
      setRole(arg.role);
      setDepartment(arg.department);
    });
  }, []);

  const Hover = styled.div({
    cursor: 'pointer',
  });

  const { open_modal } = props.SchedulerStore;

  return (
    <div>
      <Head screens="none" />

      <div style={{ paddingBottom: '5px', paddingTop: '10px', padding: '1em' }}>
        <Flex justifyBetween>
          <Hover
            onClick={() => {
              open_modal();
              console.log('open SchedulerStore modal');
            }}
          >
            <Clock />
          </Hover>

          <Flex column>
            <h2 style={{ textAlign: 'center' }}> {Name} </h2>
            <h5 style={{ fontWeight: 'normal', textAlign: 'center' }}> {Role} </h5>
            <Link to="performance">
              <Button>
                <Flex>
                  <FiActivity style={{ fontSize: '1.7em' }} />
                  <p style={{ fontSize: '1em', paddingLeft: '7px' }}>Performance</p>
                </Flex>
              </Button>
            </Link>
          </Flex>

          <Flex column>
            <h2> {Org} </h2>
            <h5 stle={{ textAlign: 'right', fontWeight: 'normal' }}> {Department} </h5>
          </Flex>
        </Flex>

        <br />
        <div>
          <Keep />
        </div>
      </div>
    </div>
  );
};

export default inject('NotificationStore', 'SchedulerStore')(observer(Home));
