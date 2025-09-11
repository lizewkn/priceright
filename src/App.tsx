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
import priceComparisonService from './services/priceComparisonService';
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
    
    try {
      // Use real API services instead of mock data
      const results = await priceComparisonService.searchAllPlatforms(query);
      setSearchResults(results);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
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
