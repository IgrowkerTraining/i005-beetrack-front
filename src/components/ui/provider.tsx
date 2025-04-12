'use client'

import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeProvider, type ColorModeProviderProps } from './color-mode';

// Customize styles
import customStyles from '@/theme/theme';

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={ customStyles }>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  )
}
