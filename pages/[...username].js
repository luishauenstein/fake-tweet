import styled from "styled-components";
import React from "react";
import { useRouter } from "next/router"; //https://nextjs.org/docs/api-reference/next/router
import Image from "next/image";
import Head from "next/head";

import Tweet from "../components/Tweet.js";
import SearchBox from "../components/SearchBox.js";

//https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export async function getStaticProps(context) {
  const usernameUncleaned = context.params.username[0];
  let username = usernameUncleaned.replace(/[^A-Za-z0-9_]/, "").replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, "");
  //initial values
  let verified = false;
  let profilePic = "https://abs.twimg.com/sticky/default_profile_images/default_profile_bigger.png"; //default twitter profile pic
  let name = "fetching name...";
  let isError = false;
  let revalTime = 30; //https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration

  //TWITTER API REQUEST
  //mozilla fetch() documentation: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
  const requestURL = `https://api.twitter.com/2/users/by/username/${username}?user.fields=verified,profile_image_url`;
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${process.env.TWITTER_API_BEARER_TOKEN}`); // Next.js docs about environment variables: https://nextjs.org/docs/basic-features/environment-variables
  const myRequest = new Request(requestURL, {
    method: "GET",
    headers: myHeaders,
  });

  await fetch(myRequest)
    .then((response) => response.json())
    .then((result) => {
      verified = result.data.verified;
      profilePic = result.data.profile_image_url.replace("_normal", "");
      name = result.data.name;
      username = result.data.username;
      revalTime = 3600; //increase reval time to one hour if query is successful -> reduce amount of twitter api calls
    })
    .catch((error) => {
      console.log("error", error);
      isError = true;
      name = "user not found";
      revalTime = 30;
    });

  return {
    props: {
      verified: verified,
      username: `@${username}`,
      name: name,
      profilePic: profilePic,
      error: isError,
    },
    revalidate: revalTime, //https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
  };
}

//https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export async function getStaticPaths() {
  return {
    paths: [], //no paths prerendered: https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required
    fallback: true, //https://nextjs.org/docs/basic-features/data-fetching#fallback-true
  };
}

//STYLED COMPONENTS
const ExplanationText = styled.div`
  max-width: 598px;
  font-weight: 700;
  padding: 15px 5px 15px 5px;
  text-align: center;
  line-height: 1.1;
`;

const TwitterLink = styled.a`
  color: rgb(29, 161, 242);
  :hover,
  :active {
    text-decoration: underline;
  }
`;

const OrBox = styled.div`
  font-weight: 400;
  font-size: 30px;
  line-height: 100%;
  padding-bottom: 10px;
`;

const Home = (props) => {
  //fallback that shows until page has been statically generated https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
  const router = useRouter(); //info on useRouter(): https://nextjs.org/docs/api-reference/next/router
  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>Loading page... | fake-tweets.com</title>
          <meta
            name="description"
            content="Enter a valid Twitter username to create a realistic fake tweet in under 10 seconds! Create meme tweets without a hassle!"
          />
        </Head>
        <ExplanationText
          style={{
            fontSize: "20px",
            marginTop: "15px",
            marginBottom: "15px",
          }}
        >
          Loading...
        </ExplanationText>
      </>
    );
  }

  //if user is not found or some other error happens
  if (props.error) {
    return (
      <>
        <Head>
          <title>User not found! | fake-tweet.com</title>
          <meta
            name="description"
            content="Enter a valid Twitter username to create a realistic fake tweet in under 10 seconds! Create meme tweets without a hassle!"
          />
        </Head>
        <ExplanationText style={{ paddingTop: "0px" }}>
          Yikes! Looks like {props.username} is not an active Twitter account!
        </ExplanationText>
        <Image className="errorMeme" src="/meme.jpg" width={300} height={300} />
        <style jsx global>{`
          .errorMeme {
            border-radius: 10px;
          }
        `}</style>
        <ExplanationText>Go enter another username:</ExplanationText>
        <SearchBox placeholder="Enter another username" />
        <ExplanationText
          style={{
            opacity: "40%",
            paddingBottom: "0px",
            fontWeight: "100",
            fontSize: "13px",
          }}
        >
          Note: If you're sure you've entered a valid Twitter handle & still see this error page, this service is
          probably experiencing heavy load (request limit reached). Please try again later.{" "}
        </ExplanationText>
      </>
    );
  }

  const descriptionTag = `Create a realistic fake ${props.username} tweet in under 10 seconds! Create meme tweets without a hassle! Choose custom design and enter custom engagement metrics, or stick with default values!`;
  const keywordsTag = `fake tweet generator, meme tweet generator, fake ${props.username} tweet, meme ${props.username} tweet, fake ${props.name} tweet, meme ${props.name} tweet`;
  return (
    <>
      <Head>
        <title>Create a {props.username} tweet! | fake-tweet.com</title>
        <meta name="description" content={descriptionTag} />
        {/* this "keywords" tag overwrites the _app.js keyword tag */}
        <meta name="keywords" content={keywordsTag} />
      </Head>
      <ExplanationText style={{ paddingTop: "0px" }}>
        <div>
          Enter some text and generate your custom{" "}
          {/* https://nextjs.org/docs/api-reference/next/link#if-the-child-is-a-custom-component-that-wraps-an-a-tag */}
          <TwitterLink href={`https://twitter.com/${props.username}`} target="_blank">
            {props.username}
          </TwitterLink>{" "}
          tweet.
        </div>
        <div style={{ marginTop: "15px" }}>Click on any property (time, device, engagement) to change it.</div>
        <div style={{ marginTop: "15px" }}>Click on the sun symbol to toggle between Twitter's themes.</div>
      </ExplanationText>
      <Tweet
        verified={props.verified}
        username={props.username}
        name={props.name}
        profilePic={props.profilePic}
        toggleThemeFunc={props.toggleTheme}
      />
      <OrBox>OR</OrBox>
      <SearchBox placeholder="Enter another username" />
    </>
  );
};

export default Home;
