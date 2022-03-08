/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(()=> {

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
        "handle": "@SirIsaac"
      },
    "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
    "created_at": 1461116232227
 }

 
 const createTweetElement = (tweetData) => {
  let $newTweet = $(`
      <article class="tweet header">
        <div class="headerContainer">
          <div class="iconAndPara">
            <p class="pImg">
            <img class="user-img" src="${
                tweetData.user.avatars
              }" aria-hidden="true"></img>
              ${tweetData.user.name}
            </p>
            </div>
          <p class="at">${tweetData.user.handle}</p>
        </div>
        <p class="quote">
        ${tweetData.content.text}
        </p>
        <footer class="footer">
          <div class="iconsAndDate">
            <time class ="timeago" datetime="2008-07-17T09:24:17Z">${
              tweetData.created_at
            }</time>
            <div class="iconContainer">
              <i class="fa fa-flag" aria-hidden="true"></i>
              <i class="fa fa-retweet" aria-hidden="true"></i>
              <i class="fa fa-heart" aria-hidden="true"></i>
            </div>
          </div>
        </footer>
      </article>
    `);

    return $newTweet;
};

const $tweet = createTweetElement(tweetData);
$('.tweetsContainer').append($tweet);




});
