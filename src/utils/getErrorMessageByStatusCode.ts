// @TODO: Enum for the messages and status codes
export const getErrorMessageByStatusCode = (
  statusCode: number | string,
): string => {
  switch (statusCode) {
    case 404:
      return 'Resource Not Found';
    case 500:
      return 'Server Error. Please try again later.';
    case 'Unknown Error':
      return 'An unknown error occurred. Please try again.';
    default:
      return 'Something went wrong. Please refresh and try again.';
  }
};
