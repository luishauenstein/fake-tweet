import React, { useState } from "react";
import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: flex-row;
  background-color: ${(props) => props.theme.lines};
  height: 40px;
  box-sizing: border-box;
  border: none;
  border-radius: 9999px;
  max-width: 602px;
  width: calc(100% - 30px);
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
  color: ${(props) => props.theme.sf};
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

  return (
    <FormContainer>
      <SVGContainer>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <g fill="rgb(91, 112, 131)">
            <path
              d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
              fill="rgb(91, 112, 131)"
            />
          </g>
        </svg>
      </SVGContainer>
      <form style={{ width: "100%" }}>
        <SearchUserInput
          type="text"
          placeholder={props.placeholder}
          value={currentInput}
          onChange={(event) => setInput(event.target.value)}
        />
      </form>
    </FormContainer>
  );
};

export default SearchBox;
