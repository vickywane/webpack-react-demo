import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Formik } from 'formik';

import { ApolloProvider, Mutation } from 'react-apollo';
import { Provider, inject, observer } from 'mobx-react';

import { AuthStore } from './state/stores/index';
import client from './data/config';
import { Login } from './data/mutations';

const App = props => {
  const Header = styled.div`
    background: #3a3a3a;
    color: #fff;
    padding: 7.5px
    text-align: center;
  `;

  const Body = styled.div`
    padding: 1em;
  `;

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

  const Title = styled.h5`
    font-size: 20px
    font-weight: normal
;`;

  const Input = styled.input({
    height: '10vh',
    width: '25em',
    paddingLeft: '10px',
    border: '1px solid blue',
    borderRadius: '5px',
    fontSize: '17px',
    textAlign: 'center',
    backgroundColor: 'transparent',
  });

  const { AuthUser } = props.AuthStore;
  return (
    <div>
      <Header style={{ boxShadow: '0px 2px 4px grey' }}>
        <Title> Remotify </Title>
      </Header>

      <Flex justifyCenter>
        <br />

        <Mutation mutation={Login}>
          {loginOrganization => (
            <Formik
              initialValues={{ password: '', name: '', email: '' }}
              onSubmit={(values, { setSubmitting }) => {
                addMail(values.email);
              }}
            >
              {({ isSubmitting, handleChange, handleBlur, values, errors }) => (
                <Body>
                  <div>
                    <label htmlFor="name" />
                    <Input
                      id="name"
                      placeholder="Enter Name"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>

                  <br />

                  <div>
                    <label htmlFor="email" />
                    <Input
                      id="email"
                      placeholder="Enter Email"
                      type="text"
                      onC
                      hange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
                    />
                  </div>

                  <br />

                  <div>
                    <label htmlFor="password" />
                    <Input
                      id="password"
                      placeholder="Enter Pin"
                      type="password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </div>

                  <br />

                  <div>
                    <Flex justifyCenter>
                      <Button
                        onClick={() => {
                          AuthUser();

                          loginOrganization({
                            variables: {
                              name: values.name,
                              email: values.email,
                              password: values.password,
                            },
                          });
                        }}
                      >
                        Login
                      </Button>
                    </Flex>
                  </div>
                  <br />
                  <Body>
                    <hr />
                    <Flex justifyBetween>
                      <p> Forgot Password </p> <p> Forgot Password </p>
                    </Flex>
                  </Body>
                </Body>
              )}
            </Formik>
          )}
        </Mutation>
      </Flex>
    </div>
  );
};

const Auth = inject('AuthStore')(observer(App));

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider AuthStore={AuthStore}>
      <Auth />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root'),
);
