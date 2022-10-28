import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GlobalMenu } from '../src/components/GrobalMenu'
import { TrafficVolumeChart } from '../src/components/TrafficVolumeChart'
import { Location } from '../src/domains/location'
import { Result } from '../src/domains/result'
import { getLocations } from '../src/usecases/api'

const Home: NextPage = () => {
  const [locations, setLocations] = useState<Location[]>([])
  const [result, setResult] = useState<Result>({ models: [], time: [] })
  const [address, setAddress] = useState<string>('')
  const [locationId, setLocationId] = useState<string>('')

  const router = useRouter()

  useEffect(() => {
    getLocations(setLocations)
  }, [])

  useEffect(() => {
    if (router.asPath !== router.route) {
      if (String(router.query.location_id) !== '') {
        setLocationId(String(router.query.location_id))
      }
    }
  }, [router.asPath, router.query.location_id, router.route])

  useEffect(() => {
    const getAddress = async () => {
      if (locationId === undefined || locationId === '') return
      const httpRes: { data: { address: string } } = await axios.post(
        process.env.NEXT_PUBLIC_API_ORIGIN + 'current_location',
        {
          location_id: locationId
        }
      )
      setAddress(httpRes.data.address)
    }
    getAddress()
  }, [locationId])

  useEffect(() => {
    const getResult = async () => {
      if (locationId !== '') {
        const httpRes: { data: { results: Result } } = await axios.get(
          process.env.NEXT_PUBLIC_API_ORIGIN + locationId
        )
        setResult(httpRes.data.results)
      }
    }
    getResult()
  }, [locationId])

  return (
    <GlobalMenu locations={locations} header={address}>
      <TrafficVolumeChart
        locationAddress={address}
        models={result.models}
        time={result.time}
      />
    </GlobalMenu>
  )
}

export default Home

