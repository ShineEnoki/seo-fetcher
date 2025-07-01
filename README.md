# SEO Fetcher

A simple web application that fetches and displays SEO-related data from any given URL. Built with Next.js and TypeScript.

## Features

- Fetches and displays page title and meta description
- Extracts Open Graph (OG) tags (title, description, image, URL)
- Shows canonical URL
- Displays meta keywords
- Responsive design that works on all devices

## Getting Started

1. Install the dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How to Use

1. Enter a URL in the input field (e.g., `example.com` or `https://example.com`)
2. Click "Fetch SEO Data" or press Enter
3. View the extracted SEO information

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [JSDOM](https://github.com/jsdom/jsdom) - For parsing HTML and extracting meta tags

## API Endpoint

The application includes an API endpoint at `/api/fetch-seo` that accepts a `url` query parameter and returns the SEO data in JSON format.

Example request:
```
GET /api/fetch-seo?url=https://example.com
```

## License

This project is open source and available under the [MIT License](LICENSE).
