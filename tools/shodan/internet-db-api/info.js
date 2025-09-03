/**
 * Function to get information about an IP, including open ports and vulnerabilities.
 *
 * @param {Object} args - Arguments for the IP information retrieval.
 * @param {string} args.ip - The IP address to lookup.
 * @returns {Promise<Object>} - The result of the IP information lookup.
 */
const executeFunction = async ({ ip }) => {
  const baseUrl = 'https://internetdb.shodan.io';
  try {
    // Construct the URL for the request
    const url = `${baseUrl}/${ip}`;

    // Set up headers for the request
    const headers = {
      'Accept': 'application/json'
    };

    // Perform the fetch request
    const response = await fetch(url, {
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
    console.error('Error retrieving IP information:', error);
    return {
      error: `An error occurred while retrieving IP information: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for retrieving IP information.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_ip_info',
      description: 'Get information about an IP, including open ports and vulnerabilities.',
      parameters: {
        type: 'object',
        properties: {
          ip: {
            type: 'string',
            description: 'The IP address to lookup.'
          }
        },
        required: ['ip']
      }
    }
  }
};

export { apiTool };