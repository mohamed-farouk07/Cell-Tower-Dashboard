import api from "./apiClient";

interface RefreshToken {
  tokenId: string;
  expiryDate: number;
  nearExpiration: boolean;
}

interface AuthResponse {
  pkid: string;
  accessToken: string;
  refreshToken: RefreshToken;
}

export const loginApi = async (
  userName: string,
  password: string
): Promise<AuthResponse> => {
  const response = await api.post("/authenticate", { userName, password });
  const { accessToken, pkid, refreshToken } = response.data;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("pkid", pkid);
  localStorage.setItem("tokenId", refreshToken.tokenId);
  return response.data;
};

export const updateTokenApi = async (): Promise<AuthResponse> => {
  const tokenId = localStorage.getItem("tokenId");
  if (!tokenId) {
    throw new Error("Refresh token not found. Please log in again.");
  }
  const response = await api.post("/update-token", { tokenId });
  const { accessToken, refreshToken } = response.data;
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("tokenId", refreshToken.tokenId);
  return response.data;
};

export const logoutApi = async (userPkid: string): Promise<void> => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("Access token not found. Please log in again.");
  }
  await api.post(
    `/logout/${userPkid}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  localStorage.clear();
};

// Function to refresh token every 20 minutes
export const startTokenRefreshTimer = () => {
  const interval = 20 * 60 * 1000; // 20 minutes in milliseconds
  setInterval(async () => {
    try {
      await updateTokenApi();
    } catch (error) {
      console.error("Token refresh failed:", error);
    }
  }, interval);
};

// // Function to handle idle timeout
// export const handleIdleTimeout = () => {
//   const idleTime = 1 * 60 * 1000; // 15 minutes in milliseconds
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   let idleTimer: any;

//   const resetIdleTimer = () => {
//     clearTimeout(idleTimer);
//     idleTimer = setTimeout(() => {
//       logoutApi(localStorage.getItem("pkid") || "");
//     }, idleTime);
//   };

//   document.addEventListener("mousemove", resetIdleTimer);
//   document.addEventListener("keydown", resetIdleTimer);

//   resetIdleTimer();
// };

// // Function to prevent back navigation
// export const preventBackNavigation = () => {
//   window.addEventListener(
//     "popstate",
//     (event) => {
//       event.preventDefault();
//       window.location.href = "/";
//     },
//     false
//   );
// };
