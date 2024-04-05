/**
 * Utility functions for server side string validation.
 *
 * This module provides a set of functions to validate and handle strings,
 * particularly focused on common use cases such as slug validation.
 * It can be expanded with additional validation functions as needed.
 *
 * @module validation
 */

/**
 * Validates whether a given string is a valid slug.
 *
 * @param {string} slug - The string to be validated as a slug.
 * @returns {boolean} True if the string is a valid slug, false otherwise.
 */
function sanitizeSlug(input) {
  // Remove non-alphanumeric characters except hyphens and underscores
  const sanitized = input.replace(/[^\w\s-]/g, '')

  // Replace spaces with hyphens
  const slug = sanitized.replace(/\s+/g, '-')

  // Convert to lowercase and trim
  return slug.toLowerCase().trim()
}

/**
 * Validates whether a given string is a valid type.
 *
 * @param {string} type - The string to be validated as a type.
 * @returns {boolean} True if the string is a valid type, false otherwise.
 */
function isValidType(type) {
  const validTypes = [
    'all',
    'homepages',
    'innerpages',
    'landingpages',
    'components',
  ]
  return validTypes.includes(type)
}

function isValidCategory(categories, category) {
  const isValidCategory = categories.some(
    (cat) => cat.attributes.slug === category,
  )
  return isValidCategory
}

function sanitizeQueryString(queryString) {
  // Remove leading and trailing whitespace
  queryString = queryString?.trim() || ''

  // Remove all characters except letters, numbers, and spaces
  queryString = queryString?.replace(/[^a-zA-Z0-9\s]/g, '') || ''

  return queryString
}

function getSafeTags(tags, number) {
  return tags.slice(0, number).map(sanitizeSlug)
}

export {
  sanitizeSlug,
  isValidType,
  isValidCategory,
  sanitizeQueryString,
  getSafeTags,
}
