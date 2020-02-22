/* eslint-disable no-underscore-dangle */
import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Comment = props => {
  // eslint-disable-next-line
  const regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
  const match = regex.exec(props.data.text);

  if (match && match[0]) {
    return (
      <span>
        <label key={props.data._id}>{`${props.data.username}: `}</label>
        <img src={match[0]} alt="dank-meme" className="dank-meme" />
      </span>
    );
  }

  return <label key={props.data._id}>{`${props.data.username}: ${props.data.text}`}</label>;
};

Comment.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Comment;
