/**
 * Function to crawl the Internet for a specific port and protocol using Shodan.
 *
 * @param {Object} args - Arguments for the crawl request.
 * @param {number} args.port - The port that Shodan should crawl the Internet for.
 * @param {string} args.protocol - The name of the protocol that should be used to interrogate the port.
 * @returns {Promise<Object>} - The result of the crawl request.
 */
const executeFunction = async ({ port, protocol }) => {
  const baseUrl = 'https://api.shodan.io';
  const apiKey = process.env.SHODAN_API_KEY;
  try {
    // Construct the URL with the API key
    const url = new URL(`${baseUrl}/shodan/scan/internet`);
    url.searchParams.append('key', apiKey);

    // Set up headers for the request
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Accept': 'application/json'
    };

    // Prepare the body data
    const bodyData = new URLSearchParams();
    bodyData.append('port', port);
    bodyData.append('protocol', protocol);

    // Perform the fetch request
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers,
      body: bodyData
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
    console.error('Error crawling the Internet for port and protocol:', error);
    return {
      error: `An error occurred while crawling: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for crawling the Internet for a specific port and protocol using Shodan.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'crawl_internet',
      description: 'Crawl the Internet for a specific port and protocol using Shodan.',
      parameters: {
        type: 'object',
        properties: {
          port: {
            type: 'integer',
            description: 'The port that Shodan should crawl the Internet for.'
          },
          protocol: {
            type: 'string',
            description: 'The name of the protocol that should be used to interrogate the port.'
          }
        },
        required: ['port', 'protocol']
      }
    }
  }
};

export { apiTool };