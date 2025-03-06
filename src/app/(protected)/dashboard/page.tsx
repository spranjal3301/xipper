import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookingProvider } from "@/components/booking-context";
import HotelBooking from "@/components/hotel-booking";
import WebCheckIn from "@/components/web-check-in";
import Checkout from "@/components/checkout";
import Footer from "../_components/footer";
import { Header } from "../_components/header";
import Hero from "../_components/hero";

export default function Home() {
  return (
    <BookingProvider>
      <div className="flex min-h-screen flex-col">
        <Header />

        <main className="flex-1">
        <Hero/>
          <Card className="border-none shadow-lg">
            <CardContent className="p-0">
              <Tabs defaultValue="booking" className="w-full">
                <div className="p-4 rounded-t-lg">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="booking">Hotel Booking</TabsTrigger>
                    <TabsTrigger value="checkin">Web Check-In</TabsTrigger>
                    <TabsTrigger value="checkout">Checkout</TabsTrigger>
                  </TabsList>
                  <div className="mt-4">
                    <Progress value={33} className="h-2 " />
                  </div>
                </div>

                <div className="p-6">
                  <TabsContent value="booking">
                    <HotelBooking />
                  </TabsContent>
                  <TabsContent value="checkin">
                    <WebCheckIn />
                  </TabsContent>
                  <TabsContent value="checkout">
                    <Checkout />
                  </TabsContent>
                </div>
              </Tabs>
            </CardContent>
          </Card>
        </main>

        <Footer />
      </div>
    </BookingProvider>
  );
}
