import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Button,
} from "@chakra-ui/react";

const InfoModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Important Information</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="md" color="gray.700">
            We use a <b>Free API</b>, so location selection{" "}
            <b>may not be exact</b>. Sometimes, it selects a <b>nearby city</b>{" "}
            instead of your current location due to{" "}
            <b>policy and security restrictions</b>.
          </Text>
          <Text mt={3} fontSize="md" color="gray.700">
            Also, as a <b>Free API</b>, data accuracy might{" "}
            <b>not match Google API standards</b>.
          </Text>
          <Text mt={4} fontWeight="bold" textAlign="center" color="blue.500">
            Thank You! 🙌
          </Text>
          <Button colorScheme="blue" mt={5} w="full" onClick={onClose}>
            Got it!
          </Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default InfoModal;
