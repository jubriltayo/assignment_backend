require('dotenv').config({ path: '.env.local' });
const { generate } = require('@graphql-codegen/cli');

generate(
  {
    schema: [
      {
        [process.env.HASURA_GRAPHQL_URL]: {
          headers: {
            'X-Hasura-Admin-Secret': process.env.HASURA_ADMIN_SECRET,
          },
        },
      },
    ],
    documents: null,
    generates: {
      './types/hasura.ts': {
        plugins: ['typescript', 'typescript-operations'],
        config: {
          scalars: {
            uuid: 'string',
            timestamptz: 'string',
            date: 'string',
          },
        },
      },
    },
    overwrite: true,
  },
  true
);
