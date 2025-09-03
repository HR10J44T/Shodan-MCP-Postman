/**
 * Function to search Shodan for host count based on a query.
 *
 * @param {Object} args - Arguments for the search.
 * @param {string} args.key - The API key for authenticating with Shodan.
 * @param {string} args.query - The Shodan search query.
 * @param {string} [args.facets] - A comma-separated list of properties to get summary information on.
 * @returns {Promise<Object>} - The result of the host count search.
 */
const executeFunction = async ({ key, query, facets }) => {
  const baseUrl = 'https://api.shodan.io';
  const apiKey = process.env.SHODAN_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/shodan/host/count`);
    url.searchParams.append('key', key || apiKey);
    url.searchParams.append('query', query);
    if (facets) {
      url.searchParams.append('facets', facets);
    }

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
    console.error('Error searching Shodan host count:', error);
    return {
      error: `An error occurred while searching for Shodan host count: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for searching Shodan host count.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'search_shodan_host_count',
      description: 'Search for host count on Shodan based on a query.',
      parameters: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            description: 'The API key for authenticating with Shodan.'
          },
          query: {
            type: 'string',
            description: 'The Shodan search query.'
          },
          facets: {
            type: 'string',
            description: 'A comma-separated list of properties to get summary information on.'
          }
        },
        required: ['key', 'query']
      }
    }
  }
};

export { apiTool };