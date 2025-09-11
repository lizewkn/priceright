// Service to fetch realistic product images from various sources
class ImageService {
  
  // Unsplash API for real product images (free tier available)
  private readonly unsplashBaseUrl = 'https://images.unsplash.com/photo-';
  
  // Product-specific image IDs from Unsplash for different categories
  private readonly productImages = {
    electronics: [
      '1560472354-a5b8c6ce0a40', // Headphones
      '1587831990-6e1b4d12ebcd', // iPhone
      '1565036522-5c35cd6c7936', // Laptop
      '1542751371-adc38448a05e', // Electronics
      '1585776245937-3f7f8c4c1b4c', // Gaming
    ],
    fashion: [
      '1441986300917-64674bd600d8', // Shoes
      '1434389677669-e08b4cac3105', // Fashion
      '1485462537746-965f33f7f6a7', // Clothing
      '1533060836206-3c3c4a2d5ae0', // Watch
      '1566479179817-9a2e6d30c48f', // Accessories
    ],
    home: [
      '1586023492031-74992e9b7b2e', // Home decor
      '1558618666-fca92c82b9c4', // Furniture
      '1571171637578-61ca2f908c9', // Kitchen
      '1493663284031-2e166c293af2', // Interior
      '1555041469-a586c61ea9bc', // Home
    ],
    sports: [
      '1571008887538-b36bb32f4571', // Sports equipment
      '1571019613454-1cb2f99b2d8b', // Fitness
      '1431440869236-80c4e76f1f8a', // Basketball
      '1578662996442-6cf58ac0e7b4', // Running
      '1544966503-7ad5dcb9b3b9', // Sports
    ],
    books: [
      '1481627834876-b7833e8f5570', // Books
      '1512820790803-83ca734da794', // Library
      '1507003211169-0a1dd7bf7510', // Reading
      '1481627834876-b7833e8f5570', // Education
      '1524995997946-a2c2e315a42f', // Study
    ],
    default: [
      '1556909114-f6e7ad7d3136', // General product
      '1505740420928-5e560c06d30e', // Shopping
      '1472851294608-c4d3c4e10ca1', // Commerce
      '1534452203-72d0b4056e09', // Product
      '1563013544-824ae1b704d3', // Store
    ]
  };

  // Get realistic image URL for a search query
  getProductImage(query: string, platform: string): string {
    const category = this.categorizeQuery(query);
    const images = this.productImages[category] || this.productImages.default;
    
    // Use query and platform to create consistent but varied image selection
    const imageIndex = (this.hashString(query + platform)) % images.length;
    const imageId = images[imageIndex];
    
    return `${this.unsplashBaseUrl}${imageId}?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=400&q=80`;
  }

  // Platform-specific fallback images using real CDN patterns
  getPlatformFallbackImage(platform: string): string {
    const fallbacks: { [key: string]: string } = {
      'eBay': 'https://i.ebayimg.com/images/g/placeholder/s-l400.jpg',
      'Amazon US': 'https://m.media-amazon.com/images/I/placeholder.jpg',
      'Target': 'https://target.scene7.com/is/image/Target/placeholder',
      'StockX': 'https://images.stockx.com/images/placeholder.jpg',
      'Farfetch': 'https://cdn-images.farfetch-contents.com/placeholder.jpg'
    };
    
    return fallbacks[platform] || 'https://via.placeholder.com/400x400.png?text=Product+Image';
  }

  // Categorize search query to select appropriate images
  private categorizeQuery(query: string): keyof typeof this.productImages {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('phone') || lowerQuery.includes('laptop') || 
        lowerQuery.includes('computer') || lowerQuery.includes('electronic') ||
        lowerQuery.includes('headphones') || lowerQuery.includes('iphone') ||
        lowerQuery.includes('ipad') || lowerQuery.includes('macbook')) {
      return 'electronics';
    }
    
    if (lowerQuery.includes('shoes') || lowerQuery.includes('shirt') || 
        lowerQuery.includes('dress') || lowerQuery.includes('fashion') ||
        lowerQuery.includes('clothing') || lowerQuery.includes('watch') ||
        lowerQuery.includes('bag') || lowerQuery.includes('jacket')) {
      return 'fashion';
    }
    
    if (lowerQuery.includes('furniture') || lowerQuery.includes('home') || 
        lowerQuery.includes('kitchen') || lowerQuery.includes('decor') ||
        lowerQuery.includes('chair') || lowerQuery.includes('table')) {
      return 'home';
    }
    
    if (lowerQuery.includes('sport') || lowerQuery.includes('fitness') || 
        lowerQuery.includes('gym') || lowerQuery.includes('ball') ||
        lowerQuery.includes('running') || lowerQuery.includes('exercise')) {
      return 'sports';
    }
    
    if (lowerQuery.includes('book') || lowerQuery.includes('novel') || 
        lowerQuery.includes('magazine') || lowerQuery.includes('education')) {
      return 'books';
    }
    
    return 'default';
  }

  // Simple hash function for consistent image selection
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }
}

const imageService = new ImageService();
export default imageService;