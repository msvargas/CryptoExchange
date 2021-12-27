import ApiService from '~services/Api.service';

const BTC_ID = '90';

describe('Crypto API service', () => {
  it('given coin list getAllCoins() return coins with price, name, symbol...', async () => {
    expect.assertions(7);
    return ApiService.getAllCoins({ start: 0, limit: 100 }).then(response => {
      if (response.success) {
        expect(response.data.coins).toBeInstanceOf(Array);
        expect(response.data.coins.length).toBe(100);
        expect(response.data.coins[0]).toHaveProperty('id');
        expect(response.data.coins[0]).toHaveProperty('name');
        expect(response.data.coins[0]).toHaveProperty('nameid');
        expect(response.data.coins[0]).toHaveProperty('symbol');
        expect(response.data.coins[0]).toHaveProperty('price_usd');
      } else {
        expect(response.error).rejects.toThrowError(response.error);
      }
    });
  });
  it('given coin details getCoinDetails() return updated coin details', async () => {
    expect.assertions(6);
    return ApiService.getCoinDetails(BTC_ID).then(response => {
      if (response.success) {
        expect(response.data.id).toBe(BTC_ID);
        expect(response.data).toHaveProperty('id');
        expect(response.data).toHaveProperty('nameid');
        expect(response.data).toHaveProperty('symbol');
        expect(response.data).toHaveProperty('price_usd');
        expect(response.data).toHaveProperty('name');
      } else {
        expect(response.error).rejects.toThrowError(response.error);
      }
    });
  });
  it('given coin chart getCoinChart() return price points (x,y)', async () => {
    expect.assertions(6);
    return ApiService.getCoinChart(BTC_ID).then(response => {
      if (response.success) {
        expect(response.data.price).toBeDefined();
        expect(response.data.mcap).toBeDefined();
        expect(response.data.price).toBeInstanceOf(Array);
        expect(response.data.price.length).toBeGreaterThan(0);
        expect(response.data.price[0]).toHaveProperty('x');
        expect(response.data.price[0]).toHaveProperty('y');
      } else {
        expect(response.error).rejects.toThrowError(response.error);
      }
    });
  });
});
