import React from 'react';
import { Header } from '../Header/Header';
import { Box, Center, Flex, Spinner, useToast } from '@chakra-ui/react';
import { useAppRuntime } from '../../contexts/app-runtime';
import { useEffect } from 'react';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoading, errorMessage } = useAppRuntime();
  const toast = useToast();

  useEffect(() => {
    if (errorMessage) {
      toast({
        title: 'Something is wrong!',
        description: errorMessage,
        status: 'error',
        duration: 9000,
        isClosable: true,
        position: 'top-right',
      });
    }
  }, [errorMessage]);

  return (
    <Box minH="100vh">
      <Header />
      <Flex direction={'column'} h={'full'} alignItems="center">
        <Box p="4" w={{ base: '100%', lg: '900px', xl: '1024px' }}>
          {children}
        </Box>
        {isLoading && (
          <Center w={'100vh'} h={'100vh'} zIndex={'1'} position={'absolute'} opacity={0.5}>
            <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
          </Center>
        )}
      </Flex>
    </Box>
  );
};
