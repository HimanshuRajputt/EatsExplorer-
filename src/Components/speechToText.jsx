import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Text,
} from "@chakra-ui/react";

function SpeechToText({ isOpen, onClose }) {
  const [text, setText] = useState("");
  const [interimText, setInterimText] = useState("");
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) startListening();
    return () => stopListening();
  }, [isOpen]);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.start();

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript.toLowerCase();
        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      setText((prevText) => prevText + finalTranscript);
      setInterimText(interimTranscript);

      // Redirect if phrase detected
      if (finalTranscript.includes("restaurants near me")) {
        setTimeout(() => navigate("/nearby-restaurants"), 1000);
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      stopListening();
    };
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    setInterimText("");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered motionPreset="slideInBottom">
      <ModalOverlay backdropFilter="blur(5px)" />
      <ModalContent p={4} borderRadius="md">
        <ModalHeader>Voice Command</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="lg" fontWeight="bold" color="blue.600">
            {text}
          </Text>
          <Text fontSize="md" color="gray.500">
            {interimText}
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SpeechToText;
