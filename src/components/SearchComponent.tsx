import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Paper,
  InputAdornment,
  CircularProgress
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface SearchComponentProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search for products (e.g., iPhone 15, Nike Air Jordan, MacBook Pro...)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: isLoading && (
              <InputAdornment position="end">
                <CircularProgress size={20} />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 2 }}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={!query.trim() || isLoading}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          {isLoading ? 'Searching...' : 'Search Prices'}
        </Button>
      </Box>
    </Paper>
  );
};

export default SearchComponent;