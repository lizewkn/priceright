import React from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  Stack,
  Paper
} from '@mui/material';
import {
  LocalShipping,
  OpenInNew,
  CheckCircle,
  Cancel
} from '@mui/icons-material';
import { PriceData } from '../App';
import PriceChart from './PriceChart';

interface PriceComparisonProps {
  data: PriceData[];
  searchQuery: string;
}

const PriceComparison: React.FC<PriceComparisonProps> = ({ data, searchQuery }) => {
  // Sort data by total price (price + shipping) for Hong Kong delivery
  const sortedData = [...data].sort((a, b) => {
    const totalA = a.price + (a.shippingToHK ? a.shipping : 0);
    const totalB = b.price + (b.shippingToHK ? b.shipping : 0);
    return totalA - totalB;
  });

  const formatPrice = (price: number, currency: string = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(price);
  };

  const getPlatformColor = (platform: string) => {
    const colors: { [key: string]: string } = {
      'Amazon US': '#FF9900',
      'eBay': '#E53238',
      'Target': '#CC0000',
      'StockX': '#09B83E',
      'Farfetch': '#000000'
    };
    return colors[platform] || '#1976d2';
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Search Results for "{searchQuery}"
      </Typography>
      
      {/* Price Chart */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Price Comparison Chart
        </Typography>
        <PriceChart data={sortedData} />
      </Paper>

      {/* Results Grid */}
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { 
            xs: '1fr', 
            sm: 'repeat(2, 1fr)', 
            md: 'repeat(3, 1fr)' 
          }, 
          gap: 3 
        }}
      >
        {sortedData.map((item, index) => {
          const totalPrice = item.price + (item.shippingToHK ? item.shipping : 0);
          const isLowestPrice = index === 0;

          return (
            <Box key={item.id}>
              <Card 
                elevation={isLowestPrice ? 4 : 2}
                sx={{ 
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  border: isLowestPrice ? '2px solid #4caf50' : 'none',
                  position: 'relative'
                }}
              >
                {isLowestPrice && (
                  <Chip
                    label="Best Price"
                    color="success"
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      zIndex: 1
                    }}
                  />
                )}

                <CardMedia
                  component="img"
                  height="200"
                  image={item.image}
                  alt={item.title}
                  sx={{ objectFit: 'cover' }}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Stack spacing={2}>
                    <Box>
                      <Chip
                        label={item.platform}
                        size="small"
                        sx={{
                          backgroundColor: getPlatformColor(item.platform),
                          color: 'white',
                          mb: 1
                        }}
                      />
                      <Typography variant="h6" component="div" noWrap>
                        {item.title}
                      </Typography>
                    </Box>

                    <Box>
                      <Typography variant="h5" color="primary.main" sx={{ fontWeight: 'bold' }}>
                        {formatPrice(item.price, item.currency)}
                      </Typography>
                      
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
                        <LocalShipping fontSize="small" />
                        <Typography variant="body2" color="text.secondary">
                          Shipping: {formatPrice(item.shipping, item.currency)}
                        </Typography>
                        {item.shippingToHK ? (
                          <CheckCircle color="success" fontSize="small" />
                        ) : (
                          <Cancel color="error" fontSize="small" />
                        )}
                      </Stack>

                      <Typography variant="body2" color="text.secondary">
                        To Hong Kong: {item.shippingToHK ? 'Available' : 'Not Available'}
                      </Typography>

                      {item.shippingToHK && (
                        <Typography variant="h6" color="success.main" sx={{ mt: 1 }}>
                          Total: {formatPrice(totalPrice, item.currency)}
                        </Typography>
                      )}
                    </Box>

                    <Box>
                      <Chip
                        label={item.availability}
                        size="small"
                        color={item.availability === 'In Stock' ? 'success' : 'warning'}
                        variant="outlined"
                      />
                    </Box>
                  </Stack>
                </CardContent>

                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    variant="contained"
                    fullWidth
                    endIcon={<OpenInNew />}
                    onClick={() => window.open(item.url, '_blank')}
                    disabled={!item.shippingToHK}
                    color={isLowestPrice ? 'success' : 'primary'}
                  >
                    {item.shippingToHK ? 'View & Buy' : 'No HK Shipping'}
                  </Button>
                </Box>
              </Card>
            </Box>
          );
        })}
      </Box>

      {/* Summary */}
      <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Summary
        </Typography>
        <Box 
          sx={{ 
            display: 'grid', 
            gridTemplateColumns: { 
              xs: '1fr', 
              sm: 'repeat(3, 1fr)' 
            }, 
            gap: 2 
          }}
        >
          <Box>
            <Typography variant="body2" color="text.secondary">
              Total Results
            </Typography>
            <Typography variant="h6">{data.length} platforms</Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Ships to Hong Kong
            </Typography>
            <Typography variant="h6">
              {data.filter(item => item.shippingToHK).length} / {data.length}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary">
              Best Price (including shipping)
            </Typography>
            <Typography variant="h6" color="success.main">
              {formatPrice(
                sortedData[0]?.price + (sortedData[0]?.shippingToHK ? sortedData[0]?.shipping : 0),
                sortedData[0]?.currency
              )}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default PriceComparison;