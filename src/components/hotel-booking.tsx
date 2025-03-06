"use client"

import { useState, useEffect } from "react"
import { useBooking, type Hotel } from "./booking-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, MapPin, Star, Search, SlidersHorizontal } from "lucide-react"
import { format } from "date-fns"
import Image from "next/image"

// Mock data for hotels
const mockHotels: Hotel[] = [
  {
    id: "1",
    name: "Grand Resort & Spa",
    location: "Miami Beach, FL",
    price: 299,
    rating: 4.8,
    amenities: ["Pool", "Spa", "Free WiFi", "Restaurant", "Parking"],
    image: "/placeholder.svg?height=300&width=500",
    description: "Luxury beachfront resort with stunning ocean views and world-class amenities.",
  },
  {
    id: "2",
    name: "City Center Hotel",
    location: "New York, NY",
    price: 199,
    rating: 4.5,
    amenities: ["Free WiFi", "Restaurant", "Fitness Center", "Business Center"],
    image: "/placeholder.svg?height=300&width=500",
    description: "Modern hotel in the heart of the city, walking distance to major attractions.",
  },
  {
    id: "3",
    name: "Mountain View Lodge",
    location: "Aspen, CO",
    price: 349,
    rating: 4.9,
    amenities: ["Ski-in/Ski-out", "Fireplace", "Hot Tub", "Restaurant", "Free WiFi"],
    image: "/placeholder.svg?height=300&width=500",
    description: "Cozy mountain lodge with breathtaking views and direct access to ski slopes.",
  },
  {
    id: "4",
    name: "Seaside Inn",
    location: "Santa Monica, CA",
    price: 249,
    rating: 4.6,
    amenities: ["Ocean View", "Pool", "Free WiFi", "Breakfast", "Parking"],
    image: "/placeholder.svg?height=300&width=500",
    description: "Charming beachside inn with comfortable rooms and a relaxed atmosphere.",
  },
  {
    id: "5",
    name: "Historic Downtown Hotel",
    location: "Charleston, SC",
    price: 229,
    rating: 4.7,
    amenities: ["Free WiFi", "Restaurant", "Bar", "Concierge", "Valet Parking"],
    image: "/placeholder.svg?height=300&width=500",
    description: "Elegant hotel in a restored historic building in the heart of downtown.",
  },
  {
    id: "6",
    name: "Family Resort & Waterpark",
    location: "Orlando, FL",
    price: 279,
    rating: 4.4,
    amenities: ["Waterpark", "Kids Club", "Multiple Pools", "Restaurants", "Free WiFi"],
    image: "/placeholder.svg?height=300&width=500",
    description: "Family-friendly resort with a waterpark and activities for all ages.",
  },
]

export default function HotelBooking() {
  const { bookingDetails, updateBookingDetails, setSelectedHotel, setCurrentStep } = useBooking()
  const [hotels, setHotels] = useState<Hotel[]>(mockHotels)
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>(mockHotels)
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 500])
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [sortOption, setSortOption] = useState("recommended")
  const [date, setDate] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: undefined,
    to: undefined,
  })


  useEffect(() => {
    let filtered = hotels
    if (searchTerm) {
      filtered = filtered.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    filtered = filtered.filter((hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1])

    if (selectedAmenities.length > 0) {
      filtered = filtered.filter((hotel) =>
        selectedAmenities.every((amenity) =>
          hotel.amenities.some((a) => a.toLowerCase().includes(amenity.toLowerCase())),
        ),
      )
    }


    if (sortOption === "price-low") {
      filtered = [...filtered].sort((a, b) => a.price - b.price)
    } else if (sortOption === "price-high") {
      filtered = [...filtered].sort((a, b) => b.price - a.price)
    } else if (sortOption === "rating") {
      filtered = [...filtered].sort((a, b) => b.rating - a.rating)
    }

    setFilteredHotels(filtered)
  }, [hotels, searchTerm, priceRange, selectedAmenities, sortOption])

  useEffect(() => {
    if (date.from && date.to) {
      updateBookingDetails({
        checkInDate: date.from,
        checkOutDate: date.to,
      })
    }
  }, [date, updateBookingDetails])

  const handleHotelSelect = (hotel: Hotel) => {
    setSelectedHotel(hotel)
    updateBookingDetails({
      hotel,
      totalPrice: calculateTotalPrice(hotel.price),
    })
    setCurrentStep("checkin")
  }

  const calculateTotalPrice = (pricePerNight: number) => {
    if (!date.from || !date.to) return pricePerNight

    const nights = Math.ceil((date.to.getTime() - date.from.getTime()) / (1000 * 60 * 60 * 24))
    return pricePerNight * nights
  }

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities((prev) => (prev.includes(amenity) ? prev.filter((a) => a !== amenity) : [...prev, amenity]))
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Find Your Perfect Stay</h2>
        <p className="text-muted-foreground">Search and book the ideal hotel for your family vacation</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[300px_1fr]">

        <div className="hidden md:block space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Price Range</Label>
                <div className="pt-4">
                  <Slider
                    defaultValue={[0, 500]}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                </div>
                <div className="flex justify-between text-sm">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Amenities</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["WiFi", "Pool", "Spa", "Restaurant", "Parking", "Gym"].map((amenity) => (
                    <Button
                      key={amenity}
                      variant={selectedAmenities.includes(amenity) ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleAmenity(amenity)}
                      className="justify-start"
                    >
                      {amenity}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Guest Rating</Label>
                <Select defaultValue="any">
                  <SelectTrigger>
                    <SelectValue placeholder="Any rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any rating</SelectItem>
                    <SelectItem value="4.5">4.5+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="3.5">3.5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
      
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search hotels or locations..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="md:hidden">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>

              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

      
          <Card>
            <CardContent className="p-4">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Check-in / Check-out</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date.from ? (
                          date.to ? (
                            <>
                              {format(date.from, "MMM d, yyyy")} - {format(date.to, "MMM d, yyyy")}
                            </>
                          ) : (
                            format(date.from, "MMM d, yyyy")
                          )
                        ) : (
                          <span>Select dates</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date.from}
                        selected={date}
                        onSelect={(range) => setDate({ from: range?.from, to: range?.to })}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Adults</Label>
                  <Select
                    value={bookingDetails.adults.toString()}
                    onValueChange={(value) => updateBookingDetails({ adults: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Adults" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Children</Label>
                  <Select
                    value={bookingDetails.children.toString()}
                    onValueChange={(value) => updateBookingDetails({ children: Number.parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Children" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 1, 2, 3, 4].map((num) => (
                        <SelectItem key={num} value={num.toString()}>
                          {num}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Hotel Listings */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">
                {filteredHotels.length} {filteredHotels.length === 1 ? "hotel" : "hotels"} available
              </h3>
            </div>

            {filteredHotels.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                  <div className="rounded-full bg-muted p-3 mb-4">
                    <Search className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No hotels found</h3>
                  <p className="text-muted-foreground mb-4">Try adjusting your filters or search criteria</p>
                  <Button
                    onClick={() => {
                      setSearchTerm("")
                      setPriceRange([0, 500])
                      setSelectedAmenities([])
                    }}
                  >
                    Reset filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredHotels.map((hotel) => (
                  <Card key={hotel.id} className="overflow-hidden">
                    <div className="relative h-48">
                      <Image src={hotel.image || "/placeholder.svg"} alt={hotel.name} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold">{hotel.name}</h3>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                          <span className="text-sm font-medium">{hotel.rating}</span>
                        </div>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground mb-3">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        <span>{hotel.location}</span>
                      </div>
                      <p className="text-sm line-clamp-2 mb-3">{hotel.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {hotel.amenities.slice(0, 3).map((amenity, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {amenity}
                          </Badge>
                        ))}
                        {hotel.amenities.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{hotel.amenities.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-bold text-lg">${hotel.price}</span>
                          <span className="text-sm text-muted-foreground"> / night</span>
                        </div>
                        <Button onClick={() => handleHotelSelect(hotel)}>Select</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

