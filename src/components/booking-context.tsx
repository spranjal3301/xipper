"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type Hotel = {
  id: string
  name: string
  location: string
  price: number
  rating: number
  amenities: string[]
  image: string
  description: string
}

export type FamilyMember = {
  id: string
  name: string
  phoneNumber: string
  isCheckedIn: boolean
}

export type BookingDetails = {
  hotel: Hotel | null
  checkInDate: Date | null
  checkOutDate: Date | null
  adults: number
  children: number
  familyMembers: FamilyMember[]
  totalPrice: number
  paymentMethod: string | null
}

type BookingContextType = {
  currentStep: "booking" | "checkin" | "checkout"
  setCurrentStep: (step: "booking" | "checkin" | "checkout") => void
  bookingDetails: BookingDetails
  updateBookingDetails: (details: Partial<BookingDetails>) => void
  selectedHotel: Hotel | null
  setSelectedHotel: (hotel: Hotel | null) => void
  updateFamilyMember: (id: string, data: Partial<FamilyMember>) => void
  addFamilyMember: (member: FamilyMember) => void
  removeFamilyMember: (id: string) => void
}

const defaultBookingDetails: BookingDetails = {
  hotel: null,
  checkInDate: null,
  checkOutDate: null,
  adults: 2,
  children: 0,
  familyMembers: [
    { id: "1", name: "Adult 1", phoneNumber: "", isCheckedIn: false },
    { id: "2", name: "Adult 2", phoneNumber: "", isCheckedIn: false },
  ],
  totalPrice: 0,
  paymentMethod: null,
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState<"booking" | "checkin" | "checkout">("booking")
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>(defaultBookingDetails)
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null)

  const updateBookingDetails = (details: Partial<BookingDetails>) => {
    setBookingDetails((prev) => ({ ...prev, ...details }))
  }

  const updateFamilyMember = (id: string, data: Partial<FamilyMember>) => {
    setBookingDetails((prev) => ({
      ...prev,
      familyMembers: prev.familyMembers.map((member) => (member.id === id ? { ...member, ...data } : member)),
    }))
  }

  const addFamilyMember = (member: FamilyMember) => {
    setBookingDetails((prev) => ({
      ...prev,
      familyMembers: [...prev.familyMembers, member],
    }))
  }

  const removeFamilyMember = (id: string) => {
    setBookingDetails((prev) => ({
      ...prev,
      familyMembers: prev.familyMembers.filter((member) => member.id !== id),
    }))
  }

  return (
    <BookingContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        bookingDetails,
        updateBookingDetails,
        selectedHotel,
        setSelectedHotel,
        updateFamilyMember,
        addFamilyMember,
        removeFamilyMember,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}

