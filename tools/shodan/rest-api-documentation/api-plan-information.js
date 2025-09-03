/**
 * Function to retrieve API plan information from Shodan.
 *
 * @param {Object} args - Arguments for the API request.
 * @param {string} args.apiKey - The API key for authenticating the request.
 * @returns {Promise<Object>} - The response containing API plan information.
 */
const executeFunction = async ({ apiKey }) => {
  const baseUrl = 'https://api.shodan.io';
  const key = apiKey; // will be provided by the user
  try {
    // Construct the URL with the API key
    const url = new URL(`${baseUrl}/api-info`);
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
    console.error('Error retrieving API plan information:', error);
    return {
      error: `An error occurred while retrieving API plan information: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving API plan information from Shodan.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_api_plan_info',
      description: 'Retrieve API plan information from Shodan.',
      parameters: {
        type: 'object',
        properties: {
          apiKey: {
            type: 'string',
            description: 'The API key for authenticating the request.'
          }
        },
        required: ['apiKey']
      }
    }
  }
};

export { apiTool };