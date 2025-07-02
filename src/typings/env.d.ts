declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // http server specific vars
      PORT: string;
      NODE_ENV: "development" | "production";
      BASE_URL: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
