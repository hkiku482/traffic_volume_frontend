import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { GlobalMenu } from '../src/components/GrobalMenu'
import { TrafficVolumeChart } from '../src/components/TrafficVolumeChart'
import { Location } from '../src/domains/location'
import { Result } from '../src/domains/result'
import { getLocations, getResult } from '../src/usecases/api'

const Home: NextPage = () => {
  const [renderFlag, setRenderFlag] = useState<boolean>(false)
  const [locations, setLocations] = useState<Location[]>([])
  const [result, setResult] = useState<Result>({ models: [], time: [] })

  useEffect(() => {
    if (renderFlag) {
      getLocations(setLocations)
      getResult(setResult)
      return
    }
    setRenderFlag(true)
  }, [renderFlag])

  return (
    <GlobalMenu locations={locations}>
      <TrafficVolumeChart result={result} />
    </GlobalMenu>
  )
}

export default Home
