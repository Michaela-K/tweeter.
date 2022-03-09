/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(()=> {

   //to prevent application vulnerability
   const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

   //no error
   $(".errors").slideUp(10).text("");

 const createTweetElement = (tweetData) => {
   let $newTweet = $(`
      <article class="tweet header">
        <div class="headerContainer">
          <div class="iconAndPara">
            <p class="pImg">
            <img class="user-img" src="${escape(
                tweetData.user.avatars
            )}" aria-hidden="true"></img>
              ${escape(tweetData.user.name)}
            </p>
            </div>
          <p class="at">${escape(tweetData.user.handle)}</p>
        </div>
        <p class="quote">
        ${escape(tweetData.content.text)}
        </p>
        <footer class="footer">
          <div class="iconsAndDate">
            <time class ="timeago" datetime="2008-07-17T09:24:17Z">${escape(timeago.format(tweetData.created_at))}</time>
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

   const renderTweets = function (tweets) {
    $(".tweetsContainer").html("");
       // loops through tweets
       for (const tweet of tweets) {
         // calls createTweetElement for each tweet
         let $tweet = createTweetElement(tweet);
         // takes return value and appends it to the tweets container
       $(".tweetsContainer").prepend($tweet);
     }
   };

    //form submission
    let $form = $(".tweetForm");
    $form.on("submit", function (event) {
    event.preventDefault();
    console.log("Button clicked");
  
    //validation
    if ($form.children("textarea").val() === "") {
      $(".errors").slideDown(400).text("Tweet field cannot be empty");
      return $(".errors").delay(10000).slideUp(200);
    }
    if ($form.children("textarea").val().length > 140) {
      $(".errors").slideDown(400).text("Character limit exceeded");
      return $(".errors").delay(5000).slideUp(200);
    }


  //submit tweet to database
  let $formData = $form.serialize();  //turns a set of form data into a query string
  $.ajax({
    url: "/tweets",
    type: "POST",
    data: $formData //serialized data should be sent to the server in the data field of the AJAX POST request.
  })
    .then(function (tweets) {
      loadTweets(tweets);
    })
    .catch((err) => {
      console.log(" formData Error: ", err);
      console.log("formData Error", err.message);
    });
    if ($form.children("textarea").val().length > 0) {
      $("#tweet-text").val("");
    }
  });

    const loadTweets = function () {
      $.ajax({
        url: "/tweets",
        method: "GET"
      })
        .then(function (tweets) {
          renderTweets(tweets); 
        })
        .catch((err) => {
          console.log("loadTweets Error: ", err);
          console.log("loadTweets Error: ",err.message);
        });
    };
    loadTweets();

});
