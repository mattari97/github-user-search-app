const copyToClipboard = (text: string) => {
  if (!text) {
    return Promise.reject('The content is empty.');
  }

  if (!(navigator && navigator.clipboard && navigator.clipboard.writeText)) {
    return Promise.reject('The Clipboard API is not available.');
  }

  navigator.clipboard.writeText(text);
  return Promise.resolve('Copied to clipboard');
};

export default copyToClipboard;
