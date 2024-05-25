[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/5ykzvLV4)


[baseurl]:http://localhost:4510/
[parking]:api/parkings


# Documentatie API

Endpoint 1: welkomstbericht

get [baseurl]

output: {
  "message": "Welkom op deze Api-pagina van Igor Seynaeve hier kan je parkings bekijken"
}

Endpoint 2: alle parkings ophalen

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
        }   catch(err){
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

Endpoint 3: alle parkings ophalen bij ID

get http://localhost:4510/api/parkings/664f6cdbe3c665b80eb5ff76

output: {
  "_id": "664f6cdbe3c665b80eb5ff76",
  "name": "Parking Walivs",
  "stad": "664f6bb51a2815c6ee3f983c",
  "plaatsen": 670,
  "__v": 0
}