import type { NextPage } from 'next'
import { Heading } from '@chakra-ui/react'

const Header: NextPage = () => {
  return (
      <Heading as={'h6'} color="red.400">Hello, nextjs</Heading>
  )
}

export default Header
