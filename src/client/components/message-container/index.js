import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import Comment from '../comment';
import MemeSelectorModal from '../meme-selector-modal';
import { urlPrefix } from '../../constants';

const MessageContainer = props => {
  const [data, setData] = useState([]);
  const inputRef = useRef(null);

  const getComments = async () => {
    const response = await fetch(`${urlPrefix}/comments`, { method: 'GET' });
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    setData(body.comments);
  };

  const postComment = async text => {
    await fetch(`${urlPrefix}/comments`, {
      method: 'POST',
      body: JSON.stringify({
        text,
        username: props.username,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    inputRef.current.value = '';
    await getComments();
  };

  const postOnEnter = e => {
    // Enter Key
    if (e.keyCode === 13) {
      postComment(inputRef.current.value);
    }
  };

  useEffect(() => {
    // Call our fetch function below once the component mounts
    getComments();
  }, []);

  return (
    <div className="message-container">
      <div className="logout-container">
        <button onClick={props.logout} className="logout-button">
          Logout
        </button>
      </div>
      <div className="comments">
        {data.map(mappedData => (
          // eslint-disable-next-line react/jsx-key
          <Comment data={mappedData} />
        ))}
      </div>
      <div className="input-fields">
        <textarea ref={inputRef} onKeyDown={postOnEnter} className="input-text"></textarea>
        <button onClick={() => postComment(inputRef.current.value)}>POST</button>
        <MemeSelectorModal postComment={postComment} />
      </div>
    </div>
  );
};

MessageContainer.propTypes = {
  logout: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
};

export default MessageContainer;
