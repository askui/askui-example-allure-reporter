var mockServerClient = require('mockserver-client').mockServerClient;

export async function setupMockServer() {
    await mockServerClient("localhost", 32768).mockAnyResponse({
        "httpRequest": {
            "method": "POST",
        },
        "httpResponse": {
            "statusCode": 500,
        }
    });
    await mockServerClient("localhost", 32768).mockAnyResponse({
        "httpRequest": {
            "method": "POST",
        },
        "httpResponse": {
            "statusCode": 500,
        }
    });
}
