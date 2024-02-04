import React from 'react'
import { Spinner,Box } from '@chakra-ui/react'

const Loading = () => {
  return (
    <Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={'100%'}>
        <Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='red'
  size='xl'
/>
    </Box>
  )
}

export default Loading