/**
 * Function to retrieve information about the Shodan account linked to the provided API key.
 *
 * @param {Object} args - Arguments for the account profile retrieval.
 * @param {string} args.key - The API key for accessing Shodan services.
 * @returns {Promise<Object>} - The result of the account profile retrieval.
 */
const executeFunction = async ({ key }) => {
  const baseUrl = 'https://api.shodan.io';
  const apiKey = process.env.SHODAN_API_KEY;
  try {
    // Construct the URL with the API key
    const url = new URL(`${baseUrl}/account/profile`);
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
    console.error('Error retrieving account profile:', error);
    return {
      error: `An error occurred while retrieving the account profile: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving Shodan account profile.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_shodan_account_profile',
      description: 'Retrieve information about the Shodan account linked to the provided API key.',
      parameters: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            description: 'The API key for accessing Shodan services.'
          }
        },
        required: ['key']
      }
    }
  }
};

export { apiTool };