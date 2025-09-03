/**
 * Function to list all filters that can be used when searching on Shodan.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.apiKey - The API key for authenticating with Shodan.
 * @returns {Promise<Object>} - The result of the request containing search filters.
 */
const executeFunction = async ({ apiKey }) => {
  const baseUrl = 'https://api.shodan.io';
  const key = ''; // will be provided by the user
  try {
    // Construct the URL with the API key
    const url = new URL(`${baseUrl}/shodan/host/search/filters`);
    url.searchParams.append('key', key);

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
    console.error('Error listing search filters:', error);
    return {
      error: `An error occurred while listing search filters: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing search filters on Shodan.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_search_filters',
      description: 'List all filters that can be used when searching on Shodan.',
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