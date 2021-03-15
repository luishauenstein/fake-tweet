import styled, { ThemeProvider } from "styled-components";
import React, { useState } from "react";
import { useRouter } from "next/router"; //https://nextjs.org/docs/api-reference/next/router

import Tweet from "../components/Tweet.js";
import SearchBox from "../components/SearchBox.js";

//https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
export async function getStaticProps(context) {
  const username = context.params.username[0];
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
      revalTime = 3600; //increase reval time to one hour if query is successful -> reduce amount of twitter api calls
    })
    .catch((error) => {
      console.log("error", error);
      isError = true;
      name = "user not found";
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
const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  background-color: ${(props) => props.theme.bg};
  color: ${(props) => props.theme.f};
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderBox = styled.div`
  max-width: 598px;
  font-weight: 700;
  padding: 15px 5px 15px 5px;
  text-align: center;
  line-height: 1;
`;

const OrBox = styled.div`
  font-weight: 400;
  font-size: 30px;
  line-height: 100%; //a bit of a sloppy solution, can be changed later if it causes problems
  padding-bottom: 5px;
`;

const Home = (props) => {
  //THEMES:
  const dimMode = {
    //theme index 0
    bg: "rgb(21, 32, 43)", //background
    f: "rgb(255, 255, 255)", //font
    sf: "rgb(115,131,143)", //small font
    lines: "rgb(56, 68, 77)", //lines
    highlight: "rgb(255, 255, 255)", //highlight
    searchBar: "rgb(37,51,65)", //search bar
  };

  const lightMode = {
    //theme index 1
    bg: "rgb(255, 255, 255)",
    f: "rgb(15, 20, 25)",
    sf: "rgb(91, 112, 131)",
    lines: "rgb(235, 238, 240)",
    highlight: "rgb(29, 161, 242)",
    searchBar: "rgb(235, 238, 240)",
  };

  const darkMode = {
    //theme index 2
    bg: "rgb(15, 20, 25)",
    f: "rgb(217, 217, 217)",
    sf: "rgb(110, 118, 125)",
    lines: "rgb(47, 51, 54)",
    highlight: "rgb(217, 217, 217)",
    searchBar: "rgb(32,35,39)",
  };

  //THEME FUNCTIONALITY
  const themes = [dimMode, darkMode, lightMode];
  const [themeIndex, setThemeIndex] = useState(0);

  const toggleTheme = () => {
    setThemeIndex(themeIndex < 2 ? themeIndex + 1 : 0);
  };

  //fallback that shows until page has been statically generated https://nextjs.org/docs/basic-features/data-fetching#fallback-pages
  const router = useRouter(); //info on useRouter(): https://nextjs.org/docs/api-reference/next/router
  if (router.isFallback) {
    return <p>Fallback...</p>;
  }

  return (
    <ThemeProvider theme={themes[themeIndex]}>
      {/* PageWrapper: bg color & container, see exact properties in styled component css above */}
      <PageWrapper>
        <HeaderBox>
          <div>Enter some text and generate your custom @scooterbraun Tweet.</div>
          <div style={{ marginTop: "15px" }}>Click on any property (time, device, engagement) to change it.</div>
        </HeaderBox>
        <Tweet
          verified={props.verified}
          username={props.username}
          name={props.name}
          profilePic={props.profilePic}
          toggleThemeFunc={toggleTheme}
        />
        <OrBox>OR</OrBox>
        <SearchBox placeholder="Enter another username" />
      </PageWrapper>
    </ThemeProvider>
  );
};

export default Home;
