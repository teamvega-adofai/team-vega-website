import React from 'react'
import { useRouter } from 'next/router'

export const useRefresh = (): [boolean, () => void] => {
  const [refreshing, setRefreshing] = React.useState(false)

  const router = useRouter()

  const refresh = async () => {
    setRefreshing(true)
    await router.replace(router.asPath)
    setRefreshing(false)
  }

  return [refreshing, refresh]
}
