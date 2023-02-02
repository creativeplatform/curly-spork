import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Box, BreadcrumbItem, BreadcrumbLink, Breadcrumb } from '@chakra-ui/react'
import { LivepeerConfig, createReactClient, studioProvider } from '@livepeer/react'

import WagmiNft from './WagmiNft'
import { Web3Provider } from 'providers/Web3'

interface HeaderProps {
  children: ReactNode
}

declare var process: {
  env: {
    NEXT_PUBLIC_STUDIO_API_KEY: string
  }
}

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
})

const MintNftVideo = ({ children }: HeaderProps): JSX.Element => {
  const router = useRouter()

  return (
    <Box>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage className="active-crumb">
          <BreadcrumbLink href="#">Mint NFT Video</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <LivepeerConfig client={livepeerClient}>
        <WagmiNft />
      </LivepeerConfig>
    </Box>
  )
}
export default MintNftVideo
