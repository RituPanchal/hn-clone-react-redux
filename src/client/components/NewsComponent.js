import React from 'react';
import "../styles/styles.css";
import { connect } from 'react-redux';
import { fetchNews, upVoteCount } from '../actions';

import { LineChart } from 'react-chartkick';
import 'chart.js'


const Link = ({ url, title }) => (
    <a href={url} target="_blank" rel="noreferrer">
        <span>{title} </span>
    </a>
);

class NewsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newsFeeds: [],
            startPage: 1,
            endPage: 31
        }
    }
    componentDidMount() {
        this.props.fetchNews(1);
    }

    getHostname = (url) => {
        if (url != undefined) {
            return new URL(url).hostname;
        }
    }

    setUpVoteCount = (item) => {
        const id = item.id;
        const title = item.title;
        const author = item.author;
        const posted_time = item.posted_time;
        const url = item.url;
        const comments = item.comments;
        const storage_item = localStorage.getItem(id);
        const parse_storage_item = JSON.parse(storage_item);
        const parse_storage_title = parse_storage_item.title;
        const parse_storage_vote_count = parse_storage_item.vote_count;
        if (title == parse_storage_title) {
            const new_vote_count = parseInt(parse_storage_vote_count) + 1;
            const news_results = {
                "id": id,
                "title": title,
                "author": author,
                "time": posted_time,
                "url": url,
                "vote_count": new_vote_count,
                "comments": comments,
            }
            localStorage.setItem(id, JSON.stringify(news_results));
            this.props.upVoteCount(news_results)
        }
    }

    renderVoteCount = (item) => {
        const id = item.id;
        const vote = JSON.parse(JSON.stringify(this.props.vote_count)).vote_count;
        let votes;
        if (id == vote.id) {
            votes = vote.vote_count;
        } else {
            const storage_item = localStorage.getItem(id);
            const parse_storage_item = JSON.parse(storage_item);
            const vote_count = parse_storage_item != null ? parse_storage_item.vote_count : 0;
            votes = vote_count;
        }
        return (
            <span className="c-news__details--votes">{votes}</span>
        );
    }

    renderLineChart = results => {
        const statistics = [];

        for (let i = 0; i < results.length; i++) {
            const id = results[i].id.toString();

            const storage_item = localStorage.getItem(id);
            const parse_storage_item = JSON.parse(storage_item);
            const vote_count = parse_storage_item != null ? parse_storage_item.vote_count : 0;
            const votes = vote_count;

            const item = { [id]: votes }
            statistics.push(item);
        }
        let graph_item = JSON.stringify(statistics);
        graph_item = graph_item.replace(/[{}]/g, "");
        graph_item = graph_item.replace('[', '{');
        graph_item = graph_item.replace(']', '}');

        var data = JSON.parse(graph_item);
        console.log(graph_item, data);

        return (
            <LineChart
                data={data}
            />
        )
    }

    render() {
        const results = JSON.parse(JSON.stringify(this.props.news)).news;
        return (
            <>
                <div className="c-news">
                    <div className="c-news__wrapper">
                        <table>
                            <colgroup>
                                <col span="1" className="c-news__col--1" />
                                <col span="1" className="c-news__col--2" />
                                <col span="1" className="c-news__col--3" />
                                <col span="1" className="c-news__col--4" />
                                <col span="1" className="c-news__col--5" />
                            </colgroup>

                            <tr className="c-news__header">
                                <th>Comments</th>
                                <th>Votes</th>
                                <th>UpVote</th>
                                <th>News Feed</th>
                                <th>Time Posted</th>
                            </tr>
                            {
                                results && results.map((item) => (
                                    <tr key={item.id} className="c-news__feed">
                                        <td><span className="c-news__feed--comments">{item.comments}</span></td>
                                        <td>{this.renderVoteCount(item)}</td>
                                        <td>
                                            <a href="/" onClick={this.setUpVoteCount.bind(this, item)}><span className="c-news__details--upvote">&#9650;</span></a>
                                        </td>
                                        <td className="c-news__details">
                                            <span className="c-news__details--title">
                                                <Link url={item.url} title={item.title} />
                                            </span>
                                            <span className="c-news__details--url">
                                                <Link url={item.url} title={`(${this.getHostname(item.url)})`} />
                                            </span>
                                            <span className="c-news__details--author">
                                                <Link url={`https://news.ycombinator.com/user?id=${item.author}`} title={`by ${item.author}`} />
                                            </span>
                                        </td>
                                        <td>
                                            <span className="c-news__details--time">{item.time} hours ago</span>
                                        </td>
                                    </tr>
                                ))
                            }
                        </table>
                    </div>
                </div >
                <div>
                    {this.renderLineChart(results)}
                </div>
            </>
        );
    }
}

const stateProps = state => ({
    news: state.news,
    vote_count: state.vote_count
});
const dispatchProps = dispatch => ({
    fetchNews: counter => dispatch(fetchNews(counter)),
    upVoteCount: item => dispatch(upVoteCount(item))
});

export default connect(stateProps, dispatchProps)(NewsComponent);

