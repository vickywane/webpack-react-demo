import React from 'react';
import Flex from 'styled-flex-component';
import styled from 'styled-components';

const todoList = (props) => {
  console.log(props.todo);

  const Body = styled.div`
     padding : 1em
  `

  return (
    <Body>
      <Flex justifyBetween>
        <div>
          <ul>
            <p> {props.todo} </p>
          </ul>
        </div>

        <input type="checkbox" />
      </Flex>
    </Body>
  );
};

export default todoList;
