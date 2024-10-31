const getErrorMessage = (error: unknown) => {
  if (error instanceof Error) {
    return error.message;
  }

  if ('string' === typeof error) {
    return error;
  }

  return String(error);
};

export default getErrorMessage;
