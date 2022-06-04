import React from 'react';
import { Heading } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Layout } from '../Layout/Layout';

type AppContainerProps = {
  children?: ReactNode;
  heading?: string;
};

export const AppContainer: React.FC<AppContainerProps> = ({ children, heading = '' }) => {
  return (
    <Layout>
      {heading && (
        <Heading as="h4" size="md" borderBottom={'1px solid lightgray'} pb={3} mb={5}>
          {heading}
        </Heading>
      )}
      {children}
    </Layout>
  );
};
