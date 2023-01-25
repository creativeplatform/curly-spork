import { useAsset, useUpdateAsset } from '@livepeer/react';
import { Types } from 'aptos';

import { useRouter } from 'next/router';

import { useCallback, useContext, useMemo, useState } from 'react';

import {
  CreateAptosTokenBody,
  CreateAptosTokenResponse,
} from '../../pages/api/create-aptos-nft';

import { AptosContext } from './MintNftVideo';

import {
  Box, Button, Flex
} from "@chakra-ui/react";
import { motion } from "framer-motion"

declare global {
  interface Window {
    aptos: any;
  }
}

const AptosNft = () => {
  const aptosClient = useContext(AptosContext);

  const isAptosDefined = useMemo(
    () => (typeof window !== 'undefined' ? Boolean(window?.aptos) : false),
    [],
  );

  const [address, setAddress] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    try {
      if (isAptosDefined) {
        await window.aptos.connect();
        const account: { address: string } = await window.aptos.account();

        setAddress(account.address);
      }
    } catch (e) {
      console.error(e);
    }
  }, [isAptosDefined]);

  const router = useRouter();

  const assetId = useMemo(
    () => (router?.query?.assetId ? String(router?.query?.assetId) : undefined),
    [router?.query],
  );

  const {
    data: asset,
    status: assetStatus,
  } = useAsset({
    assetId,
    enabled: assetId?.length === 36,
    refetchInterval: (asset) =>
      asset?.storage?.status?.phase !== 'ready' ? 5000 : false,
  });
  const { mutate: updateAsset, status: updateStatus } = useUpdateAsset(asset
    ? {
      assetId: asset.id,
      storage: {
        ipfs: true,
      },
    }
    : null,
  );

  const [isCreatingNft, setIsCreatingNft] = useState(false);

  const [creationHash, setCreationHash] = useState('');

  const mintNft = useCallback(async () => {
    setIsCreatingNft(true);

    try {
      if (address && aptosClient && asset?.storage?.ipfs?.nftMetadata?.url) {
        const body: CreateAptosTokenBody = {
          receiver: address,
          metadataUri: asset.storage.ipfs.nftMetadata.url,
        };

        const response = await fetch('/api/create-aptos-nft', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        const json = (await response.json()) as CreateAptosTokenResponse

        if ((json as CreateAptosTokenResponse).tokenName) {
          const createResponse = json as CreateAptosTokenResponse;

          const transaction = {
            type: 'entry_function_payload',
            function: '0x3::token_transfers::claim_script',
            arguments: [
              createResponse.creator,
              createResponse.creator,
              createResponse.collectionName,
              createResponse.tokenName,
              createResponse.tokenPropertyVersion,
            ],
            type_arguments: [],
          };

          const aptosResponse: Types.PendingTransaction =
            await window.aptos.signAndSubmitTransaction(transaction);

          const result = await aptosClient.waitForTransactionWithResult(
            aptosResponse.hash,
            { checkSuccess: true },
          );

          setCreationHash(result.hash);
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsCreatingNft(false);
    }
  }, [
    address,
    aptosClient,
    asset?.storage?.ipfs?.nftMetadata?.url,
    setIsCreatingNft,
  ]);

  return (
    <Box className='address-mint'>
      <Button className='card-mint-button'
        as={motion.div} _hover={{ transform: "scale(1.1)" }}
        disabled={!isAptosDefined || Boolean(address)}
        onClick={connectWallet}
      >
        {!address ? (
          'Connect Wallet'
        ) : (
          address
        )}
      </Button>
      {address && (
        <>
          <Flex>
            {asset?.status?.phase === 'ready' &&
              asset?.storage?.status?.phase !== 'ready' ? (
              <Button className='card-mint-button'
                as={motion.div} _hover={{ transform: "scale(1.1)" }}
                onClick={() => {
                  updateAsset?.();
                }}
                disabled={
                  !updateAsset || !assetId || Boolean(asset?.storage?.ipfs?.cid)
                }
              >
                Upload to IPFS
              </Button>
            ) : creationHash ? (
              <a href={`https://explorer.aptoslabs.com/txn/${creationHash}?network=Devnet`} className='card-mint-button'>
                View Mint Transaction
              </a>
            ) : asset?.storage?.status?.phase === 'ready' ? (
              <Button className='card-mint-button'
                as={motion.div} _hover={{ transform: "scale(1.1)" }}
                onClick={mintNft}
              >
                Mint NFT
              </Button>
            ) : (
              <></>
            )}
          </Flex>
        </>
      )}
    </Box>
  );
};
export default AptosNft