import React, { useState } from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { FiSend, FiClock, FiArrowLeft } from 'react-icons/fi';
import List from './todo.list';
import { observer, inject } from 'mobx-react';

const todo = (props) => {
  // const {todos } = props.TodoStore.Todo

  console.log(props.TodoStore.todos.title);
  const Input = styled.input`  
            width : 23em
            height : 5.2vh
            padding-left : 15px
            border  : 0px
            border-radius : 3px
    `;

  const Form = styled.form`
            padding: '0.2em',
            border-radius: '5px',
            padding-right: '10px',
            margin-righ '15px't:, 
    `;

  const Hover = styled.div`
    &:hover {
      cursor: pointer;
    }
  `;

  const Contain = styled.div`
  padding : 0.5em
  border : 1px solid blue 
  border-radius  : 5px
  `;

  const [theTime, settheTime] = useState(false);
  // const [todo, addTodoValue] = useState('');

  // const handleTodo = (event) => {
  //   const { value } = event.target;

  //   console.log(value);
  //   addTodoValue(value)
  // };
  return (
    <div>
      {props.add ? (
        <div>
          {!theTime ? (
            <Flex justifyCenter>
              <Form>
                <Flex>
                  <Contain>
                    <Flex>
                      <Input
                        placeholder="Add Todos"
                        type="text"
                        ref={props.TodoStore.todoInput}
                      />
                      <Hover
                        style={{ paddingTop: '10px', paddingLeft: '5px' }}
                        onClick={() => {
                          settheTime(true);
                        }}
                      >
                        <FiClock style={{ fontSize: '1.7em' }} />
                      </Hover>
                    </Flex>
                  </Contain>

                  <div style={{ paddingLeft: '10px', paddingTop: '20px' }}>
                    <Hover
                      onClick={() => {
                        alert(props.TodoStore.todoInput);
                      }}
                    >
                      <FiSend style={{ fontSize: '2em' }} />
                    </Hover>
                  </div>
                </Flex>
              </Form>
            </Flex>
          ) : (
            <div style={{ padding: '1em' }}>
              <Flex justifyBetween>
                <Hover
                  onClick={() => {
                    settheTime(false);
                  }}
                >
                  <FiArrowLeft style={{ fontSize: '1.7em' }} />
                </Hover>
                <Flex>
                  <p> Remind me in -------------- </p>
                </Flex>

                <p>Priority</p>
              </Flex>
            </div>
          )}
        </div>
      ) : null}

      <div>
        {props.TodoStore.todos.map((index, todo) => (
          <List todo={todo} key={index} />
        ))}
      </div>
    </div>
  );
};

export default inject('TodoStore')(observer(todo));
