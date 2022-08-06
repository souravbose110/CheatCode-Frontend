import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";

function AboutModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <span onClick={onOpen}>About</span>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>About CheatCode</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              {" "}
              <strong>CheatCode</strong> is one of the online platforms that you
              can use to practice your programming skills by solving coding
              questions It has over 500 different problems sorted in ratio of
              like to dislike.
            </p>
            <p>
              All the question are taken from the <strong>LEETCODE</strong>
            </p>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default AboutModal;
