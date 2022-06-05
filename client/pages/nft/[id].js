import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

export default function NFT() {
  const router = useRouter()
  const { id } = router.query
  useEffect(() => {
    console.log(id)
  }, []);
  return (
    <p>{id}</p>
  )
}
