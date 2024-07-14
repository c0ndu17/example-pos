declare global {
  interface Window {
    ENV: {
      NODE_ENV: string;
      GRAPHQL_URI: string;
    };
  }
}

export {};
