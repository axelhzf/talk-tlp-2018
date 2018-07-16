import React from 'react';
import TweetEmbed from 'react-tweet-embed';

export class Tweet extends React.Component {
  render() {
    return (
      <div className="tweet">
        <TweetEmbed id={this.props.id} />
      </div>
    );
  }
}
