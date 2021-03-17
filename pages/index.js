import React from "react";
import styled from "styled-components";

import SearchBox from "../components/SearchBox";

const Home = () => {
  const ExplanationText = styled.div`
    max-width: 598px;
    font-weight: 700;
    padding: 0px 5px 15px 5px;
    text-align: center;
    line-height: 1;
  `;

  const ListElement = styled.li`
    margin-top: 5px;
  `;

  return (
    <>
      <ExplanationText style={{ fontSize: "20px" }}>Create fake Tweet screenshots in under 10 seconds!</ExplanationText>
      <ExplanationText>Just enter a valid Twitter handle below:</ExplanationText>
      <SearchBox placeholder="Enter a valid Twitter @username" />
      <ExplanationText style={{ textAlign: "left" }}>
        <ul>
          <ListElement>All Twitter themes supported</ListElement>
          <ListElement>No need to upload profile photos on your own</ListElement>
          <ListElement>See a preview before downloading a realistic high-res screenshot</ListElement>
          <ListElement>Enter custom Like, Retweet & Quote Tweet numbers or stick with random ones</ListElement>
          <ListElement>Choose device & time or stick with default choices</ListElement>
        </ul>
      </ExplanationText>
    </>
  );
};

export default Home;
