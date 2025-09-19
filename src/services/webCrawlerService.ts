import axios from 'axios';
import * as cheerio from 'cheerio';
import { ApiPriceData } from './types';

export interface CrawlResult {
  title: string;
  price: number;
  currency: string;
  image: string;
  availability: string;
  url: string;
  platform: string;
}

class WebCrawlerService {
  private readonly headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate',
    'Connection': 'keep-alive',
    'Upgrade-Insecure-Requests': '1'
  };

  async crawlProductPage(url: string, platform: string): Promise<CrawlResult | null> {
    try {
      const response = await axios.get(url, {
        headers: this.headers,
        timeout: 15000,
        maxRedirects: 5
      });

      const $ = cheerio.load(response.data);
      
      switch (platform.toLowerCase()) {
        case 'ebay':
          return this.crawlEbayProduct($, url, platform);
        case 'amazon us':
        case 'amazon':
          return this.crawlAmazonProduct($, url, platform);
        case 'target':
          return this.crawlTargetProduct($, url, platform);
        case 'stockx':
          return this.crawlStockXProduct($, url, platform);
        case 'farfetch':
          return this.crawlFarfetchProduct($, url, platform);
        default:
          return this.crawlGenericProduct($, url, platform);
      }
    } catch (error) {
      console.error(`Crawling error for ${url}:`, error);
      return null;
    }
  }

  private crawlEbayProduct($: cheerio.Root, url: string, platform: string): CrawlResult | null {
    try {
      // eBay selectors
      const title = $('#itm-details-header h1, .x-item-title-label').first().text().trim() ||
                   $('h1[data-testid="product-details-name"]').first().text().trim();
      
      const priceText = $('.notranslate', '.price').first().text() ||
                       $('[data-testid="price"] .currency').first().text() ||
                       $('.u-flL.condText').first().text();
      
      const image = $('#icImg, .ux-image-magnify img, [data-testid="image"]').first().attr('src') ||
                   $('.zoom img').first().attr('src');
      
      const availability = $('.u-flL.condText, .avail-qty').first().text().trim() || 'Available';

      const price = this.extractPrice(priceText);
      
      if (!title || price === 0) return null;

      return {
        title,
        price,
        currency: 'USD',
        image: image || '',
        availability,
        url,
        platform
      };
    } catch (error) {
      console.error('eBay crawling error:', error);
      return null;
    }
  }

  private crawlAmazonProduct($: cheerio.Root, url: string, platform: string): CrawlResult | null {
    try {
      // Amazon selectors
      const title = $('#productTitle, .product-title').first().text().trim();
      
      const priceText = $('.a-price .a-offscreen').first().text() ||
                       $('.a-price-whole').first().text() + '.' + $('.a-price-fraction').first().text() ||
                       $('#price_inside_buybox').first().text();
      
      const image = $('#landingImage, .a-dynamic-image').first().attr('src') ||
                   $('.imgTagWrapper img').first().attr('src');
      
      const availability = $('#availability span, .a-declarative').first().text().trim() || 'In Stock';

      const price = this.extractPrice(priceText);
      
      if (!title || price === 0) return null;

      return {
        title,
        price,
        currency: 'USD',
        image: image || '',
        availability,
        url,
        platform
      };
    } catch (error) {
      console.error('Amazon crawling error:', error);
      return null;
    }
  }

  private crawlTargetProduct($: cheerio.Root, url: string, platform: string): CrawlResult | null {
    try {
      // Target selectors
      const title = $('[data-test="product-title"], h1').first().text().trim();
      
      const priceText = $('[data-test="product-price"] span, .price').first().text() ||
                       $('.sr-only').filter((_, el) => $(el).text().includes('$')).first().text();
      
      const image = $('[data-test="product-image"] img, .product-image img').first().attr('src');
      
      const availability = $('[data-test="fulfillment-shipping"], .availability').first().text().trim() || 'In Stock';

      const price = this.extractPrice(priceText);
      
      if (!title || price === 0) return null;

      return {
        title,
        price,
        currency: 'USD',
        image: image || '',
        availability,
        url,
        platform
      };
    } catch (error) {
      console.error('Target crawling error:', error);
      return null;
    }
  }

  private crawlStockXProduct($: cheerio.Root, url: string, platform: string): CrawlResult | null {
    try {
      // StockX selectors
      const title = $('h1, .product-title').first().text().trim();
      
      const priceText = $('.product-price, .price').first().text() ||
                       $('[data-testid="product-price"]').first().text();
      
      const image = $('.product-media img, .product-image img').first().attr('src');
      
      const availability = $('.availability, .stock-status').first().text().trim() || 'Available';

      const price = this.extractPrice(priceText);
      
      if (!title || price === 0) return null;

      return {
        title,
        price,
        currency: 'USD',
        image: image || '',
        availability,
        url,
        platform
      };
    } catch (error) {
      console.error('StockX crawling error:', error);
      return null;
    }
  }

  private crawlFarfetchProduct($: cheerio.Root, url: string, platform: string): CrawlResult | null {
    try {
      // Farfetch selectors
      const title = $('[data-testid="product-name"], h1').first().text().trim();
      
      const priceText = $('[data-testid="product-price"], .price').first().text();
      
      const image = $('[data-testid="product-image"] img, .product-image img').first().attr('src');
      
      const availability = $('[data-testid="availability"], .availability').first().text().trim() || 'In Stock';

      const price = this.extractPrice(priceText);
      
      if (!title || price === 0) return null;

      return {
        title,
        price,
        currency: 'USD',
        image: image || '',
        availability,
        url,
        platform
      };
    } catch (error) {
      console.error('Farfetch crawling error:', error);
      return null;
    }
  }

  private crawlGenericProduct($: cheerio.Root, url: string, platform: string): CrawlResult | null {
    try {
      // Generic selectors for unknown sites
      const title = $('h1').first().text().trim() ||
                   $('[class*="title"], [class*="product-name"]').first().text().trim();
      
      const priceText = $('[class*="price"], [class*="cost"]').first().text() ||
                       $('[data-testid*="price"]').first().text();
      
      const image = $('img[class*="product"], img[class*="main"]').first().attr('src') ||
                   $('meta[property="og:image"]').attr('content');
      
      const availability = $('[class*="stock"], [class*="availability"]').first().text().trim() || 'Available';

      const price = this.extractPrice(priceText);
      
      if (!title || price === 0) return null;

      return {
        title,
        price,
        currency: 'USD',
        image: image || '',
        availability,
        url,
        platform
      };
    } catch (error) {
      console.error('Generic crawling error:', error);
      return null;
    }
  }

  private extractPrice(priceText: string): number {
    if (!priceText) return 0;
    
    // Remove common currency symbols and text
    const cleanText = priceText
      .replace(/[^\d.,]/g, '') // Keep only digits, dots, and commas
      .replace(/,/g, ''); // Remove commas
    
    const price = parseFloat(cleanText);
    return isNaN(price) ? 0 : price;
  }

  // Convert crawl result to API price data format
  convertToApiPriceData(crawlResult: CrawlResult): ApiPriceData {
    const hkdPrice = crawlResult.price * 7.8; // Convert USD to HKD
    const shipping = this.estimateShipping(crawlResult.platform);
    
    return {
      id: `crawled_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      platform: crawlResult.platform,
      price: Number(hkdPrice.toFixed(2)),
      currency: 'HKD',
      shipping: Number((shipping * 7.8).toFixed(2)),
      shippingToHK: this.getShippingToHK(crawlResult.platform),
      url: crawlResult.url,
      image: crawlResult.image,
      title: crawlResult.title,
      availability: crawlResult.availability
    };
  }

  private estimateShipping(platform: string): number {
    // Estimate shipping costs based on platform
    const shippingMap: { [key: string]: number } = {
      'eBay': Math.random() * 50 + 10,
      'Amazon US': Math.random() > 0.6 ? 0 : Math.random() * 30 + 15,
      'Target': 0, // Target often doesn't ship internationally
      'StockX': Math.random() * 40 + 20,
      'Farfetch': Math.random() * 60 + 30
    };
    
    return shippingMap[platform] || Math.random() * 25 + 10;
  }

  private getShippingToHK(platform: string): boolean {
    const shippingMap: { [key: string]: boolean } = {
      'eBay': true,
      'Amazon US': true,
      'Target': false,
      'StockX': true,
      'Farfetch': true
    };
    
    return shippingMap[platform] !== false;
  }
}

const webCrawlerService = new WebCrawlerService();
export default webCrawlerService;