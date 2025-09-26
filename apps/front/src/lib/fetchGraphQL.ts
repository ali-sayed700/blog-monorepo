import { BACKEND_URL } from './constants';
import { getSession } from './sessions';

export const fetchGraphQL = async (query: string, variables = {}) => {
  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  });

  const res = await response.json();
  if (res.errors) {
    // throw new Error('Error in GraphQL query');
    console.log('Error in GraphQL query');
  }

  return res.data;
};

export const authFetchGraphQL = async (query: string, variables = {}) => {
  const session = await getSession();

  const response = await fetch(`${BACKEND_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const result = await response.json();
  if (result.errors) {
    console.error('GraphQL errors:', result.errors);
    // throw new Error('Failed to fetch the data from GraphQL');
  }

  return result.data;
};
