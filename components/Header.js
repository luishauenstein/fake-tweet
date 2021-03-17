import styled from "styled-components";

const HeaderBar = styled.div`
  background-color: rgb(29, 161, 242);
  max-width: 598px;
  width: 100%;
  padding: 5px 5px 5px 10px;
  margin-bottom: 15px;
  @media screen and (min-width: 600px) {
    border-radius: 0px 0px 10px 10px;
  }
`;

const HeaderText = styled.h1`
  color: rgb(255, 255, 255);
  margin: 0;
  line-height: 100%;
  font-size: 20px;
  font-weight: normal;
`;

const Header = () => {
  return (
    <HeaderBar>
      <HeaderText>fake-tweet.com</HeaderText>
    </HeaderBar>
  );
};

export default Header;
