import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";

interface IProps {
  onClose: any;
  open: any;
  title: string;
  body: any;
}
export const DefaultModal = ({ onClose, open, title, body }: IProps) => {
  return (
    <Modal
      onClose={onClose}
      size="4xl"
      isOpen={open}
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay />
      <ModalContent bg="green.800" color="white">
        <ModalHeader
          textAlign="center"
          textTransform="uppercase"
          letterSpacing="1.5px"
        >
          {title}
        </ModalHeader>
        <ModalCloseButton color="red" />
        <ModalBody>{body}</ModalBody>
      </ModalContent>
    </Modal>
  );
};
