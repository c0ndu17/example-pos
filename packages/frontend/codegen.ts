import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: [
    {
      // There's some annoying loopback issue with the my PC right now.
      "http://0.0.0.0:4000": {
        headers: {
          "Content-Type": "application/json",
          // "x-apollo-operation-name": "introspectionQuery",
        },
      },
    },
  ],
  documents: ["./app/**/*.graphql"],
  ignoreNoDocuments: true,
  generates: {
    "./app/graphql/client/": {
      preset: "client",
    },
  },
};

export default config;
