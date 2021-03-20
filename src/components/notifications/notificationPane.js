import React from 'react';
import styled from 'styled-components';
import { inject, observer } from 'mobx-react';
import { FiCalendar } from 'react-icons/fi';
import { IoIosClipboard, IoMdAlarm, IoMdBook } from 'react-icons/io';
import Flex from 'styled-flex-component';

const Body = styled.div`
  padding: 1em;
  background-color: #3a3a3a;
  padding-left: 1em;
  color: #fff;
`;

const Hover = styled.div`
  &:hover {
    cursor: pointer;
  }
`;

const notificationPane = props => {
  const { show } = props.NotificationStore;
  return (
    <div>
      {show ? (
        <Body>
          <Flex justifyCenter>
            <div style={{ padding: '1em', width: '70%' }}>
              <Flex justifyBetween>
                <Hover>
                  <FiCalendar style={{ fontSize: '2em' }} />
                </Hover>
                <Hover>
                  <IoIosClipboard style={{ fontSize: '2em' }} />
                </Hover>

                <Hover>
                  <IoMdAlarm style={{ fontSize: '2em' }} />
                </Hover>

                <Hover>
                  <IoMdBook style={{ fontSize: '2em' }} />
                </Hover>
              </Flex>
            </div>
          </Flex>
        </Body>
      ) : null}
    </div>
  );
};

export default inject('NotificationStore')(observer(notificationPane));
