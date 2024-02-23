open the console to see if there any any errors
- see if we can go to the year 2023
- create 3 reminders on Dec 25th
- - 2 AM
- - 1st reminder that has over thirty characters
- - 1 AM
- - 2st reminder that has over thirty characters
- - 3 AM
- - 3st reminder that has over thirty characters
- check if the order is correct, it should show: 
- - 2st reminder that has over thirty characters
- - 1st reminder that has over thirty characters
- - 3st reminder that has over thirty characters
- - Edit any
- Verify if the fields are being validated

Code review
- Check package.json, verify if there are testing or development libs in the dependencies


Pros:
- validation as the user adds the data
- uses react hook form
- uses zod
- uses tanstack

Cons

- There are data validations in the UI but it doesn't say what is invalid
- has dev dependencies in the dependencies
