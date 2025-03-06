import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GlobeIcon, MenuIcon, UserIcon } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import ClerkAuthState from "@/components/profile"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex items-center justify-between h-16 px-4 mx-auto">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold">
          <GlobeIcon className="w-6 h-6 text-primary" />
          <span>Xipper</span>
        </Link>
        <nav className="hidden space-x-6 md:flex">
          <Link href="/destinations" className="text-sm font-medium transition-colors hover:text-primary">
            Destinations
          </Link>
          <Link href="/packages" className="text-sm font-medium transition-colors hover:text-primary">
            Packages
          </Link>
          <Link href="/deals" className="text-sm font-medium transition-colors hover:text-primary">
            Special Deals
          </Link>
          <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About Us
          </Link>
          <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
        {/* <UserIcon className="w-5 h-5" /> */}
        <ClerkAuthState/>
          <Button className="hidden md:inline-flex">Book Now</Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <MenuIcon className="w-5 h-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                <Link href="/destinations" className="text-sm font-medium transition-colors hover:text-primary">
                  Destinations
                </Link>
                <Link href="/packages" className="text-sm font-medium transition-colors hover:text-primary">
                  Packages
                </Link>
                <Link href="/deals" className="text-sm font-medium transition-colors hover:text-primary">
                  Special Deals
                </Link>
                <Link href="/about" className="text-sm font-medium transition-colors hover:text-primary">
                  About Us
                </Link>
                <Link href="/contact" className="text-sm font-medium transition-colors hover:text-primary">
                  Contact
                </Link>
                <Separator />
                <Link href="/login" className="text-sm font-medium transition-colors hover:text-primary">
                  Login
                </Link>
                <Link href="/register" className="text-sm font-medium transition-colors hover:text-primary">
                  Register
                </Link>
                <Button>Book Now</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

