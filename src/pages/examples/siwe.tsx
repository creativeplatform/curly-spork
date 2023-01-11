import * as React from 'react'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { SiweMessage } from 'siwe'
import { useEffect, useState } from 'react'
import { SITE_NAME } from 'utils/config'
import { Button, Heading, ListItem, UnorderedList } from '@chakra-ui/react'
import { LinkComponent } from 'components/layout/LinkComponent'
import { NextSeo } from 'next-seo'

function SignInButton() {
  const [loggedInAddress, setLoggedInAddress] = useState('')
  const { address } = useAccount()
  const { chain } = useNetwork()
  const { signMessageAsync } = useSignMessage()

  // Fetch user when:
  useEffect(() => {
    const handler = async () => {
      try {
        const res = await fetch('/api/account')
        const json = await res.json()
        if (json.address) {
          setLoggedInAddress(json.address)
        }
      } catch (_error) {}
    }

    // 1. page loads
    handler()

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener('focus', handler)
    return () => window.removeEventListener('focus', handler)
  }, [])

  const signIn = async () => {
    try {
      const chainId = chain?.id
      if (!address || !chainId) return

      // 1. Get random nonce from API
      const nonceRes = await fetch('/api/account/nonce')
      const nonce = await nonceRes.text()

      // 2. Create SIWE message with pre-fetched nonce and sign with wallet
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: `Sign in with Ethereum to ${SITE_NAME}.`,
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: nonce,
      })

      // 3. Sign message
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })

      // 3. Verify signature
      const verifyRes = await fetch('/api/account/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      })

      if (!verifyRes.ok) throw new Error('Error verifying message')

      setLoggedInAddress(address)
    } catch (error) {
      console.error(error)
      setLoggedInAddress('')
    }
  }

  async function logout() {
    await fetch('/api/account/logout')
    setLoggedInAddress('')
  }

  return (
    <div>
      {!loggedInAddress && (
        <>
          <Button onClick={signIn}>Sign-in With Ethereum</Button>
        </>
      )}

      {loggedInAddress && (
        <>
          <Button onClick={logout}>Sign Out</Button>
        </>
      )}
    </div>
  )
}

export default function SiweExample() {
  const { isConnected } = useAccount()

  if (isConnected) {
    return (
      <>
        <SignInButton />
      </>
    )
  }

  return <div>Connect your wallet first to sign-in with Ethereum.</div>
}
