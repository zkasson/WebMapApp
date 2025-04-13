export interface Climb {
  id: number // Unique identifier
  name: string // Name of the climb
  area: string // General climbing area
  type: string // Type (Sport, Trad, Boulder)
  pitches: string // Number of pitches
  grade: string // Difficulty grade
  rating: string // Star rating
  highlight: string // Notable features
  year: string // Year established
  notes: string // Additional notes
  crag: string // Specific crag/wall
  latitude: number // Geographic coordinates
  longitude: number // Geographic coordinates
}

// Define a geographic location
export interface Location {
  latitude: number
  longitude: number
}

export interface LocationInterface {
  type: string;
  coordinates: {
    lat: string;
    long: string;
  } 
}

export interface ClimbInterface {
  _id: string; // Optional because MongoDB generates this automatically
  name: string;
  area: string;
  type: "Trad" | "Sport" | "Boulder" | "Alpine" | "Mixed" | "Select Climb Type"; // Types of climbing
  pitches: string;
  rating: "1 Star" | "1.5 Stars" | "2 Stars" | "2.5 Stars" | "3 Stars" | "3.5 Stars" | "4 Stars" | "4.5 Stars" | "5 Stars" | "Select Rating"; 
  year: number;
  highlight:string;
  notes: string;
  crag: string;
  grade: string;
  location:LocationInterface;
}
  
export interface ClimbFormData {
  name: string;
  area: string;
  type: string;
  pitches: string;
  grade: string;
  rating: string;
  year: number;
  highlight:string;
  notes: string;
  crag: string;
  location:Location;
}

export interface ClimbUpdatedFormData {
  _id: string;
  name: string;
  area: string;
  type: string;
  pitches: string;
  grade: string;
  rating: string;
  year: number;
  highlight:string;
  notes: string;
  crag: string;
  location:Location;
}
  
export interface ClimbFilter {
  name: string;
  type:string;
  pitches: string;
  grade: string;
  rating: string;
  height: string;
}

