import { Header } from '../Header/Header';
import { Box, Flex } from '@chakra-ui/react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Box minH="100vh">
      <Header />
      <Flex direction={'column'} h={'full'} alignItems="center">
        <Box p="4" w={{ base: '100%', lg: '900px', xl: '1024px' }}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
};
