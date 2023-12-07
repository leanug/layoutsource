import { ENV } from "@/utils"

export async function handleError(error, logCtrl) {
  if (ENV.IS_DEV) {
    console.error(error);
  }

  // Log error
  await logCtrl.create({
    message: error?.statusText || 'Unknown Error',
    eventLevel: 'ERROR',
    data: {
      name: error?.name,
      status: error?.status,
      statusText: error?.statusText,
      userAction: error?.userAction,
      url: error?.url,
      type: error?.type
    },
    user: error?.userId
  });

  return {
    success: false,
    error: {
      status: error?.status,
      message: error?.userMessage || 'Oops! An error occured',
    },
  }
}