/**
 * Function to perform a DNS lookup for a list of hostnames using the Shodan API.
 *
 * @param {Object} args - Arguments for the DNS lookup.
 * @param {string} args.key - The API key for authenticating with the Shodan API.
 * @param {string} args.hostnames - Comma-separated list of hostnames to resolve.
 * @returns {Promise<Object>} - The result of the DNS lookup.
 */
const executeFunction = async ({ key, hostnames }) => {
  const baseUrl = 'https://api.shodan.io';
  const apiKey = process.env.SHODAN_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/dns/resolve`);
    url.searchParams.append('key', key || apiKey);
    url.searchParams.append('hostnames', hostnames);

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
    console.error('Error performing DNS lookup:', error);
    return {
      error: `An error occurred while performing DNS lookup: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for performing DNS lookups using the Shodan API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'dns_lookup',
      description: 'Look up the IP address for the provided list of hostnames.',
      parameters: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            description: 'The API key for authenticating with the Shodan API.'
          },
          hostnames: {
            type: 'string',
            description: 'Comma-separated list of hostnames to resolve.'
          }
        },
        required: ['key', 'hostnames']
      }
    }
  }
};

export { apiTool };