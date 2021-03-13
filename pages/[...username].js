import { ThemeProvider } from "styled-components";
import React, { useState } from "react";
import Tweet from "../components/Tweet.js";
import { useRouter } from "next/router"; //https://nextjs.org/docs/api-reference/next/router

export async function getStaticProps(context) {
  const username = `@${context.params.username[0]}`;
  const verified = false;
  const name = "Pimmel Berger";
  const profilePic = "https://pbs.twimg.com/profile_images/1364491704817098753/V22-Luf7_400x400.jpg";

  return {
    props: {
      verified: verified,
      username: username,
      name: name,
      profilePic: profilePic,
    },
    revalidate: 30, //https://nextjs.org/docs/basic-features/data-fetching#incremental-static-regeneration
  };
}

//https://nextjs.org/docs/basic-features/data-fetching#getstaticpaths-static-generation
export async function getStaticPaths() {
  return {
    paths: [], //no paths prerendered: https://nextjs.org/docs/basic-features/data-fetching#the-paths-key-required
    fallback: true, //https://nextjs.org/docs/basic-features/data-fetching#fallback-true
  };
}

const Home = (props) => {
  //THEMES:
  const dimMode = {
    bg: "rgb(21, 32, 43)",
    f: "rgb(255, 255, 255)",
    sf: "rgb(136, 153, 166)",
    lines: "rgb(56, 68, 77)",
    highlight: "rgb(255, 255, 255)",
  };

  const lightMode = {
    bg: "rgb(255, 255, 255)",
    f: "rgb(15, 20, 25)",
    sf: "rgb(91, 112, 131);",
    lines: "rgb(235, 238, 240)",
    highlight: "rgb(29, 161, 242)",
  };

  const darkMode = {
    bg: "rgb(15, 20, 25)",
    f: "rgb(217, 217, 217)",
    sf: "rgb(110, 118, 125)",
    lines: "rgb(47, 51, 54)",
    highlight: "rgb(217, 217, 217)",
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
      <Tweet
        verified={props.verified}
        username={props.username}
        name={props.name}
        profilePic={props.profilePic}
        toggleThemeFunc={toggleTheme}
      />
    </ThemeProvider>
  );
};

export default Home;
