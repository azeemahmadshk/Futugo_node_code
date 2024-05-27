import { expect } from 'chai';
import sinon from 'sinon';
import nock from 'nock';
import { getProducts } from '../../webkul/services/webkulServices.js';

describe('getProducts', () => {
  let webkulAPi, webkulToken;

  beforeEach(() => {
    webkulAPi = 'https://webkulapi.example.com';
    webkulToken = 'sample_token';
  });
  console.log("thissssssssssss",webkulToken);

  afterEach(() => {
    sinon.restore();
    nock.cleanAll();
  });

  it('should fetch products successfully', async () => {
    const mockResponse = {
      products: [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' },
      ],
    };

    nock(webkulAPi)
      .get('/products.json?page=1&limit=250')
      .reply(200, mockResponse);

    const products = await getProducts(webkulAPi, webkulToken);
    expect(products).to.have.length(2);
  });

  it('should throw error when fetching products fails', async () => {
    nock(webkulAPi).get('/products.json?page=1&limit=250').reply(500);

    try {
      await getProducts(webkulAPi, webkulToken);
      expect.fail('Expected function to throw error');
    } catch (e) {
      expect(e).to.exist;
    }
  });
});
