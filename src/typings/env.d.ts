declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // http server specific vars
      PORT: string;
      NODE_ENV: "development" | "production";
      BASE_URL: string;
      DOMAIN: string;

      // Database
      MONGO_URI: string;

      // VPN AND IP
      IP_COUNTRY: string;
      VPN_DETECTION_API_BASE_URL: string;
      VPN_DETECTION_API_KEY: string;

      // Discord
      BOT_TOKEN: string;
      GUILD_ID: string;
      VERIFIED_ROLE_ID: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
