export interface ICarTrack {
  car_id: number
  locations: {
    lat: number
    lon: number
  }[]
  state_number: string
  car_name: string
  distance_covered: number
}

export interface ICarTrackModified extends ICarTrack {
  color: string
  colorDark: string
}
