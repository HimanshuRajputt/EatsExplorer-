import { useState, useRef } from "react";
import "../styles/SpeechText.css";

function SpeechToText() {
  const [isListening, setIsListening] = useState(false);
  const [text, setText] = useState("");
  const [interimText, setInterimText] = useState("");
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (isListening) return;

    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      alert(
        "Speech recognition is not supported in your browser. Try Chrome or Edge."
      );
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.start();
    setIsListening(true);

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      setText((prevText) => prevText + finalTranscript);
      setInterimText(interimTranscript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);

      if (event.error === "no-speech") {
        alert(
          "No speech detected. Try speaking louder or check your microphone."
        );
      } else if (event.error === "not-allowed") {
        alert("Microphone access denied. Please allow microphone access.");
      }

      stopListening();
    };

    recognitionRef.current.onend = () => {
      if (isListening) {
        setTimeout(() => recognitionRef.current.start(), 500); // Restart after 500ms
      }
    };
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setIsListening(false);
    setInterimText("");
  };

  const clearText = () => {
    setText("");
    setInterimText("");
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => alert("Text copied to clipboard!"))
      .catch((err) => console.error("Failed to copy text: ", err));
  };

  return (
    <div className="app-container">
      <h1>Voice to Text Converter</h1>

      <div className="controls">
        <button
          className={`control-btn ${isListening ? "listening" : ""}`}
          onClick={isListening ? stopListening : startListening}
        >
          {isListening ? "Stop Listening" : "Start Listening"}
        </button>
        <button
          className="control-btn"
          onClick={clearText}
          disabled={!text && !interimText}
        >
          Clear Text
        </button>
        <button
          className="control-btn"
          onClick={copyToClipboard}
          disabled={!text}
        >
          Copy to Clipboard
        </button>
      </div>

      <div className="status-indicator">
        {isListening ? "Listening..." : "Not listening"}
      </div>

      <div className="text-output">
        <div className="final-text">{text}</div>
        <div className="interim-text">{interimText}</div>
      </div>
    </div>
  );
}

export default SpeechToText;
