import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowBigLeft,
  ArrowBigRight,
  CalendarIcon,
  GlobeIcon,
  MapPinIcon,
  PalmtreeIcon,
  PlaneIcon,
  SearchIcon,
} from "lucide-react";
import Image from "next/image";

type Props = {};

const Hero = (props: Props) => {
  return (
    <section className="relative h-[600px] md:h-[700px] overflow-hidden">
      <Image
        src="/placeholder.svg?height=700&width=1920"
        alt="Beautiful beach destination"
        width={1920}
        height={700}
        className="absolute inset-0 object-cover w-full h-full"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
      <div className="container relative z-10 flex flex-col items-start justify-center h-full px-4 mx-auto space-y-6 text-white">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Badimalika temple
        </h1>
        <p className="max-w-xl text-lg text-white/90">
          Badimalika Temple is a Hindu temple. It is located in Triveni
          Municipality, Bajura district. It is one of the major temples in
          Nepal. It is dedicated to Bhagwati. Malika Chaturdashi is its major
          festival. It is served by two priests, one representing the Kalikot
          district, and the other Bajura district. Badimalika Triveni Patan
        </p>
        <div className="w-full max-w-xl p-4 mt-8 bg-white rounded-lg shadow-lg text-black flex  gap-2 font-bold">
          Hotel Booking <Awo/> Web Check-In <Awo/>  Checkout
        </div>
      </div>
    </section>
  );
};

function Awo(){
    return (
        <>-----&gt;</> 
     )
} 

export default Hero;
