'use client'
import React, { useState } from 'react';

interface SEODATA {
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogUrl: string;
  canonical: string;
  metaKeywords: string;
}

const Home = () => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [seoData, setSeoData] = useState<SEODATA | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFetch = async () => {
    if (!url) {
      setError('Please enter a valid URL');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Add https:// if not present
      const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
      
      const response = await fetch(`/api/fetch-seo?url=${encodeURIComponent(formattedUrl)}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch URL');
      }
      
      const data = await response.json();
      setSeoData(data);
    } catch (err) {
      console.error('Error fetching URL:', err);
      setError('Failed to fetch URL. Please check the URL and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen w-full flex justify-center items-center p-4 bg-gray-50'>
      <div className='w-full flex flex-col gap-6 p-6 bg-white rounded-lg shadow-2xl max-w-3xl'>
        <h1 className='text-3xl font-bold text-center text-gray-800'>SEO Fetcher</h1>
        
        <div className='w-full flex flex-col sm:flex-row gap-3'>
          <input
            type="text"
            placeholder='Enter URL (e.g., example.com)'
            className='flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleFetch()}
          />
          <button
            className={`px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors ${
              isLoading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
            onClick={handleFetch}
            disabled={isLoading}
          >
            {isLoading ? 'Fetching...' : 'Fetch SEO Data'}
          </button>
        </div>

        {error && (
          <div className='p-3 bg-red-50 text-red-700 rounded-lg border border-red-200'>
            {error}
          </div>
        )}

        {seoData && (
          <div className='mt-6 p-6 bg-gray-50 rounded-lg border border-gray-200'>
            <h2 className='text-xl font-semibold mb-4 text-gray-800'>SEO Data</h2>
            <div className='space-y-4'>
              <div>
                <h3 className='font-medium text-gray-700'>Title</h3>
                <p className='text-gray-900'>{seoData.title || 'Not found'}</p>
              </div>
              <div>
                <h3 className='font-medium text-gray-700'>Description</h3>
                <p className='text-gray-900'>{seoData.description || 'Not found'}</p>
              </div>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div>
                  <h3 className='font-medium text-gray-700'>OG Title</h3>
                  <p className='text-gray-900'>{seoData.ogTitle || 'Not found'}</p>
                </div>
                <div>
                  <h3 className='font-medium text-gray-700'>OG Description</h3>
                  <p className='text-gray-900'>{seoData.ogDescription || 'Not found'}</p>
                </div>
                <div>
                  <h3 className='font-medium text-gray-700'>OG Image</h3>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={seoData.ogImage} 
                    alt="OG Image" 
                    className='w-full h-auto'
                  />
                  {seoData.ogImage ? (
                    <a 
                      href={seoData.ogImage} 
                      target='_blank' 
                      rel='noopener noreferrer'
                      className='text-blue-600 hover:underline break-all'
                    >
                      {seoData.ogImage}
                    </a>
                  ) : (
                    <p className='text-gray-900'>Not found</p>
                  )}
                </div>
                <div>
                  <h3 className='font-medium text-gray-700'>Canonical URL</h3>
                  {seoData.canonical ? (
                    <a 
                      href={seoData.canonical} 
                      target='_blank' 
                      rel='noopener noreferrer'
                      className='text-blue-600 hover:underline break-all'
                    >
                      {seoData.canonical}
                    </a>
                  ) : (
                    <p className='text-gray-900'>Not found</p>
                  )}
                </div>
              </div>
              {seoData.metaKeywords && (
                <div>
                  <h3 className='font-medium text-gray-700'>Meta Keywords</h3>
                  <p className='text-gray-900'>{seoData.metaKeywords}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;