// import { IconButton, useDisclosure } from '@chakra-ui/react'
// import React from 'react'

// const ProfileModal = ({ user, children }) => {

//     const { isOpen, onOpen, onClose } = useDisclosure()

//   return (
//     <>
//     {children ? (
//         <span onClick={onOpen}>{children}</span>
//     ) : (
//         <IconButton

//     )
//     )}
//     </>
//   )
// }

// export default ProfileModal















import {
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button
  } from '@chakra-ui/react';
  import React from 'react';
  import { ViewIcon } from '@chakra-ui/icons';
  
  const ProfileModal = ({ user = {}, children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <>
        {children ? (
          <span onClick={onOpen}>{children}</span>
        ) : (
          <IconButton icon={<ViewIcon />} onClick={onOpen} />
        )}
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{user.name ? `${user.name}'s Profile` : 'User Profile'}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>Email: {user.email || 'N/A'}</p>
              {/* <p>Other Info: {user.otherInfo || 'N/A'}</p> */}
              {/* Add more user details here as needed */}
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
  };
  
  export default ProfileModal;
  
  
  