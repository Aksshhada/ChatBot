import { Box, Button, Tooltip, Text, Menu, MenuButton, MenuList,Avatar, MenuItem, MenuDivider,
         Drawer, 
         DrawerOverlay, 
         DrawerContent, 
         DrawerHeader,
         DrawerBody,
         Input,
         useToast, 
         Spinner} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import { ChatState } from "../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom"
import { useDisclosure } from "@chakra-ui/react";
import ChatLoading from "../ChatLoading";
import axios from "axios";
import UserListItem from "../UserAvatar/UserListItem";

const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();

  const { user, setSelectedChat, chats, setChats } = ChatState();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  
  const LogoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  }

  const toast = useToast();

  const handleSearch = async() => {
    if (!search) {
      toast({
        title: "Please enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      })
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.get(`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
      
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to load the search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      })
    }

  }


  const accessChat = async (userId) => {
    try {
      setLoadingChat(true)

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }

      const { data } = await axios.post("/api/chat", { userId }, config)

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats])

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      })
    }
  }


  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems={"center"}
        background={"white"}
        width={"100%"}
        padding={"5px 10px 5px 10px"}
        borderWidth={"5px"}
      >
        <Tooltip label="Search User" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </Button>
        </Tooltip>
        <Text fontSize = "2xl" fontFamily = "Work sans">
          CHAT APP
        </Text>
        <div>
          <Menu>
            <MenuButton>
              {/* <BellIcon fontSize={"2xl"} m={"1"} /> */}
            </MenuButton>
          </Menu>
          <Menu>
          <MenuButton as = {Button} rightIcon = {<ChevronDownIcon />}>
          <Avatar
          size={"sm"}
          cursor={"pointer"}
          name={user.name}
          src={user.pic}
          />
            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
              <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={LogoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"1px"}>Search User</DrawerHeader>
        <DrawerBody>
          <Box display={"flex"} pb={"2"}>
            <Input 
            placeholder="Search by Name or Email"
            mr={2}
            value={search}
            onChange={(e) => setSearch(e.target.value)} />
            <Button onClick= {handleSearch}>Search</Button>
          </Box>
          {loading ? (
            <ChatLoading />
          ) : (
            searchResult?.map((user) => (
              <UserListItem
              key = {user._id}
              user = {user}
              handleFunction = {() => accessChat(user._id)}
              />
            ))
          )}
          {loadingChat && <Spinner ml={"auto"} display={"flex"} />}
        </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;