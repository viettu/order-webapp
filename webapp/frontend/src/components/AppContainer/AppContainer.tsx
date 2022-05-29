import { ChakraProvider, Heading, theme } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { AppRuntimeProvider } from '../../contexts/app-runtime';
import { Layout } from '../Layout/Layout';

type AppContainerProps = {
  children: ReactNode;
  heading?: string;
};

export const AppContainer: React.FC<AppContainerProps> = ({ children, heading = '' }) => {
  return (
    <ChakraProvider theme={theme}>
      <AppRuntimeProvider>
        <Layout>
          {heading && (
            <Heading as="h4" size="md" borderBottom={'1px solid lightgray'} pb={3} mb={5}>
              { heading }
            </Heading>
          )}
          {children}
        </Layout>
      </AppRuntimeProvider>
    </ChakraProvider>
  );
};
