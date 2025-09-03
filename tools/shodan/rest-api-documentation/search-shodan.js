/**
 * Function to search Shodan using the provided query and facets.
 *
 * @param {Object} args - Arguments for the search.
 * @param {string} args.key - Your Shodan API key.
 * @param {string} args.query - The Shodan search query.
 * @param {string} [args.facets] - A comma-separated list of properties to get summary information on.
 * @param {number} [args.page=1] - The page number to page through results (default: 1).
 * @returns {Promise<Object>} - The result of the Shodan search.
 */
const executeFunction = async ({ key, query, facets, page = 1 }) => {
  const baseUrl = 'https://api.shodan.io';
  const apiKey = process.env.SHODAN_API_KEY;
  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/shodan/host/search`);
    url.searchParams.append('key', key || apiKey);
    url.searchParams.append('query', query);
    if (facets) {
      url.searchParams.append('facets', facets);
    }
    url.searchParams.append('page', page.toString());

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
    console.error('Error searching Shodan:', error);
    return {
      error: `An error occurred while searching Shodan: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for searching Shodan.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'search_shodan',
      description: 'Search Shodan using the provided query and facets.',
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
          },
          facets: {
            type: 'string',
            description: 'A comma-separated list of properties to get summary information on.'
          },
          page: {
            type: 'integer',
            description: 'The page number to page through results.'
          }
        },
        required: ['key', 'query']
      }
    }
  }
};

export { apiTool };