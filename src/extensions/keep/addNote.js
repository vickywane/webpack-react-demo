import React, { useState } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { FiPlus, FiX, FiClock } from 'react-icons/fi';

const addNote = () => {
  // some app-states
  const [note, setNote] = useState(false);

  const Div = styled.div({
    maxWidth: '50%',
    padding: '0.5em',
  });

  const InputBox = styled.div({
    height: '6.5vh',
    width: '30em',
    padding: '0.1em',
    background: '#fff',
    borderRadius: '10px',
  });

  const Input = styled.input({
    height: '6vh',
    width: '21em',
    padding: '0.5em',
    borderWidth: '0px',
    borderRadius: '10px',
  });

  const Head = styled.div`
    background : black
    padding : 0.5em
    color : white
    padding-bottom : 10px
    padding-left : 15px
    padding-right : 15px
    height  : 10vh
    border-radius : 20px
  `;

  const List = styled.div`
  padding : 0.5em
  border  : 1px solid black
  border-radius  : 10px
  `;

  const Text = styled.p`
    color: black;
  `;

  const Hover = styled.div({
    cursor: 'pointer',
  });

  const Time = styled.div`
    padding: 0.2em
    text-align: right
    color : grey
    `;

  const list = [{ name: 'Buy coffee' }, { name: 'Complete Reading GCP docs' }];

  return (
    <Div>
      <Head style={{ boxShadow: '0px 2px 3px grey' }}>
        {note ? (
          <InputBox>
            <Flex justifyBetween>
              <Input placeholder="Add Note" />

              <Hover
                onClick={() => {
                  setNote(false);
                }}
              >
                <FiX
                  style={{
                    fontSize: '1.4em',
                    color: '#000',
                  }}
                />
              </Hover>
            </Flex>
          </InputBox>
        ) : (
          <div>
            <Flex justifyBetween>
              <p> Google Keep </p>
              <Hover
                onClick={() => {
                  setNote(true);
                }}
              >
                <FiPlus style={{ fontSize: '1.7em' }} />
              </Hover>
            </Flex>
            <p
              style={{
                textAlign: 'center',
                color: 'white',
              }}
            >
              17 unread
            </p>
          </div>
        )}
      </Head>
      <br />
      <List>
        {list.map(({ name }) => (
          <div style={{ margin: '0.1em' }}>
            <Text> {name} </Text>
            <Time>
              <Flex>
                <Hover style={{ paddingRight: '5px' }}>
                  <FiClock style={{ fontSize: '1.3em' }} />
                </Hover>
                <p> Tomorrow , 5:00am </p>
              </Flex>
            </Time>
          </div>
        ))}
      </List>
    </Div>
  );
};

export default addNote;
