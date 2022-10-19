import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { Location } from '../domains/location';

export const getLocations = async (
  setLocations: Dispatch<SetStateAction<Location[]>>,
): Promise<void> => {
  const url = process.env.NEXT_PUBLIC_API_ORIGIN + 'location';
  const httpRes: { data: Location[] } = await axios.get(url);
  setLocations(httpRes.data);
};
