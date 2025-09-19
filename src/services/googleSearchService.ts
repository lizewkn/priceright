import axios from 'axios';
import * as cheerio from 'cheerio';
import directSearchService from './directSearchService';

export interface SearchResult {
  title: string;
  url: string;
  snippet?: string;
}

class GoogleSearchService {
  private readonly baseUrl = 'https://www.google.com/search';
  
  async searchProducts(query: string, site?: string): Promise<SearchResult[]> {
    try {
      const searchQuery = site ? `site:${site} ${query}` : query;
      const params = {
        q: searchQuery,
        num: 10, // Number of results
        hl: 'en', // Language
        safe: 'active'
      };

      const response = await axios.get(this.baseUrl, {
        params,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        },
        timeout: 10000
      });

      return this.parseSearchResults(response.data);
    } catch (error) {
      console.error('Google search error:', error);
      
      // Fallback to direct URLs when Google search fails
      if (site) {
        return this.generateDirectUrl(query, site);
      }
      
      return [];
    }
  }

  // Generate direct URL when Google search fails
  private generateDirectUrl(query: string, site: string): SearchResult[] {
    const platformName = this.getPlatformName(site);
    const platformInfo = directSearchService.getPlatformInfo(platformName);
    
    if (platformInfo) {
      const directUrl = platformInfo.searchUrl + encodeURIComponent(query);
      return [{
        title: `${query} | ${platformName}`,
        url: directUrl,
        snippet: `Direct search for "${query}" on ${platformName}`
      }];
    }
    
    return [];
  }

  private parseSearchResults(html: string): SearchResult[] {
    const $ = cheerio.load(html);
    const results: SearchResult[] = [];

    // Parse Google search results
    $('div[data-ved]').each((_, element) => {
      const titleElement = $(element).find('h3').first();
      const linkElement = $(element).find('a[href^="/url?q="]').first();
      const snippetElement = $(element).find('span').filter((_, el) => {
        const text = $(el).text();
        return text.length > 50 && !$(el).find('*').length; // Likely description text
      }).first();

      if (titleElement.length && linkElement.length) {
        const href = linkElement.attr('href');
        if (href) {
          // Extract actual URL from Google's redirect URL
          const urlMatch = href.match(/\/url\?q=([^&]+)/);
          if (urlMatch) {
            const decodedUrl = decodeURIComponent(urlMatch[1]);
            results.push({
              title: titleElement.text().trim(),
              url: decodedUrl,
              snippet: snippetElement.text().trim() || undefined
            });
          }
        }
      }
    });

    return results.slice(0, 5); // Return top 5 results
  }

  // Get search results for specific e-commerce sites
  async searchEcommerceSites(query: string): Promise<{ [platform: string]: SearchResult[] }> {
    const sites = [
      'ebay.com',
      'amazon.com',
      'target.com',
      'stockx.com',
      'farfetch.com'
    ];

    const results: { [platform: string]: SearchResult[] } = {};

    // Search each site in parallel
    const searchPromises = sites.map(async (site) => {
      try {
        const siteResults = await this.searchProducts(query, site);
        const platformName = this.getPlatformName(site);
        results[platformName] = siteResults;
      } catch (error) {
        console.error(`Search error for ${site}:`, error);
        
        // Use direct URL fallback
        const platformName = this.getPlatformName(site);
        const directResults = this.generateDirectUrl(query, site);
        results[platformName] = directResults;
      }
    });

    await Promise.all(searchPromises);
    
    // If all Google searches failed, use direct URLs for all platforms
    const hasResults = Object.values(results).some(platformResults => platformResults.length > 0);
    if (!hasResults) {
      return directSearchService.generateDirectSearchUrls(query);
    }
    
    return results;
  }

  private getPlatformName(domain: string): string {
    const platformMap: { [key: string]: string } = {
      'ebay.com': 'eBay',
      'amazon.com': 'Amazon US',
      'target.com': 'Target',
      'stockx.com': 'StockX',
      'farfetch.com': 'Farfetch'
    };
    return platformMap[domain] || domain;
  }
}

const googleSearchService = new GoogleSearchService();
export default googleSearchService;