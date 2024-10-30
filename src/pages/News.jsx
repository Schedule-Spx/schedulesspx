import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [featuredStory, setFeaturedStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const { currentTheme } = useTheme();

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      const proxyUrl = 'https://simple-proxy.devs4u.workers.dev/';
      const targetUrl = 'https://spxgoldenlines.com/feed/';
      const response = await fetch(`${proxyUrl}?destination=${encodeURIComponent(targetUrl)}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");
      const items = xmlDoc.querySelectorAll('item');
      
      const parsedArticles = Array.from(items).map(item => ({
        title: item.querySelector('title')?.textContent,
        link: item.querySelector('link')?.textContent,
        pubDate: item.querySelector('pubDate')?.textContent,
        description: item.querySelector('description')?.textContent,
        content: item.querySelector('content\\:encoded')?.textContent,
        imageUrl: getImageUrl(item)
      }));

      setArticles(parsedArticles);
      selectFeaturedStory(parsedArticles);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setLoading(false);
    }
  };

  const getImageUrl = (item) => {
    // Try to get image from content:encoded
    const content = item.querySelector('content\\:encoded')?.textContent;
    if (content) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = content;
      const img = tempDiv.querySelector('img');
      if (img) {
        // Get the largest image from srcset if available
        const srcset = img.getAttribute('srcset');
        if (srcset) {
          const sources = srcset.split(',')
            .map(src => {
              const [url, width] = src.trim().split(' ');
              return {
                url,
                width: width ? parseInt(width.replace('w', '')) : 0
              };
            })
            .sort((a, b) => b.width - a.width);
          
          if (sources.length > 0) {
            return sources[0].url;
          }
        }
        return img.getAttribute('src');
      }
    }

    // Try to get image from description
    const description = item.querySelector('description')?.textContent;
    if (description) {
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = description;
      const img = tempDiv.querySelector('img');
      if (img) {
        return img.getAttribute('src');
      }
    }

    // Additional fallbacks
    const mediaContent = item.querySelector('media\\:content');
    if (mediaContent && mediaContent.getAttribute('medium') === 'image') {
      return mediaContent.getAttribute('url');
    }

    const enclosure = item.querySelector('enclosure');
    if (enclosure && enclosure.getAttribute('type')?.startsWith('image/')) {
      return enclosure.getAttribute('url');
    }

    return null;
  };

  const selectFeaturedStory = (articles) => {
    const currentDate = new Date();
    const weekNumber = Math.floor(currentDate.getTime() / (7 * 24 * 60 * 60 * 1000));
    const randomIndex = weekNumber % articles.length;
    setFeaturedStory(articles[randomIndex]);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const FeaturedArticle = ({ article }) => (
    <div className={`${currentTheme.main} rounded-lg shadow-lg overflow-hidden border-2 ${currentTheme.border} relative animate-fadeIn`}>
      <div className="flex flex-col md:flex-row relative">
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 rounded-lg"
          style={{
            background: `linear-gradient(to top right, ${currentTheme.accent}33, transparent)`,
            zIndex: 1
          }}
        />
        
        {article.imageUrl && (
          <div className="md:w-2/3 relative z-10">
            <img 
              src={article.imageUrl} 
              alt={article.title || 'Featured article image'} 
              className="w-full h-64 md:h-[500px] object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.classList.remove('md:w-2/3');
                e.target.parentElement.parentElement.querySelector('div:last-child').classList.remove('md:w-1/3');
                e.target.parentElement.parentElement.querySelector('div:last-child').classList.add('w-full');
              }}
            />
          </div>
        )}
        <div className={`p-6 ${article.imageUrl ? 'md:w-1/3' : 'w-full'} flex flex-col justify-between relative z-10`}>
          <div>
            <span className={`${currentTheme.accent} ${currentTheme.text} text-sm font-bold px-3 py-1 rounded-lg mb-2 inline-block`}>
              Featured Story
            </span>
            <h2 className={`${currentTheme.text} text-2xl md:text-3xl font-bold mb-4`}>{article.title}</h2>
            <p className={`${currentTheme.text} opacity-80 text-sm mb-4`}>{formatDate(article.pubDate)}</p>
            <div 
              className={`${currentTheme.text} mb-6 overflow-hidden line-clamp-4`}
              dangerouslySetInnerHTML={{__html: article.description}}
            />
          </div>
          <a 
            href={article.link} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${currentTheme.accent} ${currentTheme.text} font-bold py-3 px-6 rounded-lg inline-block transition-all duration-300 hover:opacity-80`}
          >
            Read Full Story
          </a>
        </div>
      </div>
    </div>
  );

  const ArticleCard = ({ article, index }) => (
    <div 
      className={`${currentTheme.main} rounded-lg shadow-lg overflow-hidden border-2 ${currentTheme.border} relative animate-fadeIn h-full flex flex-col`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 rounded-lg"
        style={{
          background: `linear-gradient(to top right, ${currentTheme.accent}33, transparent)`,
          zIndex: 1
        }}
      />
      
      {article.imageUrl && (
        <div className="relative z-10 h-56">
          <img 
            src={article.imageUrl} 
            alt={article.title || 'Article image'} 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.style.height = '0';
            }}
          />
        </div>
      )}
      <div className={`p-5 relative z-10 flex-grow flex flex-col ${!article.imageUrl ? 'h-full' : ''}`}>
        <h2 className={`${currentTheme.text} text-xl font-semibold mb-2 line-clamp-2`}>{article.title}</h2>
        <p className={`${currentTheme.text} opacity-80 text-sm mb-3`}>{formatDate(article.pubDate)}</p>
        <div 
          className={`${currentTheme.text} mb-4 overflow-hidden line-clamp-3 flex-grow`}
          dangerouslySetInnerHTML={{__html: article.description}}
        />
        <a 
          href={article.link} 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`${currentTheme.accent} ${currentTheme.text} font-bold py-2 px-4 rounded-lg inline-block transition-all duration-300 hover:opacity-80 mt-auto`}
        >
          Read More
        </a>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="h-screen overflow-y-auto">
        <div className={`${currentTheme.main} w-full min-h-screen flex items-center justify-center`}>
          <div className={`${currentTheme.main} rounded-lg shadow-lg p-8 border-2 ${currentTheme.border} relative`}>
            <div 
              className="absolute inset-0 rounded-lg"
              style={{
                background: `linear-gradient(to top right, ${currentTheme.accent}33, transparent)`,
                zIndex: 1
              }}
            />
            <div className={`${currentTheme.text} text-center text-xl relative z-10 animate-pulse`}>
              Loading news...
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto">
      <div className={`${currentTheme.main} w-full`}>
        <div className="container mx-auto px-4 py-6">
          <h1 className={`text-4xl font-bold mb-8 text-center ${currentTheme.text}`}>Latest News</h1>
          
          {featuredStory && (
            <div className="mb-12">
              <FeaturedArticle article={featuredStory} />
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto pb-12">
            {articles
              .filter(article => article !== featuredStory)
              .map((article, index) => (
                <div key={index} className="h-full">
                  <ArticleCard article={article} index={index} />
                </div>
              ))}
          </div>
        </div>
        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default News;
