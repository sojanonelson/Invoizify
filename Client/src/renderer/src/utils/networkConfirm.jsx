export const checkInternetConnection = async (timeout = 5000) => {
  // Step 1: Quick check using navigator.onLine
  if (!navigator.onLine) return false;

  // Step 2: Additional fetch to ensure connection
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout); // Set timeout
  
  const testUrls = [
    "https://www.google.com",
    "https://www.cloudflare.com",
    "https://www.bing.com"
  ];

  for (const url of testUrls) {
    try {
      const response = await fetch(url, {
        method: "HEAD",
        signal: controller.signal,
        mode: "no-cors", // Keep minimal request
      });
      
      clearTimeout(timeoutId); // Clear timeout once request is complete
      return true; // If any request succeeds, consider connected
    } catch (error) {
      if (error.name === "AbortError") {
        console.warn(`Request to ${url} timed out.`);
      } else {
        console.error(`Error checking connection at ${url}:`, error);
      }
    }
  }

  clearTimeout(timeoutId); // Ensure timeout is cleared even if all requests fail
  return false; // All attempts failed
};
