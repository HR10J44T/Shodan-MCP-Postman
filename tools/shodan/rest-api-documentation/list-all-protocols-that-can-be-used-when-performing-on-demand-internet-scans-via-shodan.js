/**
 * Function to list all protocols that can be used for on-demand Internet scans via Shodan.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.apiKey - The API key required to authenticate the request.
 * @returns {Promise<Object>} - The result of the protocols request.
 */
const executeFunction = async ({ apiKey }) => {
  const baseUrl = 'https://api.shodan.io';
  try {
    // Construct the URL with the API key
    const url = new URL(`${baseUrl}/shodan/protocols`);
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
    console.error('Error listing protocols:', error);
    return {
      error: `An error occurred while listing protocols: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing protocols on Shodan.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_protocols',
      description: 'List all protocols that can be used for on-demand Internet scans via Shodan.',
      parameters: {
        type: 'object',
        properties: {
          apiKey: {
            type: 'string',
            description: 'The API key required to authenticate the request.'
          }
        },
        required: ['apiKey']
      }
    }
  }
};

export { apiTool };