import styled from 'styled-components'

const TweetBox = styled.div`
  max-width: 375px;
  background-color: rgb(21,32,43);

  padding-left: 15px;
  padding-right: 15px;
  display:flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  line-height: 1.3125;
  font-size: 15px;
  color: rgb(255, 255, 255);
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
        `;

        const SettingsSVG = styled.div`
          height: 17.5px;
          width: 17.5px;
          margin-left: auto; /* https://stackoverflow.com/questions/33924655/position-last-flex-item-at-the-end-of-container */
        `;

      const Username = styled.div`
        font-weight: 400;
        color: rgb(136, 153, 166);
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
    `;

    const DateTimeBox = styled.div`
      margin-top: 14px;
      margin-bottom: 14px;
      font-weight: 400;
      font-size: 14px;
      color: rgb(136, 153, 166);
    `;

    const Engagement = styled.div`
      border-top: 1px solid rgb(56, 68, 77);
      padding: 14px 5px 14px 5px;
      display: flex;
      flex-direction: row;
      overflow:hidden;

      /* font style values for "Retweets", "Quote Tweets" & "Likes" */
      color: rgb(136, 153, 166);
      font-weight: 400;
      font-size: 14px;
    `;

      const EngagementBox = styled.div`
        margin-right: 18px;
      `;

        const FatNumber = styled.span`
          color: rgb(255, 255, 255);
          font-size: 14px;
          font-weight: 700;
        `;

const TweetProps = (props) => {
  return(
    <TweetBox> {/* container for whole tweet */}
      <ReactionBox /> {/* eventually later used for faking likes & retweets*/}
      <ProfileInfoBox> {/* container for profile info */}
        <ProfilePic src={props.profilepic}/>
        <UserIdentityBox> {/* container for name & username */}
          <NameContainer> {/* container for name & checkmark SVG & settings SVG */}
            <Name>{props.name}</Name>
            <CheckmarkSVG>
              { props.verified && <svg xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" aria-label="Verified account" className="r-jwli3a r-4qtqp9 r-yyyyoo r-1xvli5t r-9cviqr r-dnmrzs r-bnwqim r-1plcrui r-lrvibr"><g fill="#FFFFFF"><path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" fill="#FFFFFF" /></g></svg> }
            </CheckmarkSVG>
            <SettingsSVG>
              <svg xmlnsXlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="r-4qtqp9 r-yyyyoo r-ip8ujx r-dnmrzs r-1p4rafz r-bnwqim r-1plcrui r-lrvibr"><g fill="#8899A6"><circle cx="5" cy="12" r="2" fill="#8899A6" /><circle cx="12" cy="12" r="2" fill="#8899A6" /><circle cx="19" cy="12" r="2" fill="#8899A6" /></g></svg>
            </SettingsSVG>
          </NameContainer>
          <Username>{props.username}</Username>
        </UserIdentityBox>
      </ProfileInfoBox>
      <ContentBox> {/* container for tweet AND engagement metrics */}
        <Content>{props.content}</Content>
        <DateTimeBox>
          <span>{props.time}</span>
          <span> · </span>
          <span>{props.date}</span>
          <span> · </span>
          <span>{props.device}</span>
        </DateTimeBox>
        <Engagement>
          <EngagementBox> {/* RT */}
            <FatNumber>{props.rt}</FatNumber>
            <span> Retweets</span>
          </EngagementBox>
          <EngagementBox> {/* QT */}
            <FatNumber>{props.qt}</FatNumber>
            <span> Quote Tweets</span>
          </EngagementBox>
          <EngagementBox> {/* Likes */}
            <FatNumber>{props.likes}</FatNumber>
            <span> Likes</span>
          </EngagementBox>
        </Engagement>
      </ContentBox>
    </TweetBox>
  );
}

export default TweetProps;
