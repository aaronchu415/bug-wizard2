import React from 'react';
import { Box, Heading, Text, keyframes } from '@chakra-ui/react';

const floatAnimation = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const sparkleAnimation = keyframes`
  0% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
  100% { opacity: 0; transform: scale(0); }
`;

const Header = () => {
  return (
    <Box
      bg="gray.900" // Changed to rgba for partial transparency
      p={6}
      textAlign="center"
      position="fixed" // Changed to fixed to keep the header on top while scrolling
      top={0}
      left={0}
      right={0}
      zIndex={10} // Ensures the header stays above other content
      overflow="hidden"
      opacity={0.8}
    >
      <Heading
        as="h1"
        size="xl"
        color="white"
        mb={2}
        animation={`${floatAnimation} 3s ease-in-out infinite`}
      >
        Debugging wizard 🧙‍♂️
      </Heading>
      <Text color="whiteAlpha.800">Bugs shall not pass!! 🐛</Text>
      {[...Array(10)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          top={`${Math.random() * 100}%`}
          left={`${Math.random() * 100}%`}
          width="10px"
          height="10px"
          borderRadius="50%"
          bg="yellow.300"
          animation={`${sparkleAnimation} ${5 + Math.random() * 5}s infinite`}
        />
      ))}
    </Box>
  );
};

export default React.memo(Header);
