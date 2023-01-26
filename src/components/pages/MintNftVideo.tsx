import React, { ReactNode } from "react";
import { useRouter } from 'next/router';
import {
  Box, BreadcrumbItem, BreadcrumbLink, Breadcrumb
} from "@chakra-ui/react";

import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from '@livepeer/react';
import { WagmiConfig, createClient } from 'wagmi'
import { getDefaultClient } from 'connectkit'

import WagmiNft from './WagmiNft';

interface HeaderProps {
  children: ReactNode
}

const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: process.env.NEXT_PUBLIC_STUDIO_API_KEY,
  }),
});

const MintNftVideo = ({ children }: HeaderProps): JSX.Element => {

  const router = useRouter();
  const query = router.query;
  const wagmiClient = createClient(
    getDefaultClient({
      appName: 'Creative TV',
    })
  );

  return (
    <Box>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage className="active-crumb">
          <BreadcrumbLink href='#'>Mint NFT Video</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <WagmiConfig client={wagmiClient}>
        <LivepeerConfig client={livepeerClient}>
          <WagmiNft />
        </LivepeerConfig>
      </WagmiConfig>
    </Box>
  );
}
export default MintNftVideo
