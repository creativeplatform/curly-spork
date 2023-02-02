import React, { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { Box, BreadcrumbItem, BreadcrumbLink, Breadcrumb } from '@chakra-ui/react'
import { LivepeerConfig, createReactClient, studioProvider } from '@livepeer/react'
import WagmiNft from './WagmiNft'

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

interface HeaderProps {
  children: ReactNode
}

const MintNftVideo = ({ children }: HeaderProps): JSX.Element => {
  const router = useRouter()

  return (
    <LivepeerConfig client={livepeerClient}>
      <Box>
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem isCurrentPage className="active-crumb">
            <BreadcrumbLink href="#">Mint NFT Video</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <WagmiNft />
      </Box>
    </LivepeerConfig>
  )
}
export default MintNftVideo
