/**
 * Function to perform a reverse DNS lookup using the Shodan API.
 *
 * @param {Object} args - Arguments for the reverse DNS lookup.
 * @param {string} args.key - The API key for authenticating with the Shodan API.
 * @param {string} args.ips - Comma-separated list of IP addresses to look up.
 * @returns {Promise<Object>} - The result of the reverse DNS lookup.
 */
const executeFunction = async ({ key, ips }) => {
  const baseUrl = 'https://api.shodan.io';
  const apiKey = process.env.SHODAN_API_KEY;

  try {
    // Construct the URL with query parameters
    const url = new URL(`${baseUrl}/dns/reverse`);
    url.searchParams.append('key', key);
    url.searchParams.append('ips', ips);

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
    console.error('Error performing reverse DNS lookup:', error);
    return {
      error: `An error occurred while performing reverse DNS lookup: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for performing reverse DNS lookup using the Shodan API.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'reverse_dns_lookup',
      description: 'Look up the hostnames for the given list of IP addresses.',
      parameters: {
        type: 'object',
        properties: {
          key: {
            type: 'string',
            description: 'The API key for authenticating with the Shodan API.'
          },
          ips: {
            type: 'string',
            description: 'Comma-separated list of IP addresses to look up.'
          }
        },
        required: ['key', 'ips']
      }
    }
  }
};

export { apiTool };