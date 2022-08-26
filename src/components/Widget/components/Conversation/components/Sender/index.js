import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import Send from 'assets/send_button';
import './style.scss';

const Sender = ({ sendMessage, inputTextFieldHint, disabledInput, userInput }) => {
  const [inputValue, setInputValue] = useState('');
  const formRef = useRef('');
  
  function handleChange(e) {
    setInputValue(e.target.value);
    // onEnterPress(e)
  }
  function handleSubmit() {
    sendMessage(inputValue);
    setInputValue('');
  }
  function onEnterPress(e) {

    if (e.key === 'Enter' && inputValue !== ''){
      console.log(inputValue)
      handleSubmit()
      setInputValue('')
    }
  }

  return (
    userInput === 'hide' ? <div /> : (
      <form ref={formRef} className="rw-sender" onSubmit={handleSubmit}>
        <TextareaAutosize maxRows='1' value={inputValue} onChange={handleChange} onKeyDown={onEnterPress} className="rw-new-message" name="message" placeholder={inputTextFieldHint} disabled={disabledInput || userInput === 'disable'} autoFocus autoComplete="off"></TextareaAutosize>
        <button type="button" onClick={handleSubmit} className="rw-send" disabled={!(inputValue && inputValue.length > 0)}>
          <Send className="rw-send-icon" ready={!!(inputValue && inputValue.length > 0)} alt="send" />
        </button>
      </form>));
};
const mapStateToProps = state => ({
  userInput: state.metadata.get('userInput')
});

Sender.propTypes = {
  sendMessage: PropTypes.func,
  inputTextFieldHint: PropTypes.string,
  disabledInput: PropTypes.bool,
  userInput: PropTypes.string
};

export default connect(mapStateToProps)(Sender);