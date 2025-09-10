# PriceRight - Global Price Comparison

A responsive web application that allows users to search for item prices and shipping to Hong Kong across multiple e-commerce platforms.

🚀 **Live Demo**: [https://lizewkn.github.io/priceright](https://lizewkn.github.io/priceright)

![PriceRight Homepage](https://github.com/user-attachments/assets/d3c5cb22-a838-40f5-a295-381a40f60199)

## Features

- 🔍 **Multi-Platform Search**: Compare prices across eBay, Amazon, Target, StockX, Farfetch, and more
- 🇭🇰 **Hong Kong Shipping**: Clear indicators for shipping availability to Hong Kong
- 📊 **Interactive Charts**: Visual price comparison with Recharts
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 💰 **Best Price Highlighting**: Automatically identifies the lowest total price (including shipping)
- 🛒 **Direct Purchase Links**: Quick access to buy products from each platform
- ⚡ **Real-time Search**: Fast search with loading indicators

## Supported Platforms

- eBay
- Amazon (all regions)
- Target
- StockX
- Farfetch
- Net-a-Porter
- Eastbay
- Footlocker
- Carousell
- Etsy
- Zozotown
- And more...

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **UI Framework**: Material-UI (MUI) v7
- **Charts**: Recharts for data visualization
- **HTTP Client**: Axios for API requests
- **Testing**: Jest and React Testing Library
- **Build Tool**: Create React App

## Deployment

This app is automatically deployed to GitHub Pages using GitHub Actions. Every push to the main branch triggers a new deployment.

- **Live URL**: [https://lizewkn.github.io/priceright](https://lizewkn.github.io/priceright)
- **Auto-deployment**: Configured via `.github/workflows/deploy.yml`

### Manual Deployment

To build and deploy manually:

```bash
npm run build
# The build folder can then be deployed to any static hosting service
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/lizewkn/priceright.git
cd priceright
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Available Scripts

### `npm start`
Runs the app in development mode. The page will reload when you make changes.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run build`
Builds the app for production to the `build` folder.

### `npm run eject`
**Note: This is a one-way operation!** Ejects from Create React App configuration.

## Usage

1. **Search**: Enter a product name in the search box (e.g., "iPhone 15", "Nike Air Jordan")
2. **Compare**: View prices from multiple platforms with shipping costs
3. **Analyze**: Check the interactive chart to visualize price differences
4. **Filter**: Focus on items that ship to Hong Kong
5. **Purchase**: Click "View & Buy" to go directly to the product page

## Screenshots

### Desktop View
![Desktop Search Results](https://github.com/user-attachments/assets/c3ecea50-881d-4fac-8779-255b3eaa3e0a)

### Mobile View
![Mobile Responsive](https://github.com/user-attachments/assets/63294eee-0219-45fb-9886-9f2bdd70ba35)

## Future Enhancements

- [ ] Real API integration with e-commerce platforms
- [ ] User accounts and saved searches
- [ ] Price alerts and notifications
- [ ] Historical price tracking
- [ ] Currency conversion
- [ ] Advanced filtering options
- [ ] Wishlist functionality

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Project Link: [https://github.com/lizewkn/priceright](https://github.com/lizewkn/priceright)