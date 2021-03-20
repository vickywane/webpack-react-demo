import React, { useState } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { Link } from 'react-router-dom';
import { IoMdVideocam, IoIosCall } from 'react-icons/io';
import { Modal } from 'react-bootstrap';
import { FiX } from 'react-icons/fi';

import Colabs from './colabModal';

const Header = () => {
  const Header = styled.div` 
    background:  #cdd  
    padding: 0.2em 
    padding-right: 10px 
  `;

  const Collaborate = styled.div`
    background: #0e2f5a;
    text-align: right;
    border-radius: 3px;
    border: 1px solid #0e2f5a;
    color: #fff;
    height : 33px
    margin: 0 1em;
    padding: 0.10em 1.2em;
    font-size: 0.9em;
    &:hover {
      color: #0e2f5a;
      background: #fff;
    }
  `;

  const Title = styled.p`
    font-size : 1.1em
    padding-top  :  5px
    padding-left  :  10px
  `;

  const Actions = styled.div`  
  background:  #000
  color:  #fff
  padding: 0.4em 
  `;

  const [Colab, setColab] = useState(false);

  const Head = styled.div`
    padding: 0.5em
    background : #000
    color : #fff
  `;

  const Avatar = styled.circle`
    fill  : grey
    stroke  : black
    stroke-width  : 5px 
    fill-opacity  : 0.5
  &:hover {
      cursor: pointer;
    }
  `;

  return (
    <div>
      <Modal
        style={{ paddingTop: '4%' }}
        show={Colab}
        onHide={() => {
          setColab(false);
        }}
      >
        <Head 
        >
          <Flex justifyBetween>
            <p style={{ paddingLeft: '15px' }}> Collaborate </p>

            <div
              onClick={() => {
                setColab(false);
              }}
            >
              <FiX style={{ fontSize: '1.5em' }} />
            </div>
          </Flex>
        </Head>

        <Colabs />
      </Modal>

      <Header>
        <Flex justifyBetween>
          <Title> CodeSand-Box </Title>

          <Flex>
            <Collaborate onClick={() => setColab(true)}>
              Collaborate
            </Collaborate>

            <Avatar>
              <p> V </p>
            </Avatar>
          </Flex>
        </Flex>
      </Header>

      <Actions>
        <Flex justifyBetween>
          <div>Some shit here 1</div>
          <div>
            <h6> Sandbox name / project name </h6>
          </div>
          <div>Some shit here 3</div>
        </Flex>
      </Actions>
    </div>
  );
};

export default Header;
