/**
 * Function to search trends using the Shodan Trends API.
 *
 * @param {Object} args - Arguments for the search.
 * @param {string} args.query - The search query used to search the historical database.
 * @param {string} args.facets - A comma-separated list of properties to get summary information on.
 * @param {string} args.key - The API key required to use the API.
 * @returns {Promise<Object>} - The result of the trends search.
 */
const executeFunction = async ({ query, facets, key }) => {
  const baseUrl = 'https://trends.shodan.io';
  const apiKey = process.env.SHODAN_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/api/v1/search`);
    url.searchParams.append('query', query);
    url.searchParams.append('facets', facets);
    url.searchParams.append('key', key || apiKey);

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
    console.error('Error searching trends:', error);
    return {
      error: `An error occurred while searching for trends: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for searching trends using the Shodan Trends API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'search_trends',
      description: 'Get breakdown of historical results aggregate by facet field.',
      parameters: {
        type: 'object',
        properties: {
          query: {
            type: 'string',
            description: 'The search query used to search the historical database.'
          },
          facets: {
            type: 'string',
            description: 'A comma-separated list of properties to get summary information on.'
          },
          key: {
            type: 'string',
            description: 'The API key required to use the API.'
          }
        },
        required: ['query', 'key']
      }
    }
  }
};

export { apiTool };