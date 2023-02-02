import { Box, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import { LivepeerConfig, createReactClient, studioProvider } from '@livepeer/react'

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

const UpdateVideoAsset = ({ children }: HeaderProps): JSX.Element => {
  const router = useRouter()
  return (
    <Box>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage className="active-crumb">
          <BreadcrumbLink href="#">Update Video Assets</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <LivepeerConfig client={livepeerClient}>{/* <UpdateAsset /> */}</LivepeerConfig>
    </Box>
  )
}
export default UpdateVideoAsset
