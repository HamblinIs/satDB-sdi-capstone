import { rest } from 'msw';

let searchTerm = "asc"
let id = 1
let email = "ihamblin@yahoo.com"

export const handlers = [
    rest.get(`http://localhost:8080/satellites`, (req, res, ctx) => {
    return res(ctx.json( [
        {
            id: 1,
            orbit: "LEO",
            owner: "AFRL",
            name: "ASCENT",
            tail_num: 17245
        }
    ]))
  }),
rest.get(`http://localhost:8080/satellites?name=${searchTerm}`, (req, res, ctx) => {
    return res(ctx.json(  [
        {
            id: 1,
            name: "ASCENT",
            orbit: "LEO",
            owner: "AFRL",
            tail_num: 17245
        }
    ])
  )}),
  rest.get(`http://localhost:8080/satellites/${id}`, (req, res, ctx) => {
    return res(ctx.json( [
        {
            id: 1,
            orbit: "LEO",
            owner: "AFRL",
            name: "ASCENT",
            tail_num: 17245
        }
    ]))
  }),
  rest.get('https://celestrak.org/NORAD/elements/gp.php?GROUP=visual&FORMAT=json', (req, res, ctx) => {
    return res(ctx.json( [
        {
            "OBJECT_NAME": "ATLAS CENTAUR 2",
            "OBJECT_ID": "1963-047A",
            "EPOCH": "2024-04-25T02:44:15.837216",
            "MEAN_MOTION": 14.07309149,
            "ECCENTRICITY": 0.0566856,
            "INCLINATION": 30.358,
            "RA_OF_ASC_NODE": 43.3597,
            "ARG_OF_PERICENTER": 195.6054,
            "MEAN_ANOMALY": 162.6387,
            "EPHEMERIS_TYPE": 0,
            "CLASSIFICATION_TYPE": "U",
            "NORAD_CAT_ID": 694,
            "ELEMENT_SET_NO": 999,
            "REV_AT_EPOCH": 3469,
            "BSTAR": 0.00039272,
            "MEAN_MOTION_DOT": 3.205e-5,
            "MEAN_MOTION_DDOT": 0
        }
    ]))
  }),
  rest.post('http://localhost:8080/auth/login', (req, res, ctx) => {
    return res(ctx.json( [
        {
            status: "Authenticated", 
            userData: {
                "id": 1,
                "first_name": "Isaac",
                "last_name": "Hamblin",
                "password": "$2b$10$A2A8/l33XrxF0rBcmwVg0uLhTyHdqKTEBWjcMFdGyR4s56DpCr/ju",
                "email": "ihamblin@yahoo.com"
            }
        }
    ]))
  })
]