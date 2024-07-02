'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useChat } from 'ai/react';
import {
  Avatar,
  Box,
  Flex,
  IconButton,
  useToast,
  VStack,
  Input,
  keyframes
} from '@chakra-ui/react';
import { FaPaperPlane, FaHatWizard } from 'react-icons/fa';
import { VscRefresh, VscTrash } from 'react-icons/vsc';
import Markdown from './components/Markdown';
import Header from './components/Header';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const UserAvatar = () => <Avatar size="sm" color="white" bg="blue.500" borderRadius="8px" mt={1} />;

const AssistantAvatar = () => (
  <Avatar
    icon={<FaHatWizard />}
    size="sm"
    color="white"
    bg="purple.500"
    borderRadius="8px"
    mt={1}
  />
);

const localStorageKey = 'chatMessages';

export default function Chat() {
  const inputRef = useRef(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const toast = useToast();

  const [storedMessages, setStoredMessages] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedMessages = localStorage.getItem(localStorageKey);
      return savedMessages ? JSON.parse(savedMessages) : [];
    }
    return [];
  });

  const { messages, input, handleInputChange, handleSubmit, isLoading, reload } = useChat({
    initialMessages: storedMessages,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(localStorageKey, JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);


  const handleReset = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(localStorageKey);
    }
    window.location.reload();
    toast({
      title: 'Chat reset',
      description: 'All messages have been cleared.',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex direction="column" h="100vh" bg="gray.900">
      <Header />

      <VStack flex={1} overflowY="auto" spacing={4} p={4} pt={150} ref={chatContainerRef}>
        {messages.map((message, i) => (
          <Flex
            key={i}
            alignSelf={message.role === 'user' ? 'flex-end' : 'flex-start'}
            animation={`${fadeIn} 0.5s ease-out`}
            maxW="70%"
          >
            {message.role === 'assistant' && <AssistantAvatar />}
            <Box
              ml={message.role === 'assistant' ? 2 : 0}
              mr={message.role === 'user' ? 2 : 0}
              p={3}
              borderRadius="lg"
              bg={message.role === 'user' ? 'blue.700' : 'purple.700'}
              boxShadow="md"
            >
              <Markdown>{message.content}</Markdown>
            </Box>
            {message.role === 'user' && <UserAvatar />}
          </Flex>
        ))}
      </VStack>

      <Box as="form" onSubmit={handleSubmit} p={4} bg="gray.800">
        <Flex>
          <Input
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            placeholder="Type your message here..."
            bg="gray.700"
            color="white"
            border="none"
            _focus={{ boxShadow: 'outline' }}
          />
          <IconButton
            aria-label="Submit"
            type="submit"
            icon={<FaPaperPlane />}
            isLoading={isLoading}
            ml={2}
            colorScheme="blue"
            _hover={{ bg: 'blue.600' }}
          />
        </Flex>
        <Flex justify="flex-end" mt={2}>
          <IconButton
            aria-label="Reload"
            icon={<VscRefresh />}
            onClick={() => reload()}
            mr={2}
            size="sm"
            variant="ghost"
            colorScheme="gray"
            _hover={{ bg: 'gray.700' }}
          />
          <IconButton
            aria-label="Reset"
            icon={<VscTrash />}
            onClick={handleReset}
            size="sm"
            variant="ghost"
            colorScheme="red"
            _hover={{ bg: 'red.700' }}
          />
        </Flex>
      </Box>
    </Flex>
  );

}
