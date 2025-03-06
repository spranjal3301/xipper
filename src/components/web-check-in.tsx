"use client"

import { useState } from "react"
import { useBooking } from "./booking-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, User, Phone, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { format } from "date-fns"

export default function WebCheckIn() {
  const { bookingDetails, updateFamilyMember, addFamilyMember, removeFamilyMember, setCurrentStep } = useBooking()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [successMessage, setSuccessMessage] = useState("")


  const validatePhoneNumber = (phoneNumber: string) => {

   // const phoneRegex = /^$$?([0-9]{3})$$?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
    return true;
  }

  const handlePhoneNumberChange = (id: string, phoneNumber: string) => {
    updateFamilyMember(id, { phoneNumber })

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[id]
        return newErrors
      })
    }
  }

  const handleAddFamilyMember = () => {
    const newId = `member-${Date.now()}`
    const isChild = bookingDetails.familyMembers.length >= bookingDetails.adults

    addFamilyMember({
      id: newId,
      name: isChild
        ? `Child ${bookingDetails.familyMembers.length - bookingDetails.adults + 1}`
        : `Adult ${bookingDetails.familyMembers.length + 1}`,
      phoneNumber: "",
      isCheckedIn: false,
    })
  }

  const handleRemoveFamilyMember = (id: string) => {
    removeFamilyMember(id)

    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[id]
        return newErrors
      })
    }
  }

  const handleCheckIn = (id: string) => {
    const member = bookingDetails.familyMembers.find((m) => m.id === id)

    if (!member) return

    if (!validatePhoneNumber(member.phoneNumber)) {
      setErrors((prev) => ({
        ...prev,
        [id]: "Please enter a valid phone number",
      }))
      return
    }

    updateFamilyMember(id, { isCheckedIn: true })


    if (errors[id]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[id]
        return newErrors
      })
    }

    setSuccessMessage(`${member.name} has been successfully checked in!`)
    setTimeout(() => setSuccessMessage(""), 3000)
  }

  const handleContinue = () => {
    const allCheckedIn = bookingDetails.familyMembers.every((member) => member.isCheckedIn)

    if (!allCheckedIn) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        bookingDetails.familyMembers.forEach((member) => {
          if (!member.isCheckedIn) {
            newErrors[member.id] = "Please check in this family member"
          }
        })
        return newErrors
      })
      return
    }

    setCurrentStep("checkout")
  }

  const handleBack = () => {
    setCurrentStep("booking")
  }

  if (!bookingDetails.hotel) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">Please select a hotel first</h3>
        <Button onClick={handleBack}>Go to Hotel Selection</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Web Check-In</h2>
        <p className="text-muted-foreground">Enter phone numbers for each family member to complete check-in</p>
      </div>

      {successMessage && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertTitle className="text-green-800">Success</AlertTitle>
          <AlertDescription className="text-green-700">{successMessage}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Booking Summary</CardTitle>
          <CardDescription>Review your booking details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="relative h-20 w-20 overflow-hidden rounded-md">
                  <Image
                    src={bookingDetails.hotel.image || "/placeholder.svg"}
                    alt={bookingDetails.hotel.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{bookingDetails.hotel.name}</h3>
                  <p className="text-sm text-muted-foreground">{bookingDetails.hotel.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Check-in</p>
                  <p>
                    {bookingDetails.checkInDate ? format(bookingDetails.checkInDate, "MMM d, yyyy") : "Not selected"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Check-out</p>
                  <p>
                    {bookingDetails.checkOutDate ? format(bookingDetails.checkOutDate, "MMM d, yyyy") : "Not selected"}
                  </p>
                </div>
                <div>
                  <p className="font-medium">Guests</p>
                  <p>
                    {bookingDetails.adults} Adults, {bookingDetails.children} Children
                  </p>
                </div>
                <div>
                  <p className="font-medium">Total Price</p>
                  <p className="font-semibold">${bookingDetails.totalPrice}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Family Members</h3>
          {bookingDetails.familyMembers.length < bookingDetails.adults + bookingDetails.children && (
            <Button onClick={handleAddFamilyMember} variant="outline" size="sm">
              <Plus className="mr-1 h-4 w-4" /> Add Member
            </Button>
          )}
        </div>

        <div className="grid gap-4">
          {bookingDetails.familyMembers.map((member, index) => (
            <Card key={member.id} className={member.isCheckedIn ? "border-green-200 bg-green-50" : ""}>
              <CardContent className="p-4">
                <div className="grid gap-4 md:grid-cols-[1fr_1fr_auto]">
                  <div className="space-y-2">
                    <Label htmlFor={`name-${member.id}`}>Name</Label>
                    <div className="flex items-center border rounded-md px-3 py-2 bg-muted">
                      <User className="mr-2 h-4 w-4 text-muted-foreground" />
                      <span>{member.name}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`phone-${member.id}`}>Aadhaar Number</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id={`phone-${member.id}`}
                        type="tel"
                        placeholder="1234 4567 8901"
                        className={`pl-9 ${errors[member.id] ? "border-red-500" : ""}`}
                        value={member.phoneNumber}
                        onChange={(e) => handlePhoneNumberChange(member.id, e.target.value)}
                        disabled={member.isCheckedIn}
                      />
                      {errors[member.id] && <p className="text-red-500 text-xs mt-1">{errors[member.id]}</p>}
                    </div>
                  </div>

                  <div className="flex items-end gap-2">
                    {!member.isCheckedIn ? (
                      <>
                        <Button onClick={() => handleCheckIn(member.id)} disabled={!member.phoneNumber}>
                          Check In
                        </Button>
                        {index >= bookingDetails.adults && (
                          <Button variant="ghost" size="icon" onClick={() => handleRemoveFamilyMember(member.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </>
                    ) : (
                      <div className="flex items-center text-green-600">
                        <CheckCircle2 className="mr-1 h-5 w-5" />
                        <span>Checked In</span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {Object.keys(errors).length > 0 && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>Please check in all family members before proceeding to checkout.</AlertDescription>
          </Alert>
        )}

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleContinue}>Continue to Checkout</Button>
        </div>
      </div>
    </div>
  )
}

