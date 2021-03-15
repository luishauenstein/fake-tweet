import React, { useState } from "react";
import styled, { withTheme } from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: flex-row;
  background-color: ${(props) => props.theme.searchBar};
  height: 40px;
  box-sizing: border-box;
  border: 1px solid transparent;
  border-radius: 9999px;
  max-width: 602px;
  width: calc(100% - 30px);
  overflow: hidden;
  :focus-within {
    border: 1px solid rgb(29, 161, 242);
    background-color: ${(props) => props.theme.bg};
  }
`;

const SVGContainer = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchUserInput = styled.input`
  height: 40px;
  width: 100%;
  background: transparent;
  border: none;
  font-size: 15px;
  color: ${(props) => props.theme.f};
  ::placeholder {
    opacity: 1;
    color: ${(props) => props.theme.sf};
  }
  :focus {
    outline: none;
  }
`;

const SearchBox = (props) => {
  const [currentInput, setInput] = useState("");

  //changing user icon color on focus and unfocus
  //https://reactjs.org/docs/events.html#focus-events
  const [iconColor, setIconColor] = useState(props.theme.sf);
  const handleFocus = () => {
    setIconColor("rgb(29, 161, 242)"); //twitter blue
  };
  const handleBlur = () => {
    setIconColor(props.theme.sf);
  };

  return (
    <FormContainer>
      <SVGContainer>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" height="24px">
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            fill={iconColor}
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"
          />
        </svg>
      </SVGContainer>
      <form style={{ width: "100%" }}>
        <SearchUserInput
          type="text"
          placeholder={props.placeholder}
          value={currentInput}
          onChange={(event) => setInput(event.target.value)}
          //https://reactjs.org/docs/events.html#focus-events
          onFocus={() => handleFocus()}
          onBlur={() => handleBlur()}
        />
      </form>
    </FormContainer>
  );
};

export default withTheme(SearchBox); // https://styled-components.com/docs/advanced#via-withtheme-higherorder-component
