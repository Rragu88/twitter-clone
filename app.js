import { tweetsData } from './data.js';
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

document.addEventListener('click', (e) => {
    if (e.target.dataset.reply) {
       handleReplyClick(e.target.dataset.reply);
    } else if (e.target.dataset.like) {
        handleLikeClick(e.target.dataset.like);
    } else if (e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet);
    } else if (e.target.id === 'tweet-btn') {
        handleTweetBtnClick();
    } else if (e.target.id === 'reply-btn') {
        handleReplyBtnClick(e.target.dataset.replyBtn);
    } else if(e.target.dataset.trash){
        handleTrashBtnClick(e.target.dataset.trash);
    };
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

function handleRetweetClick(tweetId) {
    const targetTweetObj = tweetsData.filter((tweet) => {
        return tweet.uuid === tweetId;
    })[0];

    if (targetTweetObj.isRetweeted) {
        targetTweetObj.retweets--;
    } else {
        targetTweetObj.retweets++;
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted;
    render();
}

function handleReplyClick(replyId) {
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden');
}

function handleTweetBtnClick() {
    const tweetInput = document.getElementById('tweet-input');
    if (tweetInput.value) {
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        });
        render();
        tweetInput.value = '';
    }
}

function handleReplyBtnClick(replyId){
    const replyInput = document.getElementById(`reply-input-${replyId}`);
    const targetTweetObj = tweetsData.filter(tweet => tweet.uuid === replyId)[0];
    if(replyInput.value){
        targetTweetObj.replies.push({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            tweetText: replyInput.value
        });
    render();
    replyInput.value = '';
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden');
    };
};

function handleTrashBtnClick(tweetId){
    let deleteTweet = confirm('Are you sure you want to delete this tweet?');
    if (deleteTweet) {
        tweetsData.filter((tweet, index) => {
            if (tweet.uuid === tweetId) {
                tweetsData.splice(index, 1)
            };
        });
    }
    render();
};

function getFeedHtml(tweets) {
    let feedHtml = ``;
    tweets.forEach((tweet) => {
        let likeIconClass = '';
        let repliesHtml = ``;
        if (tweet.isLiked) {
            likeIconClass = 'liked';
        }
        let retweetIconClass = '';
        if (tweet.isRetweeted) {
            retweetIconClass = 'retweeted';
        }
        let trashBtnClass = 'hidden'
        if (tweet.handle === '@Scrimba'){
            trashBtnClass = ''
        }
        if (tweet.replies.length > 0) {
            tweet.replies.forEach((reply) => {
                repliesHtml += `
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
                </div>`;
            });
        }

        const replyArea = `
        <div class="reply-area">
            <textarea placeholder="Reply to ${tweet.handle} here..." class="reply-input" id="reply-input-${tweet.uuid}"></textarea>
            <button id="reply-btn" data-reply-btn="${tweet.uuid}">Reply</button>
        </div>`;

        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots" data-reply="${tweet.uuid}"></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likeIconClass}" data-like="${tweet.uuid}"></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweetIconClass}" data-retweet="${tweet.uuid}"></i>
                            ${tweet.retweets}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-trash trash-btn" data-trash="${tweet.uuid}"></i>
                        </span>
                    </div>   
                </div>            
            </div>
        <div class="hidden" id="replies-${tweet.uuid}">
            ${repliesHtml}
            <div id="reply-area-${tweet.uuid}">
            ${replyArea}
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