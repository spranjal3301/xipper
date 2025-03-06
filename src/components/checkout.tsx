"use client"

import { useState } from "react"
import { useBooking } from "./booking-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { CheckCircle2, CreditCard, Landmark, Wallet } from "lucide-react"
import Image from "next/image"
import { format } from "date-fns"

export default function Checkout() {
  const { bookingDetails, updateBookingDetails, setCurrentStep } = useBooking()
  const [paymentMethod, setPaymentMethod] = useState<string>(bookingDetails.paymentMethod || "credit-card")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const handleBack = () => {
    setCurrentStep("checkin")
  }

  const handlePaymentMethodChange = (value: string) => {
    setPaymentMethod(value)
    updateBookingDetails({ paymentMethod: value })
  }

  const handleCheckout = () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setIsComplete(true)
    }, 2000)
  }

  const handleNewBooking = () => {
    window.location.href = "/"
  }

  if (!bookingDetails.hotel) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium mb-2">Please select a hotel first</h3>
        <Button onClick={() => setCurrentStep("booking")}>Go to Hotel Selection</Button>
      </div>
    )
  }

  if (isComplete) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-green-100 p-3 mb-4">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Checkout Complete!</h2>
        <p className="text-muted-foreground mb-6 max-w-md">
          Thank you for your booking. Your reservation at {bookingDetails.hotel.name} has been confirmed. A confirmation
          email has been sent to your email address.
        </p>
        <div className="bg-muted p-4 rounded-lg mb-6 w-full max-w-md">
          <h3 className="font-medium mb-2">Booking Reference</h3>
          <p className="text-2xl font-mono tracking-wider">HOTEL-{Math.floor(100000 + Math.random() * 900000)}</p>
        </div>
        <Button onClick={handleNewBooking}>Make Another Booking</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Checkout</h2>
        <p className="text-muted-foreground">Review your booking and complete payment</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Booking Summary</CardTitle>
              <CardDescription>Review your booking details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-md">
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
                  <div className="mt-2 flex flex-wrap gap-1">
                    {bookingDetails.hotel.amenities.slice(0, 3).map((amenity, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold"
                      >
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Check-in</p>
                  <p className="text-sm">
                    {bookingDetails.checkInDate
                      ? format(bookingDetails.checkInDate, "EEEE, MMM d, yyyy")
                      : "Not selected"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Check-out</p>
                  <p className="text-sm">
                    {bookingDetails.checkOutDate
                      ? format(bookingDetails.checkOutDate, "EEEE, MMM d, yyyy")
                      : "Not selected"}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium mb-2">Guests</p>
                <div className="space-y-2">
                  {bookingDetails.familyMembers.map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-sm">{member.name}</span>
                        <span className="text-xs text-muted-foreground ml-2">{member.phoneNumber}</span>
                      </div>
                      <div className="flex items-center text-green-600 text-sm">
                        <CheckCircle2 className="mr-1 h-4 w-4" />
                        <span>Checked In</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Select your preferred payment method</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={paymentMethod} onValueChange={handlePaymentMethodChange}>
                <div className="flex items-center space-x-2 rounded-md border p-4">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="flex flex-1 items-center gap-2 cursor-pointer">
                    <CreditCard className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Credit or Debit Card</p>
                      <p className="text-sm text-muted-foreground">Pay with Visa, Mastercard, or American Express</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-4 mt-2">
                  <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                  <Label htmlFor="bank-transfer" className="flex flex-1 items-center gap-2 cursor-pointer">
                    <Landmark className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Bank Transfer</p>
                      <p className="text-sm text-muted-foreground">Pay directly from your bank account</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 rounded-md border p-4 mt-2">
                  <RadioGroupItem value="pay-at-hotel" id="pay-at-hotel" />
                  <Label htmlFor="pay-at-hotel" className="flex flex-1 items-center gap-2 cursor-pointer">
                    <Wallet className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Pay at Hotel</p>
                      <p className="text-sm text-muted-foreground">Pay during your stay at the hotel</p>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Price Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {bookingDetails.checkInDate && bookingDetails.checkOutDate && (
                <div className="flex justify-between text-sm">
                  <span>
                    ${bookingDetails.hotel.price} x{" "}
                    {Math.ceil(
                      (bookingDetails.checkOutDate.getTime() - bookingDetails.checkInDate.getTime()) /
                        (1000 * 60 * 60 * 24),
                    )}{" "}
                    nights
                  </span>
                  <span>${bookingDetails.totalPrice}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Taxes & fees (10%)</span>
                <span>${Math.round(bookingDetails.totalPrice * 0.1)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${bookingDetails.totalPrice + Math.round(bookingDetails.totalPrice * 0.1)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button className="w-full" onClick={handleCheckout} disabled={isProcessing}>
                {isProcessing ? "Processing..." : "Complete Booking"}
              </Button>
              <Button variant="outline" className="w-full" onClick={handleBack}>
                Back
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

