export const showError = (message?: string | null) => {
  console.log("message", message);
  //do something with error message
};

const getStatusMessage = (status?: number | null): string => {
  if (!status) return "Unexpected error occurred.";
  switch (status) {
    case 400:
      return "Bad Request. Please check your input.";
    case 401:
      //automatic logout or re authorize user
      return "Unauthorized. Please login again.";
    case 403:
      return "Forbidden. You don’t have access to this resource.";
    case 404:
      return "Resource not found.";
    case 408:
      return "Request timed out. Please try again.";
    case 429:
      return "Too many requests. Please wait and try again.";
    case 500:
      return "Internal Server Error. Please try later.";
    case 502:
      return "Bad Gateway. Server is unreachable.";
    case 503:
      return "Service Unavailable. Try again later.";
    case 504:
      return "Gateway Timeout. Please try again.";
    default:
      return `Unexpected error occurred (Status: ${status}).`;
  }
};

const getFirebaseErrorMessage = (code?: string | null): string => {
  if (!code) return "An unknown Firebase error occurred.";
  switch (code) {
    case "auth/invalid-email":
      return "The email address is badly formatted.";
    case "auth/user-disabled":
      return "This account has been disabled.";
    case "auth/user-not-found":
      return "No account found with this email.";
    case "auth/wrong-password":
      return "Invalid password. Please try again.";
    case "auth/email-already-in-use":
      return "This email is already registered.";
    case "auth/weak-password":
      return "Password is too weak. Try a stronger one.";
    case "auth/network-request-failed":
      return "Network error. Please check your connection.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    default:
      return "An unknown Firebase error occurred.";
  }
};

export const handleApiError = (error: any) => {
  try {
    if (!error) {
      showError("An unknown error occurred.");
      return;
    }

    // Firebase errors
    if (typeof error?.code === "string" && error.code?.startsWith?.("auth/")) {
      const message = getFirebaseErrorMessage(error.code);
      showError(message);
      return;
    }

    // Supabase errors
    if (
      (typeof error?.message === "string" && error.message) ||
      error?.code ||
      error?.details ||
      error?.hint
    ) {
      const message =
        error?.message ||
        error?.details ||
        error?.hint ||
        (error?.code ? `Supabase error (code: ${error.code})` : null);
      if (message) {
        showError(message);
        return;
      }
    }

    // Axios/HTTP errors
    if (error?.response) {
      const status = error?.response?.status;
      const message =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        getStatusMessage(status);
      showError(message);
      return;
    }

    // No response from server
    if (error?.request) {
      showError("No response from server. Please check your connection.");
      return;
    }

    // Fallback for unexpected errors
    showError(
      typeof error?.message === "string"
        ? error.message
        : "An unexpected error occurred."
    );
  } catch (err) {
    showError("Something went wrong.");
  }
};
