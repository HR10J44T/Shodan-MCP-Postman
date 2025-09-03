/**
 * Function to request Shodan to crawl an IP or netblock.
 *
 * @param {Object} args - Arguments for the crawl request.
 * @param {string} args.ips - A comma-separated list of IPs or netblocks (in CIDR notation) that should get crawled.
 * @param {string} args.key - The API key for authenticating the request.
 * @returns {Promise<Object>} - The response from the Shodan API.
 */
const executeFunction = async ({ ips, key }) => {
  const baseUrl = 'https://api.shodan.io';
  const apiKey = process.env.SHODAN_API_KEY;
  try {
    // Construct the URL with the API key
    const url = new URL(`${baseUrl}/shodan/scan`);
    url.searchParams.append('key', key || apiKey);

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    };

    // Prepare the body for the POST request
    const body = new URLSearchParams();
    body.append('ips', ips);

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers,
      body: body.toString()
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
    console.error('Error requesting Shodan to crawl:', error);
    return {
      error: `An error occurred while requesting Shodan to crawl: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for requesting Shodan to crawl an IP or netblock.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'request_shodan_crawl',
      description: 'Request Shodan to crawl an IP or netblock.',
      parameters: {
        type: 'object',
        properties: {
          ips: {
            type: 'string',
            description: 'A comma-separated list of IPs or netblocks (in CIDR notation) that should get crawled.'
          },
          key: {
            type: 'string',
            description: 'The API key for authenticating the request.'
          }
        },
        required: ['ips', 'key']
      }
    }
  }
};

export { apiTool };