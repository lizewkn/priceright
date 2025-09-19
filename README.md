# PriceRight

🚀 **Live Demo**: [https://lizewkn.github.io/priceright](https://lizewkn.github.io/priceright)

## Description

A comprehensive price comparison web application that searches for products across multiple e-commerce platforms and compares prices with shipping to Hong Kong. Features intelligent web crawling when APIs are not available.

## Features

### 🛒 Multi-Platform Price Comparison
- **eBay** - Auction and Buy-It-Now listings
- **Amazon US** - Prime and regular listings
- **Target** - Retail products
- **StockX** - Authenticated streetwear and sneakers
- **Farfetch** - Designer fashion and luxury items

### 🌐 Intelligent Web Crawling
- **Google Search Integration** - Finds product listings automatically
- **Direct Website Crawling** - Extracts real product data and images
- **Fallback Mechanisms** - Graceful degradation when crawling fails
- **Multi-Platform Support** - Custom parsers for each e-commerce site

### 💰 Price Analysis
- **Currency Conversion** - All prices shown in HKD
- **Shipping Costs** - Includes international shipping to Hong Kong
- **Total Cost Calculation** - Product price + shipping
- **Best Price Highlighting** - Automatically identifies best deals

### 📊 Visual Comparison
- **Interactive Charts** - Price comparison visualization
- **Responsive Design** - Works on all devices
- **Real-time Search** - Fast product lookup
- **Detailed Results** - Product images, availability, and links

## Technical Implementation

### Web Crawling Architecture
```
Search Query → Google Search → Product URLs → Web Scraping → Price Data
     ↓ (fallback)
Direct URLs → Website Crawling → Data Extraction → Formatted Results
     ↓ (fallback)
Mock Data → Realistic Simulation → Price Comparison Display
```

### Technologies Used
- **React 19** with TypeScript
- **Material-UI** for modern interface
- **Cheerio** for HTML parsing
- **Axios** for HTTP requests
- **Recharts** for data visualization

## Quick Start

```bash
git clone https://github.com/lizewkn/priceright.git
cd priceright
npm install
npm start
```

Open [http://localhost:3000/priceright](http://localhost:3000/priceright)

## Web Crawling Features

### 🔍 Search Methods
1. **Google Search** - `site:domain.com product_name`
2. **Direct URLs** - Platform-specific search URLs
3. **Fallback Data** - Realistic mock results

### 🕷️ Data Extraction
- Product titles and descriptions
- Current prices with currency detection
- Product images from website pages
- Availability and stock status
- Shipping information

### 🛡️ Error Handling
- CORS handling for browser environments
- Network timeout management
- Invalid data filtering
- Graceful fallback chains

## Production Deployment

For server-side implementation with full crawling capabilities:

```bash
npm run build
# Deploy to server environment for unrestricted web crawling
```

### Server Benefits
- No CORS restrictions
- Full website access
- Real-time price extraction
- Image downloading and processing

## Browser Limitations

In browser environments:
- Google search blocked by CORS (expected)
- Direct website crawling blocked by CORS (expected)
- Falls back to mock data (demonstrates architecture)
- Full UI functionality maintained

## Contributing

1. Fork the repository
2. Create a feature branch
3. Implement your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Documentation

- [Web Crawling Implementation](./CRAWLING_IMPLEMENTATION.md) - Detailed technical documentation
- [API Documentation](./docs/API.md) - Service interfaces and types