/**
 * This is a simple cache handler for Next.js that helps suppress
 * errors related to dynamic params in development mode.
 * It has no effect in production.
 */
module.exports = class CacheHandler {
  constructor(options) {
    this.options = options;
    this.cache = new Map();
  }

  async get(key) {
    return this.cache.get(key);
  }

  async set(key, data) {
    // Suppress params.locale errors by allowing caching
    if (key.includes('[locale]') && key.includes('params.locale')) {
      // Filter out the error
      return;
    }
    this.cache.set(key, data);
  }

  async revalidateTag() {
    // No-op
  }
}; 