/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - The input string to sanitize
 * @returns {string} - The sanitized string
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .replace(/[<>]/g, '') // Remove potential script tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+\s*=/gi, '') // Remove inline event handlers
    .trim()
    .slice(0, 100); // Limit input length
};

/**
 * Validate search term to ensure it's safe for filtering
 * @param {string} searchTerm - The search term to validate
 * @returns {boolean} - True if the search term is valid
 */
export const isValidSearchTerm = (searchTerm) => {
  if (typeof searchTerm !== 'string') {
    return false;
  }

  // Check for common XSS patterns
  const xssPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /onload/i,
    /onerror/i,
    /onclick/i,
  ];

  return !xssPatterns.some(pattern => pattern.test(searchTerm));
};