import React, { useContext, useState, useEffect } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { Context } from '../../context/Context';

const Main = () => {
  const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context);
  
  const [isListening, setIsListening] = useState(false); // To track microphone state
  const [transcription, setTranscription] = useState(''); // To hold transcribed text
  
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;

  useEffect(() => {
    if (recognition) {
      recognition.continuous = true; // Keep listening
      recognition.interimResults = true; // Allow partial results

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setTranscription(transcript);
        setInput(transcript); // Update input field with transcribed text
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  // Handle Enter key press
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (input.trim()) {
        onSent();
        stopListening(); // Stop microphone if Enter is pressed
      }
    }
  };

  return (
    <div className='main'>
      <div className="nav">
        <p>NexGen</p>
        <img src={assets.user_icon} alt="" />
      </div>
      <div className="main-container">
        {showResult ? (
          <div className="result">
            <div className='result-title'>
              <img src={assets.user_icon} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
              <img src={assets.gemini_icon} alt="" />
              {loading ? (
                <div className="loader">
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                  <hr className="animated-bg" />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="greet">
              <p><span>Hello, Developers</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              <div className="card">
                <p>Suggest beautiful places to see on an upcoming road trip</p>
                <img src={assets.compass_icon} alt="" />
              </div>
              <div className="card">
                <p>Briefly summarize this concept: urban planning</p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>Brainstorm team bonding activities for our work retreat</p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>Improve the readability of the following code</p>
                <img src={assets.code_icon} alt="" />
              </div>
            </div>
          </>
        )}

        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setInput(e.target.value)}
              value={input}
              type="text"
              placeholder='Enter a prompt here'
              onKeyDown={handleKeyDown}
            />
            <div>
              <img src={assets.gallery_icon} width={30} alt="" />
              <img
                src={assets.mic_icon}
                width={30}
                alt=""
                onClick={isListening ? stopListening : startListening}
                style={{ cursor: 'pointer', color: isListening ? 'red' : 'black' }}
              />
              {input ? (
                <img onClick={() => onSent()} src={assets.send_icon} width={30} alt="" />
              ) : null}
            </div>
          </div>
          <p className="bottom-info">
            NexGen may display inaccurate info, including about people, so double-check its responses. Your privacy and NexGen Apps
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
