import { tweetsData } from './data.js';

const tweetInput = document.getElementById('tweet-input');
const tweetBtn = document.getElementById('tweet-btn');

document.addEventListener('click', (e) => {
    if (e.target.dataset.comment) {
        console.log(e.target.dataset.comment);
    } else if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like);
    } else if (e.target.dataset.retweet){
        console.log(e.target.dataset.retweet);
    }
});

tweetBtn.addEventListener('click', () => {
    console.log(tweetInput.value);
});

function handleLikeClick(tweetId) {
    const targetTweetObj = tweetsData.filter((tweet) => {
        return tweet.uuid === tweetId;
    })[0];

    if (targetTweetObj.isLiked) {
        targetTweetObj.likes--;
    } else {
        targetTweetObj.likes++;
    }
    targetTweetObj.isLiked = !targetTweetObj.isLiked;
    render();
}

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
    document.getElementById('feed').innerHTML = getFeedHtml(tweetsData);
}

render();