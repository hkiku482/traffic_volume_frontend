import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { GlobalMenu } from '../src/components/GrobalMenu'
import { Location } from '../src/domains/location'
import { getLocations } from '../src/usecases/api'

const Home: NextPage = () => {
  const [renderFlag, setRenderFlag] = useState<boolean>(false)
  const [locations, setLocations] = useState<Location[]>([])

  useEffect(() => {
    if (renderFlag) {
      getLocations(setLocations)
      return
    }
    setRenderFlag(true)
  }, [renderFlag])

  return (
    <GlobalMenu locations={locations}>
      <></>
    </GlobalMenu>
  )
}

export default Home
