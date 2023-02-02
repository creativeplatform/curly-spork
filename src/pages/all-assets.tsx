import React from 'react'
import { useRouter } from 'next/router'
import AllAssets from './discover'
import { BreadcrumbItem, Icon, BreadcrumbLink, Breadcrumb } from '@chakra-ui/react'

export default function All() {
  const router = useRouter()
  return (
    <>
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink onClick={() => router.push('/')}>Home</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbItem isCurrentPage className="active-crumb">
          <BreadcrumbLink href="#">All Assets</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>
      <AllAssets>{''}</AllAssets>
    </>
  )
}
