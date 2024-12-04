# Project Overview
Glamo is a platform designed to help users find beauty professionals based on the services they provide within a specific radius, either from the user's current location or a manually selected one. The results are displayed on a Google Map for easy navigation.

If you are a beauty professional, you can register as a beauty master, specify your services, and set your address so other users can find you.

## Features
- Google Maps Rendering: Displaying locations of beauty professionals on a map.
- Data Fetching: Fetching beauty professionals' information, including their profiles and locations, from the backend.
- Profile View: Viewing beauty professionals' details directly on the map.

## Setup
Basic React setup:

Clone the repository.
Run ``` npm install ``` to install dependencies.
Run ``` npm start ``` to start the application in development mode.

## Interactions
### Select Location:
Use the search box to find a specific address or allow the app to detect your current location.
### Choose Category:
Select the service category (e.g., nails, hair, makeup).
### Set Radius:
Adjust the desired search radius to filter results.
### Search:
Click the search button to retrieve and display beauty professionals on the map.

## Environment Variables
To run the application, create a ```.env``` file in the root directory and include the following environment variable:

``` REACT_APP_GOOGLE_MAPS_API_KEY=your-google-maps-api-key  ```

## Scripts
```npm install```: Install dependencies.
```npm start```: Start the application in development mode.
```npm build```: Build the application for production.

## Testing
### To test the application:

Enter **London, UK** in the search box and select the first suggestion from the dropdown.
Click the **Search** button to view the test beauty professionals (sample data) in the London area displayed on the map.

