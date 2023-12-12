/**
 * Checks the response status and throws an error if not okay.
 *
 * @param {Response} response - The response object from a fetch request.
 * @param {string} [userId] - The user ID associated with the request (optional).
 * @throws {Object} An error object with additional properties like userId.
 */
export const checkResponse = async (response, userId) => {
  if (! response.ok) {
    let error;
   
    try {
      const result = await response.json();
      error = result?.error || { message: "Unexpected error" }
      error.userId = userId
      error.url = response?.url
    } catch {
      error = { message: "Unexpected error" };
    }

    throw error;
  }
}
