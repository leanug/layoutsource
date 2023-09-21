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
function isValidSlug(slug) {
  const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return slugPattern.test(slug);
}

/**
 * Validates whether a given string is a valid type.
 *
 * @param {string} type - The string to be validated as a type.
 * @returns {boolean} True if the string is a valid type, false otherwise.
 */
function isValidType(type) {
  const validTypes = [
    'home-pages', 
    'inner-pages', 
    'landing-pages', 
    'components'
  ];
  return validTypes.includes(type)
}

export { isValidSlug, isValidType }