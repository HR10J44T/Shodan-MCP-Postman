/**
 * Function to list all search facets from Shodan.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.apiKey - The API key for authenticating with Shodan.
 * @returns {Promise<Object>} - The result of the search facets request.
 */
const executeFunction = async ({ apiKey }) => {
  const baseUrl = 'https://api.shodan.io';
  try {
    // Construct the URL with the API key
    const url = new URL(`${baseUrl}/shodan/host/search/facets`);
    url.searchParams.append('key', apiKey);

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
    console.error('Error listing search facets:', error);
    return {
      error: `An error occurred while listing search facets: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing search facets from Shodan.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_search_facets',
      description: 'List all search facets from Shodan.',
      parameters: {
        type: 'object',
        properties: {
          apiKey: {
            type: 'string',
            description: 'The API key for authenticating with Shodan.'
          }
        },
        required: ['apiKey']
      }
    }
  }
};

export { apiTool };