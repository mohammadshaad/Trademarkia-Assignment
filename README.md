# Trademark Search Results Table

This project is a React/Next.js application that displays trademark search results in a tabular format using custom UI components. The table shows the details of trademark marks, their statuses, and descriptions, while also providing visual cues for each trademark's status type.

## Deployed Site

You can view the live application at [https://shaad-trademarkia-frontend.vercel.app/](https://shaad-trademarkia-frontend.vercel.app/).

## Features

- **Responsive Table**: Displays search results in a clean, responsive table.
- **Dynamic Status Labeling**: Trademark statuses are color-coded and labeled based on their status type.
- **Image Handling**: Trademark marks are displayed as images fetched dynamically from a remote URL.
- **Description Truncation**: Long descriptions are truncated for a cleaner UI.
- **Class Display**: Trademark classes are displayed with an icon for better readability.

## Table of Contents

1. [Technologies Used](#technologies-used)
2. [Installation](#installation)
3. [Usage](#usage)
4. [Folder Structure](#folder-structure)

## Technologies Used

- **React.js**: JavaScript library for building user interfaces.
- **Next.js**: React framework for server-side rendering and building static websites.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **Shadcn UI**: UI component library used for styling table elements.
- **Tailwind CSS**: Utility-first CSS framework for custom styling.
- **Image Optimization**: Next.js `Image` component for optimized image rendering.

## Installation

1. Clone the repository:

```bash
   git clone https://github.com/mohammadshaad/21BCE1542_Frontend.git
````

2. Navigate to the project directory:

```bash
   cd trademark-table
```

3. Install dependencies:

```bash
   npm install
```

4. Start the development server:

```bash
   npm run dev
```

   Your application should now be running on [http://localhost:3000](http://localhost:3000).


## Folder Structure

```
.
├── components
│   └── ui
│       └── table.tsx          # UI components for the table
│   └── Navbar                 # Navbar component
│   └── SideFilter             # SideFilter component
├── hooks
│   └── use-toast.ts    # Custom hook for showing toast
├── public
│   └── icons                  # Icons used in the table
│   └── images                 # Sample images
├── types
│   └── SearchResult.ts        # Type definitions for search results
│   └── SideFilterProps.ts     # Type definitions for Side Filters
│   └── ApiResponseItem.ts     # Type definitions for API Response Data Type 
│   └── AggregationItem.ts     # Type definitions for API Response Data Type 
├── pages
│   └── index.tsx              # Entry point of the application
└── README.md                  # This readme file
```
