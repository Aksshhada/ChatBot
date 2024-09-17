import React from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { Avatar, Box, Text } from '@chakra-ui/react';

const UserListItem = ({ user, handleFunction }) => {
    // const { user } = ChatState();
  return (
    <Box
        onClick = {handleFunction}
        cursor = "pointer"
        background ="#7438AB"
        _hover={{
            background:"#45678",
            color:"white",
        }}
        width="100%"
        display="flex"
        alignItems="center"
        color="black"
        px={3}
        py={2}
        mb={2}
        borderRadius="lg"
        >
            <Avatar
            mr={2}
            size="sm"
            cursor={'pointer'}
            name={user.name}
            src={user.pic}
            />
            <Box>
                <Text>{user.name}</Text>
                <Text fontSize ="x5" >
                    <b>Email : </b>
                    {user.email}
                </Text>
            </Box>
    </Box>
  )
}

export default UserListItem