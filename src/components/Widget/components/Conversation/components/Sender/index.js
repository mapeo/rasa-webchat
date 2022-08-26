import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextareaAutosize from 'react-textarea-autosize';
import Send from 'assets/send_button';
import './style.scss';

const Sender = ({ sendMessage, inputTextFieldHint, disabledInput, userInput }) => {
  const [inputValue, setInputValue] = useState('');
  const [key, setKeyValue] = useState('');
  const keyPressed = command.keyPressed
  const formRef = useRef('');
  
  function handleChange(e) {
    console.log("VOLTEI COMMIT")

    setInputValue(e.target.value);
    setKeyValue(e.key);
    onEnterPress()
  }

  function handleSubmit() {
    console.log("VOLTEI COMMIT")
    // e.preventDefault()
    // console.log("handleSubmit e:",e)
    // console.log("inputValue e:",inputValue)
    // sendMessage(inputValue)
    console.log("formRef : ",formRef)
    console.log("inputValue : ",inputValue)
    sendMessage(inputValue);
    setInputValue('');
  }

  function onEnterPress(keyPressed) {

    if (keyPressed === 'Enter'){// && key === '') { //matheus
      // e.preventDefault();

      // by dispatching the event we trigger onSubmit
      // formRef.current.submit()// would not trigger onSubmit
      
      // formRef.current.dispatchEvent(new Event('submit', { cancelable: true }));
      
      // console.log("ONENTERPRESS e",e)
      // console.log("inputValue e:",inputValue)
      console.log("keyPressed : ",keyPressed)

      // e.a.value = inputValue    
      // a.value = inputValue
      handleSubmit()
      // handleSubmit(inputValue)
    }
  }
  
  return (
    userInput === 'hide' ? <div /> : (
      <form ref={formRef} className="rw-sender" onSubmit={handleSubmit}>
        <textarea onEnterPress={onEnterPress} onChange={handleChange}></textarea>
        <button type="button" onClick={handleSubmit} className="rw-send" disabled={!(inputValue && inputValue.length > 0)}>
          <Send className="rw-send-icon" ready={!!(inputValue && inputValue.length > 0)} alt="send" />
        </button>
      </form>));
};
// return (
//   userInput === 'hide' ? <div /> : (
//     <form ref={formRef} className="rw-sender" onSubmit={handleSubmit}>
//       <textarea></textarea>
//       <TextareaAutosize type="text" minRows={1} onKeyDown={onEnterPress} maxRows={3} onChange={handleChange} className="rw-new-message" name="message" placeholder={inputTextFieldHint} disabled={disabledInput || userInput === 'disable'} autoFocus autoComplete="off" />
//       <button type="button" onClick={handleSubmit} className="rw-send" disabled={!(inputValue && inputValue.length > 0)}>
//         <Send className="rw-send-icon" ready={!!(inputValue && inputValue.length > 0)} alt="send" />
//       </button>
//     </form>));
// };
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

// import React, { useState, useRef,  } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import TextareaAutosize from 'react-textarea-autosize';
// import Send from 'assets/send_button';
// import './style.scss';

// const Sender = ({ sendMessage, inputTextFieldHint, disabledInput, userInput }) => {
//   const [inputValue, setInputValue] = useState('');
//   const formRef = useRef('');
//   function handleChange(e) {
//     setInputValue(e.target.value);
//   }

//   function handleSubmit(e) {
//     console.log("ON handleSubmit  e",e)

//     sendMessage(e);
//     setInputValue('');

//   }

//   function onEnterPress(e) {
    

//     if (e.key === 'Enter'){// && e.shiftKey === false) { //matheus
      
      
//       e.preventDefault();

//       // by dispatching the event we trigger onSubmit
//       // formRef.current.submit()// would not trigger onSubmit
      
//       formRef.current.dispatchEvent(new Event('submit', { cancelable: true }));
      
//       console.log("ONENTERPRESS e",e)
//       handleSubmit(e)
//     }
//   }

//   return (
//     userInput === 'hide' ? <div /> : (
//       <form ref={formRef} className="rw-sender" onSubmit={handleSubmit}>
//         {/* <textarea onChange={handleChange}></textarea> */}
//         <TextareaAutosize type="text" 
//                           minRows={1} 
//                           onKeyDown={onEnterPress} 
//                           maxRows={3} 
//                           onChange={handleChange} 
//                           className="rw-new-message" 
//                           name="message" 
//                           placeholder={inputTextFieldHint} 
//                           disabled={disabledInput || userInput === 'disable'} 
//                           autoFocus autoComplete="off" />
//         <button type="submit" className="rw-send" disabled={!(inputValue && inputValue.length > 0)}>
//           <Send className="rw-send-icon" ready={!!(inputValue && inputValue.length > 0)} alt="send" />
//         </button>
//       </form>));
// };
// const mapStateToProps = state => ({
//   userInput: state.metadata.get('userInput')
// });

// Sender.propTypes = {
//   sendMessage: PropTypes.func,
//   inputTextFieldHint: PropTypes.string,
//   disabledInput: PropTypes.bool,
//   userInput: PropTypes.string
// };

// export default connect(mapStateToProps)(Sender);
