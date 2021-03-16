import styled, { ThemeProvider } from "styled-components";
import React, { useState } from "react";

import "../styles/globals.css";

const PageWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* bgcolor and color set in component props (so themes can be used) */
`;

const MyApp = ({ Component, pageProps }) => {
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

  return (
    <ThemeProvider theme={themes[themeIndex]}>
      {/* PageWrapper: bg color & container, see exact properties in styled component css above */}
      <PageWrapper
        style={{
          color: `${themes[themeIndex].f}`,
          backgroundColor: `${themes[themeIndex].bg}`,
        }}
      >
        <Component {...pageProps} toggleTheme={toggleTheme} />
      </PageWrapper>
    </ThemeProvider>
  );
};

export default MyApp;
