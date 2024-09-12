import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules:[
    {
        userAgent: 'Googlebot',
        allow: ['/','/team','/blog','/signup','/login','/events','/people','/contact'],
        disallow: ['/private/'],
      },
      {
        userAgent: ['Applebot', 'Bingbot'],
        allow: ['/','/team','/blog','/signup','/login','/events','/people','/contact'],
        disallow: ['/'],
      },
    ],
    sitemap: 'https://enigma.iiitkottayam.ac.in/sitemap.xml',
  }
}