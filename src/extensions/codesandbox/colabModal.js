import React from 'react';
import styled from 'styled-components';
import Flex from 'styled-flex-component';
import { FiSearch } from 'react-icons/fi';

const colabModal = () => {
  const Div = styled.div`padding: 1em;`;

  const Text = styled.p`padding: 1em;`;

  const Clipboard = styled.div`
  height : 5.5vh
  border : 1px solid black
  border-radius : 2px
  padding : 1em
  `;

  const Hover = styled.div`
    padding-left  : 20px
    &:hover {
      cursor: pointer;
    }
  `;

  const Search = styled.div`
      padding : 0.3em
      height   : 6.2vh
      width  : 25em
      border: 1px solid  #361f94  
`;

  return (
    <Div>
      <Flex justifyCenter>
        <Text>
          Invite others to watch or assist in writing your codes.
          <br />Others participants can view and edit files your files.
        </Text>
      </Flex>

      <div>
        <label> Share Link </label>
        <Flex justifyCenter>
          <Flex justifyBetween>
            <Clipboard>
              <Flex>
                w.2kye8g8ugfne7fii f 6tr34r8wt7s1w02he g8
                <Hover>
                  <p> copy </p>
                </Hover>
              </Flex>
            </Clipboard>
          </Flex>
        </Flex>

        <br />

        <form>
          <label> Invite by Name </label>
          <Flex justifyCenter>
            <Search>
              <Flex>
                <input
                  style={{
                    fontSize: '0.9em',
                    height: '4.5vh',
                    width: '23em',
                    border: '0',
                  }}
                  type="text"
                  placeholder=" Search Team mate "
                />
                <Hover>
                  <FiSearch style={{ fontSize: '1.6em' }} />
                </Hover>
              </Flex>
            </Search>
          </Flex>
        </form>
      </div>
    </Div>
  );
};

export default colabModal;
