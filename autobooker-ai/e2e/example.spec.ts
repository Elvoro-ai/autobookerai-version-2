import { test, expect } from '@playwright/test';

test('healthcheck endpoint returns ok', async ({ request }) => {
  const response = await request.get('/api/health');
  expect(response.ok()).toBeTruthy();
  const body = await response.json();
  expect(body).toEqual({ status: 'ok' });
});
