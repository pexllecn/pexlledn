# [shadcn/ui templates](https://pexlledn.vercel.app/)

A stunning and functional retractable sidebar for Next.js built on top of [shadcn/ui](https://ui.shadcn.com) complete with desktop and mobile responsiveness.

## Features

- Retractable mini and wide sidebar
- Scrollable sidebar menu
- Sheet menu for mobile
- Grouped menu with labels
- Collapsible submenu
- Extracted menu items list

## Tech/framework used

- Next.js 14
- Shadcn/ui
- Tailwind CSS
- TypeScript
- Zustand

## Starting the project locally

1. Clone the repository

   ```bash
   git clone https://github.com/pexllecn/pexlledn
   ```

2. Copy `.env.example` to `.env` and fill in your Stripe keys

   ```bash
   cp .env.example .env
   ```

3. Install dependencies (including the Stripe package)

   ```bash
   npm install
   ```

## Demo

The app is hosted on Vercel. [Click here](https://pexlledn.vercel.app/dashboard) to visit.
<br>
Direct demo link: `https://pexlledn.vercel.app/dashboard`

## Premium Access

The `/premium` page demonstrates how to lock features behind a subscription. Users can upgrade via Stripe checkout.

## Screenshots

#### Light mode

![Light mode](/public/dashboard.png)

#### Dark mode

![Dark mode](/public/dashboardd.png)


#### Sheet menu

<img src="/public/mdashboard.png" width="300">
