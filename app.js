import { tweetsData } from './data.js';

function getFeedHtml(tweets) {
    let feedHtml = ``;
    tweets.forEach((tweet) => {
        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots" data-comment="${tweet.uuid}"></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart" data-like="${tweet.uuid}"></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet" data-retweet="${tweet.uuid}"></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
        </div>`; 
    });
    return feedHtml;
}

function render() {
    const tweetInput = document.getElementById('tweet-input');
    const tweetBtn = document.getElementById('tweet-btn');
    tweetBtn.addEventListener('click', () => {
        console.log(tweetInput.value);
    });
    document.getElementById('feed').innerHTML = getFeedHtml(tweetsData);
    document.addEventListener('click', (e) => {
        if (e.target.dataset.like) {
            console.log(e.target.dataset.like);
        }
    });
}

render();