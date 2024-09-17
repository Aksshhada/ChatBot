// import React from 'react'
// import { ChatState } from '../Context/ChatProvider'
// import { Box, IconButton, Text } from '@chakra-ui/react'
// import { ArrowBackIcon } from '@chakra-ui/icons'
// import { getSender, getSenderFull } from '../Config/ChatLogics'
// import ProfileModal from './miscellaneous/ProfileModal'

// const SingleChat = ({ fetchAgain, setFetchAgain }) => {

//     const { user, selectedChat, setSelectedChat } = ChatState()

//   return (
//     <>
//     {selectedChat ? (
//         <>
//         <Text
//         fontSize={{ base: "28px", md: "30px" }}
//         pb={"3"}
//         px={"2"}
//         w={"100%"}
//         fontFamily={"Work sans"}
//         display={"flex"}
//         justifyContent={{ base: "space-between" }}
//         alignItems={"center"}
//         >
//             <IconButton
//             display={{ base: "flex", md: "none"}}
//             icon={<ArrowBackIcon />}
//             onClick={() => setSelectedChat("")}
//             />
//             {!selectedChat.isGroupChat ? (
//                 <>
//                 {getSender(user, selectedChat.users)}
//                 <ProfileModal user={getSenderFull(user, selectedChat.users)}/>
//                 </>
//             ) : (
//                 <>{selectedChat.chatName.toUpperCase()}
//                 {/* <UpdateGroupChatModal 
//                 fetchAgain={fetchAgain}
//                 setFetchAgain={setFetchAgain}
//                 /> */}
//                 </>
//             )}
//         </Text>
//         </>
//     ) : (
//         <Box 
//         display={"flex"}
//         alignItems={"center"}
//         justifyContent={"center"}
//         h={"100%"}>
//         <Text fontSize={"3x1"}
//         pb={"3"}
//         >Click on a user to start chatting
//         </Text>
//         </Box>

//     )}
// </>
//   )}
// export default SingleChat








import React from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box, IconButton, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../Config/ChatLogics';
import ProfileModal from './miscellaneous/ProfileModal';

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const { user, selectedChat, setSelectedChat } = ChatState();

  return (
  <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: '28px', md: '30px' }}
            pb="3"
            px="2"
            w="100%"
            fontFamily="Work sans"
            display="flex"
            justifyContent={{ base: 'space-between' }}
            alignItems="center"
          >
            <IconButton
              display={{ base: 'flex', md: 'none' }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />

            {!selectedChat.isGroupChat ? (
              <>
                {selectedChat.users && selectedChat.users.length > 0 ? (

                  <>
                    {getSender(user, selectedChat.users)}
                    <ProfileModal user={getSenderFull(user, selectedChat.users)} />
                  </>

                ) : (
                  <Text>User information not available</Text>
                )}
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                {/* <UpdateGroupChatModal 
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                /> */}
              </>
            )}
          </Text>

          <Box
          fontSize={{ base: '28px', md: '30px' }}
          width={"100%"}
          height={"100%"}
          borderRadius={"lg"}
          overflowY={"hidden"}
          fontFamily="Work sans"
          display="flex"
          flexDir={"column"}
          justifyContent={"flex-end"}
          alignItems="center"
          bg={"#E8E8E8"}
          >
            {/* messages */}
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb="3">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  )
};

export default SingleChat;
