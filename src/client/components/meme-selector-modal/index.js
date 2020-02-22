import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import './index.scss';

const MemeSelectorModal = props => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [memes, setMemes] = useState([]);
  const searchRef = useRef(null);

  const closeModal = () => {
    setIsModalOpen(false);
    setMemes([]);
  };

  const searchMeme = async () => {
    const response = await fetch(`/api/dankmemes?q=${searchRef.current.value}&limit=10`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    setMemes(body);
  };

  const searchRandomMeme = async () => {
    const response = await fetch(`/api/randomMeme?q=${searchRef.current.value}`);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }

    setMemes(body);
  };

  const searchOnEnter = e => {
    // Enter Key
    if (e.keyCode === 13) {
      searchMeme();
    }
  };

  const selectMeme = e => {
    props.postComment(e.currentTarget.src);
    closeModal();
  };

  return (
    <div className="meme-selector-modal">
      <button onClick={() => setIsModalOpen(true)}>GIPHY</button>
      <Modal isOpen={isModalOpen} contentLabel="Example Modal">
        <div className="meme-header">
          <input ref={searchRef} onKeyDown={searchOnEnter} placeholder="Search GIPHY"></input>
          <button onClick={searchRandomMeme}>Random</button>
          <button onClick={closeModal}>X</button>
        </div>
        <div className="meme-container">
          {memes.map(url => (
            // eslint-disable-next-line react/jsx-key
            <img src={url} onClick={selectMeme} alt="memes" className="meme-image" />
          ))}
        </div>
      </Modal>
    </div>
  );
};

MemeSelectorModal.propTypes = {
  postComment: PropTypes.func.isRequired,
};

export default MemeSelectorModal;
