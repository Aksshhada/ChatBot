import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { Box, FormControl, IconButton, Input, Spinner, Text, useToast } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../Config/ChatLogics';
import ProfileModal from './miscellaneous/ProfileModal';
import UpdateGroupChatModal from './miscellaneous/UpdateGroupChatModal';
import axios from 'axios';
import './styles.css'
import ScrollableChat from './ScrollableChat';
import io from 'socket.io-client'

const ENDPOINT = "http://localhost:5000"
var socket, selectedChatCompare

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)
  const [NewMessage, setNewMessage] = useState()
  const [socketConnected, setSocketConnected] = useState(false)

  const toast = useToast()

  const { user, selectedChat, setSelectedChat } = ChatState();

  const fetchMessages = async () => {
    if (!selectedChat) return 

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      setLoading(true)

      const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      )

      setMessages(data)
      setLoading(false)

      socket.emit("join chat", selectedChat._id)

    } catch (error) {
      toast({
        title: "Error occured",
        description: "Failed to load the message",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      })
    }
  }

  console.log(messages)


  useEffect(() => {
    socket = io(ENDPOINT)
    socket.emit("setup", user)
    socket.on("connection", () => setSocketConnected(true))
  })


  useEffect(() => {
    fetchMessages()

    selectedChatCompare = selectedChat
  }, [selectedChat])


  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      if (!selectedChatCompare || selectedChatCompare._id !== newMessageReceived.chat._id){
      } else {
        setMessages([...messages, newMessageReceived])
      }
    })
  })


  const sendMessage = async (event) => {
    if (event.key === "Enter" && NewMessage) {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }

        setNewMessage("")

        const { data } = await axios.post(
          "/api/message",
          {
            content: NewMessage,
            chatId: selectedChat._id,
          },
          config
        )

        console.log(data)

        socket.emit("new message", data)

        setMessages([...messages, data])
      } catch (error) {
        toast({
          title: "Error occured",
          description: error.response?.data?.message || "Failed to send the message",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        })
      }
    }
  }


  const typingHandler = (e) => {
    setNewMessage(e.target.value)

    // typing indicator
  }

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
            alignItems={"center"}
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
                <UpdateGroupChatModal 
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
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
            {loading ? (
              <Spinner
              size={"x1"}
              w={"20"}
              h={"20"}
              alignSelf={"center"}
              margin={"auto"}
              />
            ) : (
              <div className='messages'>
                <ScrollableChat messages={messages} />
              </div>
            )}

            <FormControl onKeyDown={sendMessage} isRequired mt={"3"}>
              <Input 
              variant={"filled"}
              bg={"#E0E0E0"}
              placeholder='Enter a message'
              onChange={typingHandler}
              value={NewMessage}
              />

            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
          mb="20px"
        >
          <Text fontSize="2xl" pb="3">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  )
};

export default SingleChat;
