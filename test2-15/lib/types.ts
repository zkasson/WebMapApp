export interface Climb {
  _id: string
  name: string
  area: string
  type: string
  pitches: number
  grade: string
  rating: number
  highlight: string
  year: number
  notes: string
  crag: string
  latitude: number
  longitude: number
}

export interface ClimbFormData {
  name: string;
  area: string;
  type: string;
  pitches: number;
  grade: string;
  rating: number;
  highlight: string;
  year: number;
  notes: string;
  crag: string;
}
