export const configEnv = {
  API_URL: process.env.REACT_APP_API_URL,
  DELIVEY_TRACKING_URL: process.env.REACT_APP_API_DELIVEY_TRACKING_URL,
  // DELIVERY_TRACKER_CLIENT_ID: process.env.REACT_APP_DELIVERY_TRACKER_CLIENT_ID,
  // DELIVERY_TRACKER_CLIENT_SECRET:
  //   process.env.REACT_APP_DELIVERY_TRACKER_CLIENT_SECRET,
};

export const containerMaxW = 'xl:max-w-6xl xl:mx-auto';

export const appTitle = '타이틀';

export const getPageTitle = (currentPageTitle: string) =>
  `${currentPageTitle} — ${appTitle}`;

export const OSUNG_FOOD_JWT_ACCESS_KEY = 'osung_food_access_token';
