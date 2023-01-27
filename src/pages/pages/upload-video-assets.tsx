import React, { useCallback, useContext, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { Button, FormControl, FormLabel, Heading, Textarea } from '@chakra-ui/react'
import UploadVideoAsset from '../../components/pages/UploadVideoAsset'
import UpdateVideoAsset from '../../components/pages/UpdateVideoAsset'

export default function Upload() {
  const router = useRouter()
  const assetId = useMemo(() => (router?.query?.assetId ? String(router?.query?.assetId) : undefined), [router?.query])

  return (
    <>
      <UploadVideoAsset>{''}</UploadVideoAsset>
    </>
  )
}
