import React from "react";
import styled from "styled-components";
import Head from "next/head";

import SearchBox from "../components/SearchBox";

const Home = () => {
  const ExplanationText = styled.div`
    max-width: 598px;
    font-weight: 700;
    padding: 0px 5px 15px 5px;
    text-align: center;
    line-height: 1.1;
  `;

  const ListElement = styled.li`
    margin-top: 13px;
    font-weight: 500;
  `;

  return (
    <>
      <Head>
        <title>fake-tweet.com | Generate fake tweets in less than 10 seconds!</title>
        <meta
          name="description"
          content="Enter a valid Twitter username to create a realistic fake tweet in under 10 seconds! Create meme tweets without a hassle!"
        />
      </Head>
      <ExplanationText style={{ fontSize: "20px" }}>
        Create fake tweet screenshots in less than 10 seconds!
      </ExplanationText>
      <ExplanationText style={{ marginBottom: "30px" }}>Just enter a valid Twitter handle below:</ExplanationText>
      <SearchBox placeholder="Enter a valid Twitter @username" />
      <ExplanationText style={{ textAlign: "left", padding: "0px", marginTop: "30px" }}>
        <ul style={{ marginBottom: "0px", paddingLeft: "30px", paddingRight: "12px" }}>
          <ListElement>All Twitter themes supported</ListElement>
          <ListElement>No need to upload profile photos on your own</ListElement>
          <ListElement>See a preview before downloading a realistic high-res screenshot</ListElement>
          <ListElement>Enter custom like, retweet & quote tweet numbers or stick with random ones</ListElement>
          <ListElement>Choose device & time or stick with default choices</ListElement>
          <ListElement>@mention and #hashtag highlighting</ListElement>
        </ul>
      </ExplanationText>
    </>
  );
};

export default Home;
