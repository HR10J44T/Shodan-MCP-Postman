/**
 * Function to get a list of all the created scans from Shodan.
 *
 * @param {Object} args - Arguments for the request.
 * @param {string} args.apiKey - The API key for authenticating with the Shodan API.
 * @returns {Promise<Object>} - The response containing the list of scans.
 */
const executeFunction = async ({ apiKey }) => {
  const baseUrl = 'https://api.shodan.io';
  try {
    // Construct the URL with the API key
    const url = new URL(`${baseUrl}/shodan/scans`);
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
    console.error('Error fetching scans:', error);
    return {
      error: `An error occurred while fetching scans: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting the list of scans from Shodan.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_scans',
      description: 'Get a list of all the created scans from Shodan.',
      parameters: {
        type: 'object',
        properties: {
          apiKey: {
            type: 'string',
            description: 'The API key for authenticating with the Shodan API.'
          }
        },
        required: ['apiKey']
      }
    }
  }
};

export { apiTool };