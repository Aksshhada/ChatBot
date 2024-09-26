import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SingleChat from './SingleChat'

const ChatBox = ({ fetchAgain, setFetchAgain }) => {

  const { selectedChat } = ChatState()
  
  return ( 
  <Box
  display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
  alignItems={"center"}
  flexDir={"column"}
  p={"3"}
  bg={"white"}
  w={{ base: "100%", md: "68%" }}
  borderRadius={"lg"}
  borderWidth={"1px"}


  // fontSize="28px"
  // w="100%"
  // h="100%"
  // borderRadius="lg"
  // overflowY="hidden"
  // fontFamily="Work sans"
  // display="flex"
  // flexDir="column"
  // justifyContent="flex-end"  // Keep messages at the bottom
  // alignItems="flex-start"    // Align messages to the left (flex-start)
  // bg="#E8E8E8"
  // p="3"

  >
    <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
  </Box>
  )
}

export default ChatBox