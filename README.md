Redirection from HTTP to HTTPS
Summary:
Install concurrently if not already installed
npm install concurrently --save-dev
Define the server1:watch and server2:watch scripts in your package.json.
Run the dev script:
npm run dev

Available scripts:
npm run dev: Runs both servers concurrently (i.e., server1:watch and server2:watch).
npm run server1:watch: Starts the first server in watch mode (adjust path or command as needed).
npm run server2:watch: Starts the second server in watch mode (adjust path or command as needed).

Scripts
This project includes the following npm scripts:

dev
Starts both server1:watch and server2:watch concurrently.

json
"dev": "concurrently \"npm run server1:watch\" \"npm run server2:watch\""
server1:watch
Runs the first server in watch mode.
Example:

json
"server1:watch": "node ./server1/watch.js"
server2:watch

Runs the second server in watch mode.
Example:

json
"server2:watch": "node ./server2/watch.js"



1. Testing the Redirection from HTTP to HTTPS:
Step 1: Test HTTP Request (Non-Secure)
Open Postman.
Select the HTTP protocol (i.e., http://) and enter the URL for your endpoint (e.g., http://localhost:3000 if you're running your app locally on port 3000).
Choose the GET method.
Click Send.
Expected result:

The request will be redirected to https://localhost:443 (or the port you're using for your HTTPS server).
You should see a 301 Moved Permanently status code and the redirection URL in the response headers.
Step 2: Test HTTPS Request (Secure)
Change the URL in Postman to https://localhost:443 (or your HTTPS port).
Choose the GET method.
Click Send.
Expected result:

The response body should be Hello, Secure World!.
2. Testing POST Request:
Step 1: Test the POST Request
Open Postman again.
Set the URL to the root of your app (http://localhost:3000 or https://localhost:443 depending on which protocol you're testing).
Select the POST method.
In the Body tab of Postman, choose the raw option and select JSON from the dropdown.
Add the JSON data you want to send in the body. For example:
json
Kopiera
{
    "username": "testuser",
    "password": "securepassword"
}
Click Send.
Expected result:

Your server should log the received POST data in the console (e.g., Received POST request: { username: "testuser", password: "securepassword" }).
You should receive a 201 Created response with the JSON data:
json
Kopiera
{
  "success": "true"
}






Common Troubleshooting:
SSL Certificate Issues (for HTTPS requests in Postman):

If you're using a self-signed certificate for HTTPS, Postman might show a warning about an insecure certificate. To bypass this:
Go to Settings in Postman.
Under the General tab, turn off SSL certificate verification.
Redirection Not Working:

If the redirection from HTTP to HTTPS isn't working, check your Express app's redirect logic. Ensure that req.secure correctly detects whether the request is using HTTPS.
Make sure your server is running on the correct ports (3000 for HTTP and 443 for HTTPS).
Port Mismatch:

Ensure you're hitting the correct port in Postman. For HTTP, it might be something like http://localhost:3000, and for HTTPS, it would be https://localhost:443.
Ensure Server is Running:

Make sure both your HTTP and HTTPS servers are running. If you're using concurrently, ensure that both services are up and running in separate terminals or processes.



Recap of Testing with Postman:
Test HTTP to HTTPS redirection (GET).
Test HTTPS endpoint (GET).
Test POST request with JSON data.
Verify responses and check the console logs for POST request details.
