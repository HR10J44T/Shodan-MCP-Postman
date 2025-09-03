/**
 * Function to retrieve host information from Shodan.
 *
 * @param {Object} args - Arguments for the host information retrieval.
 * @param {string} args.ip - The IP address of the host to retrieve information for.
 * @param {string} args.key - The API key for authenticating with the Shodan API.
 * @param {boolean} [args.history=false] - True if all historical banners should be returned.
 * @param {boolean} [args.minify=false] - True to only return the list of ports and general host information, no banners.
 * @returns {Promise<Object>} - The result of the host information retrieval.
 */
const executeFunction = async ({ ip, key, history = false, minify = false }) => {
  const baseUrl = 'https://api.shodan.io';
  const apiKey = process.env.SHODAN_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/shodan/host/${ip}`);
    url.searchParams.append('key', key || apiKey);
    url.searchParams.append('history', history.toString());
    url.searchParams.append('minify', minify.toString());

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
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
    console.error('Error retrieving host information:', error);
    return {
      error: `An error occurred while retrieving host information: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving host information from Shodan.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_host_info',
      description: 'Retrieve information about a specific host from Shodan.',
      parameters: {
        type: 'object',
        properties: {
          ip: {
            type: 'string',
            description: 'The IP address of the host to retrieve information for.'
          },
          key: {
            type: 'string',
            description: 'The API key for authenticating with the Shodan API.'
          },
          history: {
            type: 'boolean',
            description: 'True if all historical banners should be returned.'
          },
          minify: {
            type: 'boolean',
            description: 'True to only return the list of ports and general host information, no banners.'
          }
        },
        required: ['ip', 'key']
      }
    }
  }
};

export { apiTool };