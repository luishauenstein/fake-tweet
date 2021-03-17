import styled from "styled-components";
import React, { useState } from "react";
import ReactCSSTransitionReplace from "react-css-transition-replace"; // https://github.com/marnusw/react-css-transition-replace
import domtoimage from "dom-to-image"; //https://github.com/tsayen/dom-to-image

const WrapperSection = styled.section`
  max-width: 598px; //iphonex width 375px
  width: 100%;
  background-color: ${(props) => props.theme.bg};
  margin: 0px auto;
`;

const TweetScreenshotOutline = styled.div`
  border-style: solid none solid none;
  border-width: 2px;
  border-color: ${(props) => props.theme.highlight};
  overflow: hidden;
  //for screens wider than max tweet-width:
  @media screen and (min-width: 600px) {
    border-style: solid;
    border-radius: 10px;
  }
`;

const TweetScreenshotWrapper = styled.div`
  background-color: ${(props) => props.theme.bg};
`;

const TweetBox = styled.div`
  max-width: 598px; //iphonex width 375px
  background-color: ${(props) => props.theme.bg};

  margin-left: 15px;
  margin-right: 15px;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.3125;
  font-size: 15px;
  color: ${(props) => props.theme.f};
  user-select: none;
`;

const ReactionBox = styled.div`
  min-height: 10px;
`;

const ProfileInfoBox = styled.div`
  margin-bottom: 5px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ProfilePic = styled.img`
  width: 46px;
  height: 46px;
  border-radius: 50%;
  margin-right: 9px;
  object-fit: cover;
`;

const UserIdentityBox = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-bottom: 2px;
  justify-content: space-between;
  height: 36px;
  box-sizing: border-box;
  font-size: 14px;
  white-space: nowrap;
  overflow-wrap: break-word;
  overflow: hidden;
`;

const NameContainer = styled.div`
  font-weight: 700;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Name = styled.div`
  height: 19px;
  overflow: hidden;
`;

const CheckmarkSVG = styled.div`
  margin-left: 2px;
  height: 19px;
  width: 19px;
  fill: ${(props) => props.theme.highlight};
`;

const SettingsSVG = styled.div`
  height: 17.5px;
  width: 17.5px;
  margin-left: auto; /* https://stackoverflow.com/questions/33924655/position-last-flex-item-at-the-end-of-container */
  fill: ${(props) => props.theme.sf};
`;

const Username = styled.div`
  font-weight: 400;
  color: ${(props) => props.theme.sf};
`;

const ContentBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  margin-top: 9px;
  font-weight: 400;
  font-size: 21px;
  overflow-wrap: break-word;
  white-space: pre-line;
  line-height: 1.3125;
  user-select: text;
`;

const TweetInput = styled.textarea`
  background-color: transparent;
  border: none;
  border-radius: 5px;
  color: ${(props) => props.theme.f};
  font-weight: 400;
  font-size: 21px;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.3125;
  resize: none;
  outline: none;
  user-select: text;
  padding: 0px;
  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: ${(props) => props.theme.sf};
    opacity: 1; /* Firefox */
  }
`;

const DateTimeBox = styled.div`
  margin-top: 14px;
  margin-bottom: 14px;
  font-weight: 400;
  font-size: 14px;
  color: ${(props) => props.theme.sf};
`;

const DatetimeInput = styled.input`
  background-color: ${(props) => props.theme.highlight};
  border: none;
  font-weight: 700;
  font-size: 14px;
  color: ${(props) => props.theme.bg};
  line-height: 1.3125;
  max-width: 205px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  border-radius: 5px;
  max-height: 18px;
  :focus {
    outline: none;
  }
`;

const DeviceSpan = styled.span`
  color: ${(props) => props.theme.sf};
  :hover {
    cursor: pointer;
  }
`;

const Engagement = styled.div`
  border-top: 1px solid ${(props) => props.theme.lines};
  padding: 14px 5px 14px 5px;
  display: flex;
  flex-direction: row;
  overflow: hidden;

  /* font style values for "Retweets", "Quote Tweets" & "Likes" */
  color: ${(props) => props.theme.sf};
  font-weight: 400;
  font-size: 14px;
`;

const EngagementBox = styled.div`
  display: flex;
  margin-right: 18px;
  :hover {
    cursor: pointer;
  }
`;

const FatNumber = styled.span`
  color: ${(props) => props.theme.f};
  font-size: 14px;
  font-weight: 700;
  max-width: 39px;
  text-overflow: clip;
  overflow: hidden;
  margin-right: 4.1px;
`;

const EngagementInput = styled.input`
  color: ${(props) => props.theme.bg};
  font-size: 14px;
  font-weight: 700;
  background-color: ${(props) => props.theme.highlight};
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  border-radius: 5px;
  max-width: 39px;
  max-height: 18px;
  line-height: 1.3125;
  border: none;
  display: inline;
  user-select: text;
  :focus {
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  border-top: 1px solid ${(props) => props.theme.lines};
  display: flex;
  justify-content: center;
  margin-left: 15px;
  margin-right: 15px;
`;

const TwitterButton = styled.button`
  font-family: nunito, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  display: inline;
  margin-left: 5px;
  margin-right: 5px;
  margin-top: 14px;
  margin-bottom: 14px;
  display: block;
  background-color: rgb(29, 161, 242);
  color: rgb(255, 255, 255);
  padding: 10px;
  border: none;
  border-radius: 9999px;
  font-size: 15px;
  font-weight: 700;
  outline: none;
  transition: background-color 0.2s;
  &:hover {
    cursor: pointer;
  }
  &:active &:focus {
    outline: none;
  }
`;

const Tweet = (props) => {
  //TWEET TEXT
  const [tweetGenerated, generateTweet] = useState(false); //has "generate tweet" already been clicked?
  const [tweetText, setText] = useState(""); //tweet text state
  //"generate tweet button opacity"
  const [generateButtonOpacity, setgenerateButtonOpacity] = useState("50%");
  const updateText = (value) => {
    value == "" ? setgenerateButtonOpacity("50%") : setgenerateButtonOpacity("100%"); //makes button opaque if unclickable
    setText(value);
  };

  //TOGGLE DEVICE
  const deviceList = ["Twitter for iPhone", "Twitter Web App", "Twitter for Android"];
  const [deviceIndex, setDeviceIndex] = useState(0);
  const toggleDevice = () => {
    if (!tweetGenerated) {
      if (deviceIndex < 2) {
        setDeviceIndex(deviceIndex + 1);
      } else {
        setDeviceIndex(0);
      }
    }
  };

  //SET DEFAULT DATETIME (TIME -1 HOUR)
  //runs only one time on component load
  let dt = new Date();
  const defaultTime = dt.toISOString().slice(0, 16);
  dt.setHours(dt.getHours() + 1);
  const maxTime = dt.toISOString().slice(0, 16);

  //TOGGLE TIME
  const [datetimeSaved, setDatetime] = useState(defaultTime);

  //updates date + time when user selects new datetime
  const updateDatetime = (i) => {
    setDatetime(i);
    setTime(updateTime(i));
    setDate(updateDate(i));
  };

  //following two functions do not make use of built in js date manipulation due to those being unreliable

  //returns time in displayable format calculated from given datetime
  //https://stackoverflow.com/questions/8888491/how-do-you-display-javascript-datetime-in-12-hour-am-pm-format (flawed & old code, requires lots of edits)
  const updateTime = (datetime) => {
    let hours = datetime.slice(11, 13);
    let minutes = datetime.slice(14, 16);
    let ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours.toLocaleString("en-US", {
      minimumIntegerDigits: 2,
      useGrouping: false,
    });
    let strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };
  const intialTime = updateTime(defaultTime);
  const [timeSaved, setTime] = useState(intialTime);

  //returns date in displayable format calculated from given datetime
  const updateDate = (datetime) => {
    const year = datetime.slice(0, 4);
    const month = datetime.slice(5, 7);
    const day = datetime.slice(8, 10);
    const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthWritten = monthList[Number(month - 1)];
    let strDate = monthWritten + " " + day + ", " + year;
    return strDate;
  };
  const intialDate = updateDate(defaultTime);
  const [dateSaved, setDate] = useState(intialDate);

  //TOGGLE MUTABLE / IMMUTABLE
  //func checks if "generate tweet" and blocks editing if true
  const handleEditClick = (stateBoolUpdater) => {
    if (!tweetGenerated) {
      stateBoolUpdater(true);
    }
  };
  //states that decide wether a part of the tweet is editable or not
  const [timeSelectorVisible, toggleTimeSelector] = useState(false);
  const [rtSelectorVisible, toggleRTSelector] = useState(false);
  const [qtSelectorVisible, toggleQTSelector] = useState(false);
  const [likeSelectorVisible, toggleLikeSelector] = useState(false);

  //ENGAGEMENT STATES

  //inital values random number generator
  //https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
  const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  const intialRT = getRandomInt(2000, 9999).toLocaleString("de");
  const initalQT = getRandomInt(900, 2500).toLocaleString("de");
  const initialLikes = getRandomInt(100, 200) + "K";

  //state vars
  const [rtAmount, setRT] = useState(intialRT);
  const [qtAmount, setQT] = useState(initalQT);
  const [likeAmount, setLikes] = useState(initialLikes);

  //SAVE BUTTON CLICK HANDLER
  const saveButtonClick = () => {
    if (tweetText != "") {
      generateTweet(true);
      toggleTimeSelector(false);
      toggleRTSelector(false);
      toggleQTSelector(false);
      toggleLikeSelector(false);
      handleHighlighting();
    }
  };

  //HANDLE # AND @ HIGHLIGHTING (executed on saveButtonClick())
  const handleHighlighting = () => {
    const str = tweetText; //save tweetText as string
    let isHighlight = false;
    let currentPhrase = "";
    const highlightPhrases = [];
    //iterate over string to find all phrases that should be highlighted and save thme in highlightPhrases array
    for (let i = 0; i < str.length; i++) {
      if (isHighlight) {
        //check if next char is alphanumeric or not
        if (/^[a-z0-9]+$/i.test(str[i]) == false) {
          //if no, end highlighting and save currentPhrase to highlightPhrases array
          isHighlight = false;
          highlightPhrases.push(currentPhrase);
          currentPhrase = "";
          console.log(highlightPhrases);
        } else {
          //if yes, append currentPhrase string by current char
          currentPhrase += str[i];
        }
      } else {
        //check if character is # or @
        if (str[i] == "@" || str[i] == "#") {
          //if yes, start highlighting
          isHighlight = true;
          currentPhrase += str[i];
        }
      }
    }
  };

  //SCREENSHOT FUNCTIONALITY
  //https://github.com/tsayen/dom-to-image
  const downloadScreenshot = () => {
    //scales component to improve quality: https://github.com/tsayen/dom-to-image/issues/332#issuecomment-626108207
    const scale = 4;
    const node = document.getElementById("tweetScreenshotWrapper");
    const style = {
      transform: "scale(" + scale + ")",
      transformOrigin: "top left",
      width: node.offsetWidth + "px",
      height: node.offsetHeight + "px",
    };
    const param = {
      height: node.offsetHeight * scale,
      width: node.offsetWidth * scale,
      quality: 1,
      style,
    };

    domtoimage.toJpeg(node, param).then(function (dataUrl) {
      //download functionality
      var link = document.createElement("a");
      link.download = "tweet.jpeg";
      link.href = dataUrl;
      link.click();
    });
  };

  return (
    <WrapperSection>
      <TweetScreenshotOutline>
        <TweetScreenshotWrapper id="tweetScreenshotWrapper">
          <TweetBox>
            {" "}
            {/* container for whole tweet */}
            <ReactionBox /> {/* eventually later used for faking likes & retweets*/}
            <ProfileInfoBox>
              {" "}
              {/* container for profile info */}
              <ProfilePic src={props.profilePic} />
              <UserIdentityBox>
                {" "}
                {/* container for name & username */}
                <NameContainer>
                  {" "}
                  {/* container for name & checkmark SVG & settings SVG */}
                  <Name>{props.name}</Name>
                  <CheckmarkSVG>
                    {props.verified && (
                      <svg
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        aria-label="Verified account"
                        className="r-jwli3a r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"
                      >
                        <g>
                          <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                        </g>
                      </svg>
                    )}
                  </CheckmarkSVG>
                  <SettingsSVG>
                    <svg
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="r-4qtqp9 r-yyyyoo r-ip8ujx r-dnmrzs r-1p4rafz r-bnwqim r-1plcrui r-lrvibr"
                    >
                      <g>
                        <circle cx="5" cy="12" r="2" />
                        <circle cx="12" cy="12" r="2" />
                        <circle cx="19" cy="12" r="2" />
                      </g>
                    </svg>
                  </SettingsSVG>
                </NameContainer>
                <Username>{props.username}</Username>
              </UserIdentityBox>
            </ProfileInfoBox>
            <ContentBox>
              {" "}
              {/* container for tweet AND engagement metrics */}
              <Content>
                <ReactCSSTransitionReplace
                  transitionName="switch"
                  transitionEnterTimeout={300}
                  transitionLeaveTimeout={300}
                >
                  {tweetGenerated ? (
                    <span key={1}>{tweetText}</span>
                  ) : (
                    <TweetInput
                      key={2}
                      autoFocus={true}
                      placeholder="type your tweet here"
                      rows="4"
                      value={tweetText}
                      onChange={(event) => updateText(event.target.value)}
                    />
                  )}
                </ReactCSSTransitionReplace>
              </Content>
              <DateTimeBox>
                {timeSelectorVisible ? (
                  <DatetimeInput
                    key={3}
                    type="datetime-local"
                    min="2006-03-21T21:50"
                    max={maxTime}
                    value={datetimeSaved}
                    onChange={(event) => updateDatetime(event.target.value)}
                  />
                ) : (
                  <span key={4} onClick={() => handleEditClick(toggleTimeSelector)}>
                    <span>{timeSaved}</span>
                    <span> · </span>
                    <span>{dateSaved}</span>
                  </span>
                )}
                <span> · </span>
                <DeviceSpan onClick={() => toggleDevice()}>{deviceList[deviceIndex]}</DeviceSpan>
              </DateTimeBox>
              <Engagement>
                <EngagementBox onClick={() => handleEditClick(toggleRTSelector)}>
                  {" "}
                  {/* RT */}
                  {rtSelectorVisible ? (
                    <EngagementInput
                      autoFocus={true}
                      type="text"
                      maxLength="6"
                      value={rtAmount}
                      onChange={(event) => setRT(event.target.value)}
                    />
                  ) : (
                    <FatNumber>{rtAmount}</FatNumber>
                  )}
                  <span> Retweets</span>
                </EngagementBox>
                <EngagementBox onClick={() => handleEditClick(toggleQTSelector)}>
                  {" "}
                  {/* QT */}
                  {qtSelectorVisible ? (
                    <EngagementInput
                      autoFocus={true}
                      type="text"
                      maxLength="6"
                      value={qtAmount}
                      onChange={(event) => setQT(event.target.value)}
                    />
                  ) : (
                    <FatNumber>{qtAmount}</FatNumber>
                  )}
                  <span style={{ whiteSpace: "nowrap" }}> Quote Tweets</span>
                </EngagementBox>
                <EngagementBox onClick={() => handleEditClick(toggleLikeSelector)} style={{ marginRight: "0px" }}>
                  {" "}
                  {/* Likes */}
                  {likeSelectorVisible ? (
                    <EngagementInput
                      autoFocus={true}
                      type="text"
                      maxLength="6"
                      value={likeAmount}
                      onChange={(event) => setLikes(event.target.value)}
                    />
                  ) : (
                    <FatNumber>{likeAmount}</FatNumber>
                  )}
                  <span> Likes</span>
                </EngagementBox>
              </Engagement>
            </ContentBox>
          </TweetBox>
        </TweetScreenshotWrapper>
      </TweetScreenshotOutline>
      {/* "GENERATE TWEET" BUTTON" */}
      {!tweetGenerated ? (
        <ButtonContainer>
          <TwitterButton
            onClick={() => props.toggleThemeFunc()}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="rgb(255,255,255)"
              width="18px"
              height="18px"
            >
              <g>
                <path d="M0,0h24v24H0V0z" fill="none" />
              </g>
              <g>
                <g>
                  <g>
                    <path d="M20,15.31l1.9-1.9c0.78-0.78,0.78-2.05,0-2.83L20,8.69V6c0-1.1-0.9-2-2-2h-2.69l-1.9-1.9c-0.78-0.78-2.05-0.78-2.83,0 L8.69,4H6C4.9,4,4,4.9,4,6v2.69l-1.9,1.9c-0.78,0.78-0.78,2.05,0,2.83l1.9,1.9V18c0,1.1,0.9,2,2,2h2.69l1.9,1.9 c0.78,0.78,2.05,0.78,2.83,0l1.9-1.9H18c1.1,0,2-0.9,2-2V15.31z M12,18V6c3.31,0.01,6,2.69,6,6S15.31,18,12,18z" />
                  </g>
                </g>
              </g>
            </svg>
          </TwitterButton>
          <TwitterButton
            style={{
              width: "160px",
              opacity: `${generateButtonOpacity}`,
              transition: "all 0.2s",
            }}
            onClick={() => saveButtonClick()}
          >
            Generate Tweet
          </TwitterButton>
        </ButtonContainer>
      ) : (
        <ButtonContainer>
          <TwitterButton
            onClick={() => generateTweet(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="rgb(255,255,255)"
              width="18px"
              height="18px"
            >
              <path
                d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9c-2-2-5-2.4-7.4-1.3L9 6L6 9L1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"
                fill="#ffffff"
              />
            </svg>
          </TwitterButton>
          <TwitterButton onClick={() => downloadScreenshot()} style={{ width: "160px", transition: "all 0.2s" }}>
            Download as JPEG
          </TwitterButton>
        </ButtonContainer>
      )}
    </WrapperSection>
  );
};

export default Tweet;
