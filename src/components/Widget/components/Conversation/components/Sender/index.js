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
  }

  function handleSubmit(e) {
    console.log("ON handleSubmit  "); //matheus

    console.log(e)
    sendMessage(e);
    setInputValue('');



  }

  function onEnterPress(e) {
    
    //console.log("ON ETNTERPRESS  ");
    
    // console.log("e.keyCodey",e.keyCodey);
    
    //handleSubmit(e); //matheus-
    
    if (e.key === 'Enter'){// && e.shiftKey === false) { //matheus
      
      // console.log(" inside entrerpress > if "); //matheus
      
      // e.preventDefault();


      // by dispatching the event we trigger onSubmit
      // formRef.current.submit() would not trigger onSubmit
      formRef.current.dispatchEvent(new Event('submit', { cancelable: true }));

      console.log(" dispatcherEvent "); //matheus

      handleSubmit(e); //matheus-

    }
  }

  return (
    userInput === 'hide' ? <div /> : (
      <form ref={formRef} className="rw-sender" onSubmit={handleSubmit}>
        {/* <textarea onChange={handleChange}></textarea> */}
        <TextareaAutosize type="text" minRows={1} onKeyDown={onEnterPress} maxRows={3} onChange={handleChange} className="rw-new-message" name="message" placeholder={inputTextFieldHint} disabled={disabledInput || userInput === 'disable'} autoFocus autoComplete="off" />
        <button type="submit" className="rw-send" disabled={!(inputValue && inputValue.length > 0)}>
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
