export const isDev = () => {
  return getEnvVar("NODE_ENV") === "development";
};

export const isProd = () => {
  return getEnvVar("NODE_ENV") === "development";
};

const getEnvVar = (key: keyof typeof window.ENV): string => {
  if (typeof document === "undefined") {
    return process.env[key] || "";
  } else {
    return window.ENV[key] || "";
  }
};

export const getGraphQLUri = (): string => {
  const uri = getEnvVar("GRAPHQL_URI");
  // Default to docker compose, saves .env trouble
  return uri ?? "http://backend:4000/graphql";
};
