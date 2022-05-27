import { Header } from "../Header/Header";
// import Sidebar from "@components/Sidebar";

import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";

interface LayoutProps {
    children: React.ReactNode
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
//   const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh">
      {/* <Sidebar
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <Sidebar onClose={onClose} />
        </DrawerContent>
      </Drawer> */}

      <Header />
      <Box p="4">
        {children}
      </Box>
    </Box>
  );
}
