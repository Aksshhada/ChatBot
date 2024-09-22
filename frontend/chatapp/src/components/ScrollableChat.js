import React from 'react';
import ScrollableFeed from 'react-scrollable-feed';
import { isLastMessage, isSameSender, isSameUser, sameSenderMargin } from '../Config/ChatLogics';
import { ChatState } from '../Context/ChatProvider';
import { Avatar, Tooltip } from '@chakra-ui/react';

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages && messages.map((m, i) => (
        <div style={{  
  display: 'flex',  
  flexDirection: 'row',  
  justifyContent: m.sender?._id === user._id ? 'flex-end' : 'flex-start',  
  alignItems: 'center',  
  padding: '5px',  
}} key={m._id}>

          {(isSameSender(messages, m, i, user._id) || isLastMessage(messages, i, user._id)) && (
            m.sender && ( 
              <Tooltip
                label={m.sender.name}
                placement="bottom-start"
                hasArrow
              >
                <Avatar
                  mt={'7px'}
                  mr={'1'}
                  size={'sm'}
                  cursor={'pointer'}
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )
          )}

          <span
            style={{
              backgroundColor: `${m.sender?._id === user._id ? '#BEE3F8' : '#B9F5D0'}`,
              borderRadius: '20px',
              padding: '5px 15px',
              maxWidth: '75%',
              fontSize: '17px',
             alignSelf: m.sender._id === user._id ? 'flex-end' : 'flex-start',
             marginLeft: sameSenderMargin(messages, m, i, user._id),
             marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
             }}
          >
            {m.content}
          </span>
        </div>
      ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
