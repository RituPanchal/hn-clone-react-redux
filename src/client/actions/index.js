import {
    HN_ITEMS_URL,
    FETCH_NEWS,
    UPVOTE_COUNT,
} from '../utils/constants';

import 'regenerator-runtime/runtime';

export const dispatchNews = data => ({
    type: FETCH_NEWS,
    payload: data
});

export const fetchNews = (counter) => async (dispatch) => {
    const news = [];

    for (let i = 1; i < 20; i++) {
        await fetch(HN_ITEMS_URL + parseInt(i))
            .then(response => response.json())
            .then(data => {
                const results = JSON.parse(JSON.stringify(data));

                const title = results.title;
                if (title != null) {
                    const id = results.id;
                    const author = results.author;
                    const url = results.url;
                    const timeStamp = results.created_at_i;
                    const vote_count = results.points;
                    const commentCount = results.children.length;

                    const date = new Date(timeStamp * 1000);
                    // const posted_time = date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear();
                    const posted_time = date.getHours();

                    const storage_item = localStorage.getItem(id);
                    const parse_storage_item = JSON.parse(storage_item);

                    const vote_storage_count = parse_storage_item != null ? parse_storage_item.vote_count : 0;

                    const news_results = {
                        "id": id,
                        "title": title,
                        "author": author,
                        "time": posted_time,
                        "url": url,
                        "vote_count": vote_storage_count > vote_count ? vote_storage_count : vote_count,
                        "comments": commentCount,
                    }
                    news.push(news_results)
                    localStorage.setItem(id, JSON.stringify(news_results));
                    dispatch(dispatchNews(news));
                }
            }).catch(error => {
                console.log(error);
            })
    }
}

export const dispatchVotes = count => ({
    type: UPVOTE_COUNT,
    payload: count
});

export const upVoteCount = vote => dispatch => {
    dispatch(dispatchVotes(vote));
}
