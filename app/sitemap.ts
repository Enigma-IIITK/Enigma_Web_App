
export default function sitemap() {
    ['/','/team','/blog','/signup','/login','/events','/people','/contact']
    return [
      {
        url: 'https://enigma.iiitkottayam.ac.in',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
      {
        url: 'https://enigma.iiitkottayam.ac.in/team',
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: 'https://enigma.iiitkottayam.ac.in/blog',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.5,
      },
      {
        url: 'https://enigma.iiitkottayam.ac.in/signup',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: 'https://enigma.iiitkottayam.ac.in/login',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: 'https://enigma.iiitkottayam.ac.in/events',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: 'https://enigma.iiitkottayam.ac.in/people',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      },
      {
        url: 'https://enigma.iiitkottayam.ac.in/contact',
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.8,
      }
    ]
  }
