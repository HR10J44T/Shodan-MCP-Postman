/**
 * Function to break the search query into tokens using the Shodan API.
 *
 * @param {Object} args - Arguments for the tokenization.
 * @param {string} args.key - Your Shodan API key.
 * @param {string} args.query - The Shodan search query.
 * @returns {Promise<Object>} - The result of the tokenization.
 */
const executeFunction = async ({ key, query }) => {
  const baseUrl = 'https://api.shodan.io';
  const apiKey = process.env.SHODAN_API_KEY;
  const searchQuery = ''; // will be provided by the user

  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/shodan/host/search/tokens`);
    url.searchParams.append('key', key || apiKey);
    url.searchParams.append('query', query || searchQuery);

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers
    });

    // Check if the response was successful
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(JSON.stringify(errorData));
    }

    // Parse and return the response data
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error breaking the search query into tokens:', error);
    return {
      error: `An error occurred while breaking the search query into tokens: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for breaking the search query into tokens using the Shodan API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'break_search_query_into_tokens',
      description: 'Break the search query into tokens using the Shodan API.',
      parameters: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            description: 'Your Shodan API key.'
          },
          query: {
            type: 'string',
            description: 'The Shodan search query.'
          }
        },
        required: ['key', 'query']
      }
    }
  }
};

export { apiTool };