import { Paper } from '@mui/material'
import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { GlobalMenu } from '../src/components/GrobalMenu'
import { TrafficVolumeChart } from '../src/components/TrafficVolumeChart'
import { Location } from '../src/domains/location'
import { Result } from '../src/domains/result'
import { getLocations } from '../src/usecases/api'

const Home: NextPage = () => {
  const [locations, setLocations] = useState<Location[]>([])
  const [result, setResult] = useState<Result>({ models: [], time: [] })

  useEffect(() => {
    getLocations(setLocations)
    const getResult = async () => {
      const httpRes: { data: { results: Result } } = await axios.get(
        process.env.NEXT_PUBLIC_API_ORIGIN + 'result'
      )
      setResult(httpRes.data.results)
    }
    getResult()
  }, [])

  return (
    <GlobalMenu locations={locations} header={'全域'}>
      <TrafficVolumeChart
        locationAddress='全体'
        models={result.models}
        time={result.time}
      />
    </GlobalMenu>
  )
}

export default Home
