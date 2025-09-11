import { SearchQuery, ApiPriceData } from './types';
import ebayService from './ebayService';
import amazonService from './amazonService';
import targetService from './targetService';
import stockxService from './stockxService';
import farfetchService from './farfetchService';

class PriceComparisonService {
  private services = [
    ebayService,
    amazonService,
    targetService,
    stockxService,
    farfetchService
  ];

  async searchAllPlatforms(query: string): Promise<ApiPriceData[]> {
    const searchQuery: SearchQuery = {
      query,
      region: 'HK',
      currency: 'HKD'
    };

    try {
      // Call all services in parallel for better performance
      const promises = this.services.map(service => 
        service.searchProducts(searchQuery).catch((error: any) => {
          console.error(`Service failed:`, error);
          return { success: false, data: [], error: error.message };
        })
      );

      const results = await Promise.all(promises);
      
      // Combine all successful results
      const allData: ApiPriceData[] = [];
      results.forEach(result => {
        if (result.success && result.data.length > 0) {
          allData.push(...result.data);
        }
      });

      return allData;
    } catch (error) {
      console.error('Error searching platforms:', error);
      return [];
    }
  }

  async searchSpecificPlatforms(query: string, platformNames: string[]): Promise<ApiPriceData[]> {
    const searchQuery: SearchQuery = {
      query,
      region: 'HK',
      currency: 'HKD'
    };

    const serviceMap: { [key: string]: any } = {
      'eBay': ebayService,
      'Amazon US': amazonService,
      'Target': targetService,
      'StockX': stockxService,
      'Farfetch': farfetchService
    };

    const selectedServices = platformNames
      .map(name => serviceMap[name])
      .filter(service => service);

    try {
      const promises = selectedServices.map(service => 
        service.searchProducts(searchQuery).catch((error: any) => {
          console.error(`Service failed:`, error);
          return { success: false, data: [], error: error.message };
        })
      );

      const results = await Promise.all(promises);
      
      const allData: ApiPriceData[] = [];
      results.forEach(result => {
        if (result.success && result.data.length > 0) {
          allData.push(...result.data);
        }
      });

      return allData;
    } catch (error) {
      console.error('Error searching specific platforms:', error);
      return [];
    }
  }
}

const priceComparisonService = new PriceComparisonService();
export default priceComparisonService;