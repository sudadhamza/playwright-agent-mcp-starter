import { test, expect } from '../fixtures/base.fixture';

/**
 * API Health Check Tests - @api
 *
 * These tests verify API endpoints are reachable and return expected responses.
 * They use Playwright's built-in APIRequestContext, which is the recommended
 * approach for API testing within the Playwright ecosystem.
 *
 * Why use Playwright for API tests?
 *   - Same test runner, same assertions, same reporting
 *   - Easily mix UI and API tests in the same suite
 *   - No need for separate tools (Postman, Rest Client, etc.)
 *   - Full TypeScript support with type checking
 *
 * IMPORTANT: Replace the example endpoints below with your real API endpoints.
 * The paths used here (/api/health, /api/nonexistent) are generic placeholders.
 *
 * @see https://playwright.dev/docs/api-testing
 */

test.describe('API Health Check Tests @api', () => {

  test('GET /api/health returns 200', async ({ apiContext }) => {
    // Send a GET request to the health check endpoint.
    // Replace '/api/health' with your actual health check path.
    const response = await apiContext.get('/api/health');

    // Assert the response status is 200 (OK)
    expect(response.status()).toBe(200);

    // Assert the response is successful (status in 200-299 range)
    expect(response.ok()).toBeTruthy();
  });

  test('GET /api/nonexistent returns 404', async ({ apiContext }) => {
    // Negative test: verify that requesting a non-existent endpoint
    // returns an appropriate error status code.
    // This ensures the API handles unknown routes gracefully.
    const response = await apiContext.get('/api/nonexistent');

    // Assert the response status is 404 (Not Found)
    expect(response.status()).toBe(404);

    // Assert the response is NOT successful
    expect(response.ok()).toBeFalsy();
  });

  test('response has valid JSON structure', async ({ apiContext }) => {
    // Verify that the API returns well-formed JSON with the correct
    // Content-Type header. This is a baseline contract test.

    // Replace '/api/health' with your actual endpoint
    const response = await apiContext.get('/api/health');

    // Check Content-Type header includes 'application/json'
    const contentType = response.headers()['content-type'] ?? '';
    expect(contentType).toContain('application/json');

    // Parse the response body as JSON
    // This will throw if the response is not valid JSON
    const body = await response.json();

    // Assert the body is a non-null object
    // Replace this with your actual expected response structure, e.g.:
    //   expect(body).toHaveProperty('status');
    //   expect(body.status).toBe('healthy');
    expect(body).toBeDefined();
    expect(typeof body).toBe('object');
    expect(body).not.toBeNull();
  });

  test('health endpoint responds within acceptable time', async ({ apiContext }) => {
    // Performance baseline: verify the health endpoint responds quickly.
    // Adjust the threshold (1000ms) based on your SLA requirements.
    const startTime = Date.now();

    const response = await apiContext.get('/api/health');

    const duration = Date.now() - startTime;

    // Assert the response was received within 1 second
    // Adjust this threshold based on your application's performance requirements
    expect(duration).toBeLessThan(1000);
    expect(response.ok()).toBeTruthy();
  });

  test('API returns proper error format for bad request', async ({ apiContext }) => {
    // Verify that the API returns a structured error response
    // when given invalid input. Replace the endpoint and payload
    // with a real example from your API.

    // Example: POST to an endpoint with an invalid/empty body
    // Replace '/api/resource' with your actual endpoint
    const response = await apiContext.post('/api/resource', {
      data: {},
    });

    // APIs typically return 400 (Bad Request) or 422 (Unprocessable Entity)
    // for validation errors. Adjust the expected status to match your API.
    expect(response.status()).toBeGreaterThanOrEqual(400);
    expect(response.status()).toBeLessThan(500);

    // Verify the error response is JSON
    const contentType = response.headers()['content-type'] ?? '';
    if (contentType.includes('application/json')) {
      const body = await response.json();
      expect(body).toBeDefined();

      // Common error response patterns - uncomment the one that matches your API:
      // expect(body).toHaveProperty('error');
      // expect(body).toHaveProperty('message');
      // expect(body).toHaveProperty('errors');
    }
  });
});
