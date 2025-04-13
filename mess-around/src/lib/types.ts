export interface Location {
  type: string;
  coordinates: {
    lat: string;
    long: string;
  } 
}

export interface Climb {
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
  location:Location;
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
  
export interface ClimbFilter {
  name: string;
  type:string;
  pitches: string;
  grade: string;
  rating: string;
  height: string;
}