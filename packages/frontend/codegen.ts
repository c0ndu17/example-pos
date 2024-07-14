import { CodegenConfig } from "@graphql-codegen/cli";

// Two things here:
//  1. There's some annoying loopback issue with the my PC right now. hence 0.0.0.0.
//  2. This is quicker to iterate on, but if monorepo, I'd probably say move this further up, use the project codegen setup, and generate the schema from pothos, and use that.
//    - It'd be quite bad, if you couldn't deploy a FE change because of a BE is down.
const config: CodegenConfig = {
  overwrite: true,
  schema: [
    {
      "http://localhost:4000": {
        headers: {
          "Content-Type": "application/json",
        },
      },
    },
  ],
  documents: ["./app/**/*.tsx"],
  // ignoreNoDocuments: true,
  generates: {
    "./app/graphql/gql/": {
      preset: "client",
    },
  },
};

export default config;
