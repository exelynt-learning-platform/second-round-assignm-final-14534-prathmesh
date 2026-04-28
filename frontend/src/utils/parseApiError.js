export const parseApiError = (error) => {
  // Axios error response
  const message = error?.response?.data?.message || "";
  const status = error?.response?.status;

  
  if (!error.response) {
    return "Network error. Please check your internet connection.";
  }

  
  if (status === 401) {
    return "Invalid API key. Please check your configuration.";
  }

 
  if (status === 403) {
    return "Access denied or quota exceeded.";
  }

  
  if (status === 429) {
   
    if (message.toLowerCase().includes("quota")) {
      return "Quota exceeded. Please check your plan and billing.";
    }
    return "Too many requests. Please wait and try again.";
  }

 
  if (status === 503 || message.toLowerCase().includes("busy")) {
    return "AI model is busy. Please retry.";
  }

  
  if (error.code === "ECONNABORTED") {
    return "Request timed out. Please try again.";
  }

   
  return message || "Something went wrong. Please try again.";
};