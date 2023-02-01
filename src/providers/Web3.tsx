import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { SITE_NAME } from 'utils/config'
import { useColorMode } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { polygon, polygonMumbai } from '@wagmi/chains'

import { alchemyProvider } from 'wagmi/providers/alchemy'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

const API_KEY = process.env.NEXT_PUBLIC_WEB3_API_KEY

interface Props {
  children: ReactNode
}

const { provider, chains } = configureChains([polygon, polygonMumbai], [alchemyProvider({ apiKey: API_KEY })])

const client = createClient(
  getDefaultClient({
    appName: SITE_NAME,
    autoConnect: true,
    provider,
    chains,
  })
)

export function Web3Provider(props: Props) {
  const { colorMode } = useColorMode()

  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider mode={colorMode}>{props.children}</ConnectKitProvider>
    </WagmiConfig>
  )
}
