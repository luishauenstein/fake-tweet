import styled from "styled-components";

const Container = styled.div`
  margin-top: 15px;
  margin-bottom: 5px;
  font-size: 15px;
  font-weight: 300;
  color: ${(props) => props.theme.sf};
  //opacity: 70%;
  max-width: 600px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-top: 1px solid ${(props) => props.theme.lines};
  padding-top: 4px;
  padding-left: 15px;
  padding-right: 15px;
  @media screen and (max-width: 494px) {
    //494px is where line would break --> after line break center boxes
    justify-content: space-around;
  }
`;

const Link = styled.a`
  color: rgb(29, 161, 242);
  :hover,
  :active {
    text-decoration: underline;
  }
`;

const Footer = (props) => {
  return (
    <Container>
      <div>
        Created with love in 2021 by{" "}
        <Link href="https://twitter.com/luishauenstein" target="_blank">
          @luishauenstein
        </Link>
      </div>
      <div style={{ marginLeft: "30px" }}>
        <Link href="https://luishauenstein.com" target="_blank">
          luishauenstein.com
        </Link>
      </div>
    </Container>
  );
};

export default Footer;
