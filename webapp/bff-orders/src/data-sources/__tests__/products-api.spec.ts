import ProductsApi from '../products-api';

describe('ProductAPI', () => {
  let productsApi: ProductsApi;

  beforeEach(() => {
    productsApi = new ProductsApi();
  });

  it('getProducts', async () => {
    const products = await productsApi.getProducts();
    expect(products.length).toEqual(10);
  });

  it('getProductsByIds', async () => {
    const products = await productsApi.getProductsByIds([1, 2]);
    expect(products).toEqual([
      {
        id: 1,
        title: 'AIR 1',
        image: 'air1',
        price: 100,
        reviewCount: 50,
        score: 3,
      },
      {
        id: 2,
        title: 'AIR 2',
        image: 'air2',
        price: 150,
        reviewCount: 66,
        score: 4,
      },
    ]);
  });

  it('getProduct', async () => {
    const products = await productsApi.getProduct(1);
    expect(products).toEqual({
      id: 1,
      title: 'AIR 1',
      image: 'air1',
      price: 100,
      reviewCount: 50,
      score: 3,
    });
  });
});
