# Exercise Tracker

The Exercise Tracker Microservice project from freeCodeCamp allows users to create a system where they can track exercise data. Here’s how it works:
  1. User Creation: You can create a new user by submitting a username via a form to the /api/users endpoint, which returns the user's username and _id.
  2. Adding Exercises: For each user, you can log exercises by sending a POST request with the user’s _id, along with details like description, duration, and optionally date (defaults to the current date if omitted). This gets stored as an exercise log for that user.
  3. Retrieving Logs: You can retrieve a full exercise log for any user by querying the /api/users/:_id/logs endpoint, which returns a list of exercises with information such as description, duration, and date. Optionally, parameters like from, to, and limit can be passed to filter or limit the results.

The full stack JavaScript app that is functionally similar to [this](https://exercise-tracker.freecodecamp.rocks). This project integrates MongoDB for data storage and is a great example of building RESTful APIs with Node.js​

