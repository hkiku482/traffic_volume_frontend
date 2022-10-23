import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { Location } from '../domains/location';
import { Result } from '../domains/result';

export const getLocations = async (
  setLocations: Dispatch<SetStateAction<Location[]>>,
): Promise<void> => {
  const url = process.env.NEXT_PUBLIC_API_ORIGIN + 'location';
  const httpRes: { data: Location[] } = await axios.get(url);
  setLocations(httpRes.data);
};

export const getResult = async (
  setResult: Dispatch<SetStateAction<Result>>,
  locationId = '',
): Promise<void> => {
  const url =
    locationId === ''
      ? process.env.NEXT_PUBLIC_API_ORIGIN + 'result'
      : process.env.NEXT_PUBLIC_API_ORIGIN + locationId;

  const httpRes: { data: Result } = await axios.get(url);
  setResult(httpRes.data);
};
