import { Box } from '@mui/system'
import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { Result } from '../src/domains/result'

const Home: NextPage = () => {
  const [result, setResult] = useState<Result>({ models: [], time: [] })

  useEffect(() => {
    const getResult = async () => {
      const httpRes: { data: { results: Result } } = await axios.get(
        process.env.NEXT_PUBLIC_API_ORIGIN + 'result'
      )
      setResult(httpRes.data.results)
    }
    getResult()
  }, [])

  return (
    <Box>
      {JSON.stringify(result)}
    </Box>
  )
}

export default Home
