/**
 * Function to list all ports that Shodan is crawling on the Internet.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.apiKey - The API key required to access the Shodan API.
 * @returns {Promise<Object>} - The response from the Shodan API containing the list of ports.
 */
const executeFunction = async ({ apiKey }) => {
  const baseUrl = 'https://api.shodan.io';
  const key = apiKey; // will be provided by the user

  try {
    // Construct the URL with the API key
    const url = new URL(`${baseUrl}/shodan/ports`);
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
    console.error('Error listing ports:', error);
    return {
      error: `An error occurred while listing ports: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for listing ports on Shodan.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'list_shodan_ports',
      description: 'List all ports that Shodan is crawling on the Internet.',
      parameters: {
        type: 'object',
        properties: {
          apiKey: {
            type: 'string',
            description: 'The API key required to access the Shodan API.'
          }
        },
        required: ['apiKey']
      }
    }
  }
};

export { apiTool };