import { FormControl, FormControlLabel, FormLabel, Input, Radio, RadioGroup } from '@mui/material'
import axios from 'axios'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { Location } from '../src/domains/location'
import { getLocations } from '../src/usecases/api'

const Home: NextPage = () => {
  const [renderFlag, setRenderFlag] = useState<boolean>(false)
  const [presignedUrl, setPresignedUrl] = useState<string>('')
  const [locations, setLocations] = useState<Location[]>([])

  useEffect(() => {
    if (renderFlag) {
      const getPresignedUrl = async (): Promise<void> => {
        const url: { data: { presigned_url: string } } = await axios.post(
          process.env.NEXT_PUBLIC_API_ORIGIN + 'presigned_url',
          {
            location_id: v4()
          }
        )
        setPresignedUrl(url.data.presigned_url)
      }
      getPresignedUrl()
      getLocations(setLocations)
      return
    }
    setRenderFlag(true)

  }, [renderFlag])

  const [file, setFile] = useState('')

  return (
    <FormControl>
      <FormLabel>地点</FormLabel>
      <RadioGroup>
        {
          locations.map((location) => {
            return (
              <FormControlLabel key={location.id} value={location.id} control={<Radio />} label={location.address} />
            )
          })
        }
      </RadioGroup>
      <FormLabel>画像</FormLabel>
      <Input type='file' />
    </FormControl>
  )
}

export default Home
