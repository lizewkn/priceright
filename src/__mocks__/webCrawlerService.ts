export default {
  crawlProductPage: jest.fn(() => Promise.resolve(null)),
  convertToApiPriceData: jest.fn(() => ({
    id: 'test',
    platform: 'Test',
    price: 100,
    currency: 'HKD',
    shipping: 0,
    shippingToHK: true,
    url: 'https://test.com',
    image: 'https://test.com/image.jpg',
    title: 'Test Product',
    availability: 'In Stock'
  }))
};