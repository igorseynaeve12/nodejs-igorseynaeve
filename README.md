[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/5ykzvLV4)


[baseurl]:http://localhost:4510/
[parking]:api/parkings


# Documentatie API

# Endpoint 1: welkomstbericht

get [baseurl]

output: {
  "message": "Welkom op deze Api-pagina van Igor Seynaeve hier kan je parkings bekijken"
}

# Endpoint 2: alle steden ophalen

get http://localhost:4510/parkings

code:
 * Retrieves all the steden from the database and sends them as a response.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {void}
 
async (req, res) => {
    try{
        // Fetch all steden from the database using the getSteden function
        const stedenData = await getSteden();

        // Send the fetched steden as a JSON response with status 200
        res.status(200).json(stedenData.stad);
    } catch(err){
        // If an error occurs during the process, send the error as a JSON response with status 500
        res.status(500).json(err);
    }
}

        output: [
          {
            "_id": "664f6bf31a2815c6ee3f9840",
            "name": "Parking schouwburgplein",
            "stad": "664f6b801a2815c6ee3f9836",
            "plaatsen": 700,
            "__v": 0
          },
          {
            "_id": "664f6bfe1a2815c6ee3f9843",
            "name": "Parking Casinoplein",
            "stad": "664f6b801a2815c6ee3f9836",
            "plaatsen": 1200,
            "__v": 0
          },
          {
            "_id": "664f6c0f1a2815c6ee3f9846",
            "name": "Parking Grote Markt",
            "stad": "664f6b801a2815c6ee3f9836",
            "plaatsen": 2500,
            "__v": 0
          },
          {
            "_id": "664f6c2b1a2815c6ee3f9849",
            "name": "Parking Zand",
            "stad": "664f6b911a2815c6ee3f9838",
            "plaatsen": 260,
            "__v": 0
          },
          {
            "_id": "664f6c391a2815c6ee3f984c",
            "name": "Parking Oostblok",
            "stad": "664f6b911a2815c6ee3f9838",
            "plaatsen": 340,
            "__v": 0
          },
          {
            "_id": "664f6c461a2815c6ee3f984f",
            "name": "Parking Polip",
            "stad": "664f6b911a2815c6ee3f9838",
            "plaatsen": 1200,
            "__v": 0
          },
          {
            "_id": "664f6c591a2815c6ee3f9852",
            "name": "Parking Strand",
            "stad": "664f6ba71a2815c6ee3f983a",
            "plaatsen": 3000,
            "__v": 0
          },
          {
            "_id": "664f6c621a2815c6ee3f9855",
            "name": "Parking Haven",
            "stad": "664f6ba71a2815c6ee3f983a",
            "plaatsen": 220,
            "__v": 0
          },
          {
            "_id": "664f6c6b1a2815c6ee3f9858",
            "name": "Parking Station",
            "stad": "664f6ba71a2815c6ee3f983a",
            "plaatsen": 550,
            "__v": 0
          },
          {
            "_id": "664f6cbfe3c665b80eb5ff73",
            "name": "Parking Station",
            "stad": "664f6bb51a2815c6ee3f983c",
            "plaatsen": 100,
            "__v": 0
          },
          {
            "_id": "664f6cdbe3c665b80eb5ff76",
            "name": "Parking Walivs",
            "stad": "664f6bb51a2815c6ee3f983c",
            "plaatsen": 670,
            "__v": 0
          }
        ]

# Endpoint 3: alle steden ophalen bij ID

get http://localhost:4510/api/parkings/664f6cdbe3c665b80eb5ff76

code:
 * Retrieves a single stad document by its ID.
 * @function
 * @param {object} req - The request object
 * @param {object} res - The response object
 * @returns {object} - A JSON object representing the stad document
 * @throws Will throw an error if the stad document is not found or if there is a server error.

   
        async (req, res) => {
            try{
                // Find the stad document by its ID
                const stad = await steden.findById(req.params.id);

        // Send the stad document as a JSON response with a status code of 200
        res.status(200).json(stad);
         } catch(err){
              // If there is an error, send the error message as a JSON response with a status code of 500
              res.status(500).json(err);
          }
        }


        output: {
          "_id": "664f6cdbe3c665b80eb5ff76",
          "name": "Parking Walivs",
          "stad": "664f6bb51a2815c6ee3f983c",
          "plaatsen": 670,
          "__v": 0
        }

   # Endpoint 4: een stad posten naar de database
   
   post http://localhost:4510/api/parkings

   code:
 * POST request handler for creating a new city.
 * @param {Object} req - The request object
 * @param {Object} res - The response object
 * @returns {void}


        async (req, res) => {
            try{
                // Define validation schema for the request body
                const schema = joi.object({
                    name: joi.string().required(),
                    postcode: joi.number().required(),
                })
    
              // Validate the request body against the schema
              const {error} = schema.validate(req.body);
              // If validation fails, return a 400 status with the error message
              if(error) return res.status(400).send(error.details[0].message);
          
              // Create a new city document using the request body
              const stad = new steden({
                  name: req.body.name,
                  postcode: req.body.postcode,
              })
              // Save the new city document to the database
              await stad.save();
              // Return a 200 status with the newly created city document
              res.status(200).json(stad);
        } catch(err){
            // If an error occurs during processing, return a 500 status with the error message
            res.status(500).json(err);
          }
        }
   
        output:
   

   # Endpoint 5: een stad updaten
   # Endpoint 6: een stad deleten
   # Endpoint 7: een stad
