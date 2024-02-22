import { ENV } from '@/utils'

/**
 * Checks the response status and throws an error if not okay.
 *
 * @param {Response} response - The response object from a fetch request.
 * @param {string} userId - The user ID associated with the request (optional).
 * @throws {Object} An error object with additional properties like userId.
 */
export async function handleError(error, logCtrl) {
  if (ENV.IS_DEV) {
    console.error(error)
  }

  // Log error
  await logCtrl.create({
    message: error?.message || 'Unknown Error',
    eventLevel: 'ERROR',
    data: {
      name: error?.name,
      status: error?.status,
      userAction: error?.userAction,
      url: error?.url,
    },
    user: error?.userId,
  })

  return {
    success: false,
    error: {
      status: error?.status,
      message: error?.userMessage || 'Oops! An error occured',
    },
  }
}
