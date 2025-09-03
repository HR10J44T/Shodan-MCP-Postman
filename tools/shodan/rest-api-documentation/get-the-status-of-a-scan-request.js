/**
 * Function to get the status of a scan request from Shodan.
 *
 * @param {Object} args - Arguments for the scan status request.
 * @param {string} args.id - The ID of the scan request to check the status of.
 * @param {string} args.apiKey - The API key for authenticating the request.
 * @returns {Promise<Object>} - The result of the scan status request.
 */
const executeFunction = async ({ id, apiKey }) => {
  const baseUrl = 'https://api.shodan.io';
  const key = ''; // will be provided by the user
  try {
    // Construct the URL with the scan ID and API key
    const url = new URL(`${baseUrl}/shodan/scans/${id}`);
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
    console.error('Error getting scan status:', error);
    return {
      error: `An error occurred while getting the scan status: ${error instanceof Error ? error.message : JSON.stringify(error)}`
    };
  }
};

/**
 * Tool configuration for getting the status of a scan request on Shodan.
 * @type {Object}
 */
const apiTool = {
  function: executeFunction,
  definition: {
    type: 'function',
    function: {
      name: 'get_scan_status',
      description: 'Get the status of a scan request on Shodan.',
      parameters: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: 'The ID of the scan request to check the status of.'
          },
          apiKey: {
            type: 'string',
            description: 'The API key for authenticating the request.'
          }
        },
        required: ['id', 'apiKey']
      }
    }
  }
};

export { apiTool };