import { NextResponse } from 'next/server';
import { JSDOM } from 'jsdom';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Fetch the HTML content of the URL
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const { document } = dom.window;

    // Helper function to get meta content
    const getMetaContent = (name: string, property?: string): string => {
      const meta = document.querySelector(
        property 
          ? `meta[property="${property}"]` 
          : `meta[name="${name}"]`
      ) as HTMLMetaElement | null;
      return meta ? meta.content : '';
    };

    // Extract SEO data
    const seoData = {
      title: document.title,
      description: getMetaContent('description'),
      ogTitle: getMetaContent('', 'og:title'),
      ogDescription: getMetaContent('', 'og:description'),
      ogImage: getMetaContent('', 'og:image'),
      ogUrl: getMetaContent('', 'og:url'),
      canonical: (document.querySelector('link[rel="canonical"]') as HTMLLinkElement)?.href || url,
      metaKeywords: getMetaContent('keywords'),
    };

    return NextResponse.json(seoData);
  } catch (error) {
    console.error('Error fetching URL:', error);
    return NextResponse.json(
      { error: 'Failed to fetch or parse the URL' },
      { status: 500 }
    );
  }
}
