# asurityTest
Asurity test project

Running:
To run the app navigate to the asurity-test-app folder and run the command “ng serve --open”.



Notes:
I had some issues while trying to set up the .NET API. I found that the issues were the result
of an issue with a CORS policy that restricts what APIs can be requested by an application.
I decided to just set up a mock API similar to the mock database that just uses in-app data.
The code to access the API is commented out if it needed to be reviewed. I also restored the
code for the API in case it was of interest, though it is just a modified version of the default
.NET API project file set to return state data rather than weather data.


My method for keeping the API separate was to have a dedicated API service used to retrieve API
data and also to have default data that is always returned so that unit tests can run. When this
default data is returned an error is triggered that indicates this should only occur when unit
testing. Since the code doesn’t connect to an actual API, this case can be tested by changing
the “mockApiOffline” value in the “api.service.ts” file to “true”.
