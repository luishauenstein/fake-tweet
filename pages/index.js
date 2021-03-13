import { ThemeProvider } from "styled-components";
import React, { useState } from 'react';
import Tweet from "../components/Tweet.js"
//import TweetProps from "../components/TweetProps.js"

const Home = () => {

  const dimMode = {
    bg: "rgb(21, 32, 43)",
    f: "rgb(255, 255, 255)",
    sf:"rgb(136, 153, 166)",
    lines: "rgb(56, 68, 77)",
    highlight: "rgb(255, 255, 255)"
  }

  const lightMode = {
    bg: "rgb(255, 255, 255)",
    f: "rgb(15, 20, 25)",
    sf: "rgb(91, 112, 131);",
    lines: "rgb(235, 238, 240)",
    highlight: "rgb(29, 161, 242)"
  }

  const darkMode = {
    bg: "rgb(15, 20, 25)",
    f: "rgb(217, 217, 217)",
    sf: "rgb(110, 118, 125)",
    lines: "rgb(47, 51, 54)",
    highlight: "rgb(217, 217, 217)"
  }

  const themes = [dimMode, darkMode, lightMode]
  const [themeIndex, setThemeIndex] = useState(0);

  const toggleTheme = () => {
    setThemeIndex(themeIndex < 2 ? themeIndex + 1 : 0);
  }

  return (
    <ThemeProvider theme={themes[themeIndex]}>
      <Tweet
        verified={true}
        username="@elonmusk"
        name="Elongated Muskrat"
        profilepic="https://pbs.twimg.com/profile_images/1364491704817098753/V22-Luf7_400x400.jpg"
        toggleThemeFunc = {toggleTheme}
      />
    </ThemeProvider>
      
  )
}

export default Home;