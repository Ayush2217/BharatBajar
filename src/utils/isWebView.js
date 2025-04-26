const isWebView = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  return /wv|WebView|; wv\)/i.test(userAgent);
};

export default isWebView;
