# Heet Patel - Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Vite. Features smooth animations and integration with Google's Generative AI.

## Features

- ✨ Modern, responsive design
- 🎨 Smooth animations with Framer Motion
- ⚡ Fast development with Vite
- 🎯 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🤖 Google Generative AI integration (Gemini API)
- 📱 Mobile-friendly interface

## Tech Stack

- **Frontend:** React 19, TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **AI:** Google Generative AI SDK

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env.local` file and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_api_key_here
   ```
   Get your API key from [Google AI Studio](https://aistudio.google.com/app/apikey)

## Running Locally

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

## Building for Production

Build the optimized production bundle:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run TypeScript type checking
- `npm run clean` - Remove dist folder

## Project Structure

```
src/
├── App.tsx          # Main application component
├── main.tsx         # Application entry point
└── index.css        # Global styles

public/
├── heetprofile.jpeg # Profile image
└── profile_photo.png

index.html          # HTML template
package.json        # Project dependencies
tailwind.config.js  # Tailwind CSS configuration
tsconfig.json       # TypeScript configuration
vite.config.ts      # Vite configuration
```

## License

This project is open source and available under the MIT License.

## Contact

- Email: nakraniheet.work@gmail.com
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [Your GitHub Profile]
