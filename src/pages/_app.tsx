import type { AppProps } from 'next/app'
import { createReactClient, studioProvider, LivepeerConfig } from '@livepeer/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Layout } from 'components/layout'
import { ChakraProvider } from 'providers/Chakra'
import { useIsMounted } from 'hooks/useIsMounted'
import { Seo } from 'components/layout/Seo'
import { Web3Provider } from 'providers/Web3'

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted()
  // Create a client
  const queryClient = new QueryClient()
  const client = createReactClient({
    provider: studioProvider({ apiKey: 'fc15d8a5-210b-4784-9db9-e5d2add9166d' }),
  })

  return (
    <LivepeerConfig client={client}>
      <ChakraProvider>
        <Seo />
        {isMounted && (
          <Web3Provider>
            <QueryClientProvider client={queryClient}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          </Web3Provider>
        )}
      </ChakraProvider>
    </LivepeerConfig>
  )
}
