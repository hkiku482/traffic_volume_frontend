import { Button, CircularProgress, FormControl, FormHelperText, Grid, Input, InputLabel, MenuItem, Select, SelectChangeEvent, } from '@mui/material'
import axios from 'axios'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { GlobalMenu } from '../src/components/GrobalMenu'
import { Location } from '../src/domains/location'
import { getLocations } from '../src/usecases/api'

const Home: NextPage = () => {
  const [renderFlag, setRenderFlag] = useState<boolean>(false)
  const [locations, setLocations] = useState<Location[]>([])

  useEffect(() => {
    if (renderFlag) {
      getLocations(setLocations)
      setInprogress(false)
      return
    }
    setRenderFlag(true)

  }, [renderFlag])

  // form controll
  const [locationId, setLocationId] = useState<string>('')
  const [locationIdError, setLocationIdError] = useState(false)

  const [image, setImage] = useState<string | ArrayBuffer | null>(null)
  const [imageError, setImageError] = useState<boolean>(false)

  const [inProgress, setInprogress] = useState<boolean>(true)
  const [isSending, setIsSending] = useState<boolean>(false)

  const handleSubmit = async () => {
    // error handling
    setIsSending(true)
    let e = false
    if (locationId === '') {
      e = true
      setLocationIdError(true)
    }
    if (image === null) {
      e = true
      setImageError(true)
    }
    if (e) {
      return
    }

    const httpRes: { data: { presigned_url: string } } = await axios.post(
      process.env.NEXT_PUBLIC_API_ORIGIN + 'presigned_url',
      {
        location_id: locationId
      }
    )

    await axios.put(
      httpRes.data.presigned_url,
      image,
      {
        headers: {
          'Content-Type': 'image/jpeg',
        }
      }
    )
    setLocationIdError(false)
    setLocationId('')
    setImageError(false)
    setImage(null)
    setIsSending(false)
  }

  return (
    <GlobalMenu locations={locations}>
      <Grid container spacing={1}>
        <Grid item xs={8}>
          {inProgress ? (
            <CircularProgress />
          ) : (
            <FormControl fullWidth={true} error={locationIdError}>
              <InputLabel>地点</InputLabel>
              <Select
                required
                fullWidth
                label='地点'
                value={locationId}
                onChange={(event: SelectChangeEvent) => {
                  setLocationId(event.target.value)
                }}
              >
                {
                  locations.map((location) => {
                    return (
                      <MenuItem key={location.id} value={location.id}>{location.address}</MenuItem>
                    )
                  })
                }
              </Select>
              <FormHelperText hidden={!locationIdError}>送信元の地点を選択してください</FormHelperText>
            </FormControl>
          )}
        </Grid>
        <Grid item xs={4}>
          <FormControl fullWidth error={imageError}>
            <Input required onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.files !== null) {
                const fileReader = new FileReader()
                fileReader.onload = (e) => {
                  setImage(fileReader.result)
                }
                fileReader.readAsArrayBuffer(event.target.files[0])
              }
            }} error={imageError} name='image' type='file' />
            <FormHelperText hidden={!imageError}>送信する画像を選択してください</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Button
            type='submit'
            variant='contained'
            onClick={handleSubmit}
          >
            送信
          </Button>
        </Grid>
        <Grid item xs={3}>
          {isSending ?
            (
              <CircularProgress />
            ) : (
              <></>
            )
          }
        </Grid>

      </Grid>
    </GlobalMenu >
  )
}

export default Home
