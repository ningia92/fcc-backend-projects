# URL Shortener Microservice

The URL Shortener Microservice project on freeCodeCamp is focused on building a microservice that takes in a URL, shortens it, and allows users to retrieve the original URL using the shortened version.

Here are the main features you need to implement:
  1. POST a URL: Users can send a POST request with a URL to /api/shorturl. The service will generate and return a shortened version of the URL as part of a JSON response, containing both the original and short URLs.
  2. Handle Invalid URLs: If the user submits an invalid URL that doesn’t follow the standard http(s)://www.example.com format, the API will return an error message in JSON format, such as {"error":"invalid URL"}.
  3. Redirection: When a user visits the shortened URL, they should be redirected to the original website associated with that short URL.
     
The full stack JavaScript app that is functionally similar to [this](https://url-shortener-microservice.freecodecamp.rocks/).
This project helps you practice working with routing, database interaction (storing URLs), and HTTP requests in a Node.js and Express environment.
