import { Button, CircularProgress, FormControl, FormHelperText, Grid, Input, InputLabel, MenuItem, Select, SelectChangeEvent, } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import type { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { v4 } from 'uuid'
import { GlobalMenu } from '../src/components/GrobalMenu'
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
      setInprogress(false)
      return
    }
    setRenderFlag(true)

  }, [renderFlag])

  // form controll
  const [locationId, setLocationId] = useState<string>('')
  const [locationIdError, setLocationIdError] = useState(false)

  const [imageList, setImageList] = useState<FileList>()
  const [imageListError, setImageListError] = useState(false)

  const [inProgress, setInprogress] = useState<boolean>(true)

  const handleSubmit = async () => {
    let e = false
    if (locationId === '') {
      e = true
      setLocationIdError(true)
    }
    if (!imageList) {
      e = true
      setImageListError(true)
    }
    if (e) {
      return
    }
    const httpRes: { data: { presigned_url: string } } = await axios.post(process.env.NEXT_PUBLIC_API_ORIGIN + 'presigned_url', {
      location_id: locationId
    })
    setPresignedUrl(httpRes.data.presigned_url)
    console.log(imageList![0])
    console.log(presignedUrl)
    await axios.put(
      presignedUrl,
      imageList![0],
      {
        headers: {
          'Content-Type': 'image/jpeg',
          'Content-Encoding': 'base64'
        }
      }
    )
  }

  return (
    <GlobalMenu locations={locations}>
      <Grid container spacing={2}>
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
          <FormControl fullWidth error={imageListError}>
            <Input required onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.files !== null) {
                setImageList(event.target.files)
              }
            }} error={imageListError} name='image' type='file' />
            <FormHelperText hidden={!imageListError}>送信する画像を選択してください</FormHelperText>
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
      </Grid>
    </GlobalMenu >
  )
}

export default Home
