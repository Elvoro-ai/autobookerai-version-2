import './globals.css';
import type { ReactNode } from 'react';
import { ChakraProvider } from './components/ChakraProvider';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { Box, Flex } from '@chakra-ui/react';

export const metadata = {
  title: 'AutoBooker AI',
  description: 'Gagnez 10 heures/semaine grâce à l\'IA',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider>
          <Flex h="100vh" overflow="hidden">
            <Sidebar />
            <Flex direction="column" flex="1" overflow="hidden">
              <Header />
              <Box flex="1" overflow="auto" p={8}>
                {children}
              </Box>
            </Flex>
          </Flex>
        </ChakraProvider>
      </body>
    </html>
  );
}
