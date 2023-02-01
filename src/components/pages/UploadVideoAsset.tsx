import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import CreateAndViewAsset from './CreateAndViewAsset'

import { LivepeerConfig, createReactClient, studioProvider } from '@livepeer/react'

interface HeaderProps {
  children: ReactNode
}

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: `${process.env.NEXT_PUBLIC_STUDIO_API_KEY}`,
  }),
})

const UploadVideoAsset = ({ children }: HeaderProps): JSX.Element => {
  const router = useRouter()
  return (
    <Box>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage className="active-crumb">
          <BreadcrumbLink href="#">Upload Video Assets</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <LivepeerConfig client={livepeerClient}>
        <CreateAndViewAsset />
      </LivepeerConfig>
    </Box>
  )
}
export default UploadVideoAsset
