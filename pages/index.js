import Tweet from "../components/Tweet.js"
import TweetProps from "../components/TweetProps.js"

export default function Home() {
  return (
    <div>
      <Tweet
        verified={true}
        username="@elonmusk"
        name="Elongated Muskrat"
        profilepic="https://pbs.twimg.com/profile_images/1295975423654977537/dHw9JcrK_400x400.jpg"
        content="how's your guys' day?"
        time="12:08 AM"
        date="Jan 22, 2021"
        device="Twitter for iPhone"
        rt="2.3K" /* retweets */
        qt="420" /* quote tweets */
        likes="12K"
      />

      <div>...</div>

      <TweetProps
        verified={true}
        username="@elonmusk"
        name="Elongated Muskrat"
        profilepic="https://pbs.twimg.com/profile_images/1295975423654977537/dHw9JcrK_400x400.jpg"
        content="how's your guys' day?"
        time="12:08 AM"
        date="Jan 22, 2021"
        device="Twitter for iPhone"
        rt="2.3K" /* retweets */
        qt="420" /* quote tweets */
        likes="12K"
      />
    </div>
  )
}