import React from 'react';
import { Header } from '../Header/Header';
import { Box, Center, Flex, Spinner, useToast } from '@chakra-ui/react';
import { useAppRuntime } from '../../contexts/app-runtime';
import { useEffect } from 'react';

type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isLoading, errorMessage, setErrorMessage } = useAppRuntime();
  const toast = useToast();

  useEffect(() => {
    toast.closeAll();
    setErrorMessage('');
  }, []);

  useEffect(() => {
    toast.closeAll();
    if (errorMessage) {
      toast({
        title: 'Something is wrong!',
        description: errorMessage,
        status: 'error',
        duration: 3000,
        isClosable: true,
        position: 'top',
        onCloseComplete: () => {
          setErrorMessage('');
        },
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
