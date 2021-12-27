import { API_BASE_URL, CHART_BASE_URL } from 'react-native-dotenv';

import config from '~config';

it('config loaded correctly', () => {
  expect(API_BASE_URL).toBeDefined();
  expect(CHART_BASE_URL).toBeDefined();
  expect(config.apiBaseUrl).toBe(API_BASE_URL);
  expect(config.chartBaseUrl).toBe(CHART_BASE_URL);
  expect(config.locale).toBe('en-US');
});
