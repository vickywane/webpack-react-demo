import React from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Link } from 'react-router-dom';
import { Stream } from 'react-streams';
import { of, pipe } from 'rxjs';
import { delay, startWith } from 'rxjs/operators';

// import img from '../../../assets/images/worker.jpg';
import { Auth } from '../../state/models/';
import { observer } from 'mobx-react';

const Login = () => {
  const auth = Auth.create({}); // experimental to try Onptach
  const Div = styled.div`
    padding: 1em;
  `;
  // background-image: url(${img});
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
    &:hover {
      color: #0e2f5a;
      background: #fff;
    }
  `;

  const Help = styled.button`
    background: #0e2f5a;
    text-align: right;
    border-radius: 3px;
    height: 40px;
    border: 1px solid #0e2f5a;
    color: #fff;
    margin: 0 3em;
    padding: 0.25em 3em;
    font-size: 1em;
    &:hover {
      color: #0e2f5a;
      background: #fff;
    }
  `;

  return (
    <Div>
      <Flex justifyCenter>
        <form>
          <br />
          <br />
          <br />
          <input
            type="text"
            name="code"
            placeholder=" 0000-0000-0000 "
            style={{
              width: '15em',
              height: '40px',
              borderRadius: '3px',
              fontSize: '20px',
              textAlign: 'center',
              border: '1px solid blue',
              padding: '5px',
            }}
          />
          <br />
          <br />
          <div
            style={{
              textAlign: 'center',
              margin: '2%',
            }}
          >
            <Button
              onClick={() => {
                auth.login_user();

                console.log(auth.is_loggedIn);
              }}
            >
              Login
            </Button>
          </div>
          <br />
          <br />
          <br />
        </form>
      </Flex>
      <hr />

      <div>
        <Flex justifyBetween>
          <div style={{ paddingTop: '10px', color: '#0e2f5a;' }}>
            <a href="/"> Troubleshoot </a>
          </div>
          <Help> Create Team </Help>
        </Flex>
      </div>
    </Div>
  );
};

const startWithAndDelay = (message, time) =>
  pipe(
    delay(time),
    startWith({ message }),
  );

const message$ = of({ any: <Login /> });

// const Loader = () => {
//   return <ProgressCircle color='red' size={100} style={{ textAlign: 'center' }} />;
// };

const main = () => (
  <div>
    <Stream source={message$} pipe={startWithAndDelay('loading now ', 2000)}>
      {({ any }) => <div>{any}</div>}
    </Stream>
  </div>
);

export default observer(main);
