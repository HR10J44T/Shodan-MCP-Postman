/**
 * Function to get domain information from Shodan.
 *
 * @param {Object} args - Arguments for the domain information request.
 * @param {string} args.domain - The domain to retrieve information for.
 * @param {string} args.apiKey - Your Shodan API key.
 * @returns {Promise<Object>} - The result of the domain information request.
 */
const executeFunction = async ({ domain, apiKey }) => {
  const baseUrl = 'https://api.shodan.io';
  const key = ''; // will be provided by the user
  try {
    // Construct the URL with the domain and API key
    const url = new URL(`${baseUrl}/dns/domain/${domain}`);
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
    console.error('Error retrieving domain information:', error);
    return {
      error: `An error occurred while retrieving domain information: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving domain information from Shodan.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_domain_info',
      description: 'Get domain information from Shodan.',
      parameters: {
        type: 'object',
        properties: {
          domain: {
            type: 'string',
            description: 'The domain to retrieve information for.'
          },
          apiKey: {
            type: 'string',
            description: 'Your Shodan API key.'
          }
        },
        required: ['domain', 'apiKey']
      }
    }
  }
};

export { apiTool };