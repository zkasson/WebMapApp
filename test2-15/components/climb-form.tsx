"use client"

import type React from "react"

import { useState } from "react"
import type { Climb, ClimbFormData } from "@/lib/types";
import { useClimbs } from "@/lib/climb-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ClimbForm() {
  const [formData, setFormData] = useState<ClimbFormData>({
    name: "",
    area: "",
    type: "",
    pitches: 0,
    grade: "",
    rating: 0,
    highlight: "",
    year: 0,
    notes: "",
    crag: "",
  });
  const [successMessage, setSuccessMessage] = useState<string>("");
  const {addClimb} = useClimbs()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted with data:", formData); 
  
    try {
      await addClimb(formData as ClimbFormData);  // Cast formData to ClimbFormData
      setFormData({
        name: "",
        area: "",
        type: "",
        pitches: 0,
        grade: "",
        rating: 0,
        highlight: "",
        year: 0,
        notes: "",
        crag: "",
      }); // Clear form fields
      setSuccessMessage("Climb added successfully!"); // Set success message
      setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
    } catch (error) {
      console.error("Error submitting form:", error); // Debug log
      alert("Error submitting form. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
  
    const isNumericField = ["pitches", "rating", "year"].includes(name);
    
    setFormData((prev) => ({
      ...prev,
      [name]: isNumericField ? (value ? Number(value) : 0) : value,
    }));
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Climb</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name || ""} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="area">Area</Label>
            <Input id="area" name="area" value={formData.area || ""} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="crag">Crag</Label>
            <Input id="crag" name="crag" value={formData.crag || ""} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Input id="type" name="type" value={formData.type || ""} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="grade">Grade</Label>
            <Input id="grade" name="grade" value={formData.grade || ""} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="rating">Rating</Label>
            <Input id="rating" name="rating" value={formData.rating || ""} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="pitches">Pitches</Label>
            <Input id="pitches" name="pitches" value={formData.pitches || ""} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="year">Year</Label>
            <Input id="year" name="year" value={formData.year || ""} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="highlight">Highlight</Label>
            <Input id="highlight" name="highlight" value={formData.highlight || ""} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" value={formData.notes || ""} onChange={handleChange} />
          </div>
          <Button type="submit">Add Climb</Button>
        </form>
      </CardContent>
    </Card>
  )
}

