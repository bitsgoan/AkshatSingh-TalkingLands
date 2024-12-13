1. You can use any spatial database for development - Used MongoDB.

   ![image](https://github.com/user-attachments/assets/29f012af-015d-4c40-b895-787b12f5c8d6)

   ![image](https://github.com/user-attachments/assets/7acee981-d3f8-42d6-be49-153eeef8f793)
  
2. API's (Please wait for 20 secs since this is a free s service)

States: 
      a. GET https://akshatsingh-talkinglands.onrender.com/api/states
      
      b. GET https://akshatsingh-talkinglands.onrender.com/api/states/Vermont

      c. POST GET https://akshatsingh-talkinglands.onrender.com/api/states

         Body:
            Content-Type: application/json
            
            {
              "name": "Hawaii",
              "abbreviation": "HI",
              "geometry": {
                "type": "MultiPolygon",
                "coordinates": [
                  [
                    [
                      [-155.634835, 18.948267],
                      [-155.881297, 19.035898],
                      [-155.919158, 19.123729],
                    ]
                  ]
                ]
              },
              "properties": {
                "population": 1415872,
                "density": 219.9,
                "capital": "Honolulu",
                "geoid": "15"
              }
            }

      d. PUT /api/states/Vermony
        
         Body:
            Content-Type: application/json
   
            {
              "properties": {
                "population": 1420000,
                "density": 220.5
              }
            }

                  
Points:
      a. GET https://akshatsingh-talkinglands.onrender.com/api/points

      b. POST https://akshatsingh-talkinglands.onrender.com/api/points
         
               Content-Type: application/json
         
         {
           "name": "Times Square",
           "description": "New Year's Eve Celebration",
           "eventTime": "2024-12-31T20:00:00",
           "price": 0,
           "longitude": -73.985130,
           "latitude": 40.758896,
           "address": "Times Square, New York, NY 10036"
         }

      c. PUT /api/points/675bc4adfb1523879cdd276d
            Content-Type: application/json
            
            {
              "description": "New Year's Eve Celebration 2025",
              "eventTime": "2024-12-31T19:00:00",
              "price": 10.00
            }


3. Notes

   States: This has 43 states data. The data was quite robust, I have drilled it down to include only close to 300 points per state.
   Points: This has dummy data
