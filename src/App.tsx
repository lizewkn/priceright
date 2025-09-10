import React, { useState } from 'react';
import { 
  ThemeProvider, 
  createTheme,
  CssBaseline,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Box
} from '@mui/material';
import SearchComponent from './components/SearchComponent';
import PriceComparison from './components/PriceComparison';
import './App.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
  },
});

export interface PriceData {
  id: string;
  platform: string;
  price: number;
  currency: string;
  shipping: number;
  shippingToHK: boolean;
  url: string;
  image: string;
  title: string;
  availability: string;
}

function App() {
  const [searchResults, setSearchResults] = useState<PriceData[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    
    // Simulate API call with mock data
    setTimeout(() => {
      const mockData: PriceData[] = [
        {
          id: '1',
          platform: 'Amazon US',
          price: 299.99,
          currency: 'USD',
          shipping: 25.99,
          shippingToHK: true,
          url: 'https://amazon.com/example',
          image: '/api/placeholder/200/200',
          title: `${query} - Premium Quality`,
          availability: 'In Stock'
        },
        {
          id: '2',
          platform: 'eBay',
          price: 275.50,
          currency: 'USD',
          shipping: 15.99,
          shippingToHK: true,
          url: 'https://ebay.com/example',
          image: '/api/placeholder/200/200',
          title: `${query} - Good Condition`,
          availability: 'In Stock'
        },
        {
          id: '3',
          platform: 'Target',
          price: 320.00,
          currency: 'USD',
          shipping: 0,
          shippingToHK: false,
          url: 'https://target.com/example',
          image: '/api/placeholder/200/200',
          title: `${query} - Brand New`,
          availability: 'Limited Stock'
        },
        {
          id: '4',
          platform: 'StockX',
          price: 285.00,
          currency: 'USD',
          shipping: 30.00,
          shippingToHK: true,
          url: 'https://stockx.com/example',
          image: '/api/placeholder/200/200',
          title: `${query} - Authenticated`,
          availability: 'Available'
        },
        {
          id: '5',
          platform: 'Farfetch',
          price: 310.00,
          currency: 'USD',
          shipping: 20.00,
          shippingToHK: true,
          url: 'https://farfetch.com/example',
          image: '/api/placeholder/200/200',
          title: `${query} - Designer Collection`,
          availability: 'In Stock'
        }
      ];
      
      setSearchResults(mockData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              PriceRight - Global Price Comparison
            </Typography>
          </Toolbar>
        </AppBar>
        
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom align="center">
            Find the Best Prices with Shipping to Hong Kong
          </Typography>
          
          <Typography variant="subtitle1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Compare prices across eBay, Amazon, Target, StockX, Farfetch, and more
          </Typography>
          
          <SearchComponent onSearch={handleSearch} isLoading={isLoading} />
          
          {searchResults.length > 0 && (
            <PriceComparison 
              data={searchResults} 
              searchQuery={searchQuery}
            />
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
