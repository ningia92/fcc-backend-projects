# Timestamp Microservice

Description: the Timestamp Microservice project from freeCodeCamp is designed to help you understand how to work with APIs and dates in JavaScript. The microservice allows users to send a date string (either in standard format like "YYYY-MM-DD" or a Unix timestamp) as a parameter in a URL, and it responds with a JSON object containing the corresponding Unix timestamp and UTC date. The full stack JavaScript app must be functionally similar to [this](https://timestamp-microservice.freecodecamp.rocks).

Here are the key features of the project:
  1. The API endpoint is GET /api/timestamp/:date_string?.
  2. If a valid date string is provided, the API returns a JSON object with both Unix and UTC formats of the timestamp.
  3. If no date is provided, the API defaults to the current date and time.
  4. If the date string is invalid, the API responds with an error message.

Example:
  - Request: /api/timestamp/2015-12-25
  - Response: { "unix": 1451001600000, "utc": "Fri, 25 Dec 2015 00:00:00 GMT" }
