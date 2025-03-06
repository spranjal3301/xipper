# Hotel Check-In to Checkout Automation UI

## Overview
Implement a fully responsive web application that automates the process from hotel booking to web check-in and finally to checkout. The solution should be built using React and Tailwind CSS, and it must provide a seamless and intuitive experience for users booking a hotel for their family vacation.

![alt text](https://github.com/spranjal3301/xipper/blob/main/preview.png?raw=true)

## Features
- **Book a Hotel**: Select their desired hotel based on available options.
- **Web Check-In**: Once booked, perform a web check-in by entering and validating phone numbers for each family member.
- **Checkout**: Experience a streamlined checkout process at the end of their stay.
- **Responsive Design**: The application should be fully responsive and work on all devices.
- **Landing Page**: An additional marketing page created for assignment purposes.

## Tech Stack
- **Frontend**: Next.js15/React19, Tailwind CSS 4, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Authentication**: NextAuth.js
- **Deployment**: Hosted on Vercel

## Project Structure
```
Directory structure:
└── spranjal3301-xipper/
    ├── README.md
    ├── components.json
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── package.json
    ├── pnpm-lock.yaml
    ├── postcss.config.mjs
    ├── tsconfig.json
    ├── prisma/
    │   └── schema.prisma
    ├── public/
    └── src/
        ├── middleware.ts
        ├── app/
        │   ├── globals.css
        │   ├── layout.tsx
        │   ├── (auth)/
        │   │   ├── sign-in/
        │   │   │   └── [[...sign-in]]/
        │   │   │       └── page.tsx
        │   │   └── sign-up/
        │   │       └── [[...sign-up]]/
        │   │           └── page.tsx
        │   ├── (protected)/
        │   │   ├── _components/
        │   │   │   ├── footer.tsx
        │   │   │   ├── header.tsx
        │   │   │   └── hero.tsx
        │   │   └── dashboard/
        │   │       └── page.tsx
        │   └── (website)/
        │       └── page.tsx
        ├── components/
        │   ├── Header.tsx
        │   ├── Hero.tsx
        │   ├── booking-context.tsx
        │   ├── checkout.tsx
        │   ├── hotel-booking.tsx
        │   ├── profile.tsx
        │   ├── theme-provider.tsx
        │   ├── theme-toggle.tsx
        │   ├── web-check-in.tsx
        │   └── ui/
        ├── hooks/
        │   └── use-mobile.ts
        └── lib/
            └── utils.ts

```

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/spranjal3301/xipper
   ```
2. Navigate to the project directory:
   ```sh
   cd spranjal3301-xipper
   ```
3. Install dependencies:
   ```sh
   pnpm install
   ```
4. Start the development server:
   ```sh
   pnpm dev
   ```

## Deployment
The project is deployed on **Vercel**. To deploy manually:
```sh
vercel deploy
```

## Contributing
Feel free to submit issues or pull requests for improvements.

## License
This project is licensed under the MIT License.





