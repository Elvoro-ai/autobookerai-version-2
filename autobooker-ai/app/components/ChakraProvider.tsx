'use client';

import React from 'react';
import { ChakraProvider as ChakraUIProvider, ColorModeScript, extendTheme } from '@chakra-ui/react';

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
};

const theme = extendTheme({
  config,
  colors: {
    brand: {
      50: '#f5e9ff',
      100: '#e0c5ff',
      200: '#cba1ff',
      300: '#b57dff',
      400: '#a059ff',
      500: '#8b35ff',
      600: '#7211ff',
      700: '#5900e6',
      800: '#4000b3',
      900: '#270080',
    },
  },
  fonts: {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
      },
    }),
  },
  components: {
    Button: {
      defaultProps: {
        colorScheme: 'brand',
      },
      variants: {
        solid: (props: any) => ({
          bg: props.colorMode === 'dark' ? 'brand.500' : 'brand.600',
          _hover: {
            bg: props.colorMode === 'dark' ? 'brand.400' : 'brand.700',
          },
        }),
      },
    },
  },
});

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <ChakraUIProvider theme={theme}>{children}</ChakraUIProvider>
    </>
  );
}
