# HR Dashboard

## Overview
The HR Dashboard is a modern, responsive web application designed to streamline HR processes, including managing available positions, tracking employees, scheduling, and monitoring job openings. The dashboard provides key metrics such as total employees, department-wise distribution, and recent activities.

![alt text](https://github.com/spranjal3301/xipper/blob/main/preview.png?raw=true)

## Features
- **Dashboard Overview**: Displays total employees, available positions, urgent hiring needs, and talent requests.
- **Employee Management**: View department-wise employee statistics, including gender distribution.
- **Scheduling**: Tracks upcoming schedules and announcements.
- **Job Openings**: Displays new job openings and hiring trends.
- **Recent Activities**: Logs recent HR activities and new employee additions.
- **Landing Page**: An additional marketing page created for assignment purposes.

## Tech Stack
- **Frontend**: Next.js15/React19, Tailwind CSS 4, Framer Motion
- **Backend**: Next.js API Routes, Prisma ORM, PostgreSQL
- **Authentication**: NextAuth.js
- **Deployment**: Hosted on Vercel

## Project Structure
```
└── spranjal3301-wehr/
    ├── README.md
    ├── components.json
    ├── eslint.config.mjs
    ├── next.config.ts
    ├── package.json
    ├── pnpm-lock.yaml
    ├── postcss.config.mjs
    ├── tsconfig.json
    ├── public/
    └── src/
        ├── app/
        │   ├── globals.css
        │   ├── layout.tsx
        │   ├── (marketing)/
        │   │   ├── layout.tsx
        │   │   ├── _components/
        │   │   │   └── header.tsx
        │   │   └── dashboard/
        │   │       └── page.tsx
        │   └── (website)/
        │       └── page.tsx
        ├── components/
        ├── hooks/
        ├── icons/
        └── lib/
```

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/spranjal3301/WeHR
   ```
2. Navigate to the project directory:
   ```sh
   cd spranjal3301-wehr
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





