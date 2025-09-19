import { SearchResult } from './googleSearchService';

export interface DirectUrlPattern {
  platform: string;
  searchUrl: string;
  domain: string;
}

class DirectSearchService {
  private readonly urlPatterns: DirectUrlPattern[] = [
    {
      platform: 'eBay',
      searchUrl: 'https://www.ebay.com/sch/i.html?_nkw=',
      domain: 'ebay.com'
    },
    {
      platform: 'Amazon US',
      searchUrl: 'https://www.amazon.com/s?k=',
      domain: 'amazon.com'
    },
    {
      platform: 'Target',
      searchUrl: 'https://www.target.com/s?searchTerm=',
      domain: 'target.com'
    },
    {
      platform: 'StockX',
      searchUrl: 'https://stockx.com/search?s=',
      domain: 'stockx.com'
    },
    {
      platform: 'Farfetch',
      searchUrl: 'https://www.farfetch.com/shopping/search/items.aspx?q=',
      domain: 'farfetch.com'
    }
  ];

  // Generate direct search URLs when Google search is not available
  generateDirectSearchUrls(query: string): { [platform: string]: SearchResult[] } {
    const results: { [platform: string]: SearchResult[] } = {};
    
    this.urlPatterns.forEach(pattern => {
      const searchUrl = pattern.searchUrl + encodeURIComponent(query);
      results[pattern.platform] = [{
        title: `${query} | ${pattern.platform}`,
        url: searchUrl,
        snippet: `Search results for "${query}" on ${pattern.platform}`
      }];
    });
    
    return results;
  }

  // Get all supported platforms
  getSupportedPlatforms(): string[] {
    return this.urlPatterns.map(pattern => pattern.platform);
  }

  // Get platform info
  getPlatformInfo(platform: string): DirectUrlPattern | undefined {
    return this.urlPatterns.find(p => p.platform === platform);
  }
}

const directSearchService = new DirectSearchService();
export default directSearchService;