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

  rest.get('https://celestrak.org/NORAD/elements/gp.php?GROUP=visual&FORMAT=tle', (req, res, ctx) => {
    return res(ctx.text( 
        // ATLAS CENTAUR 2 
        // 1 00694U 63047A   24117.46158150  .00002833  00000+0  34479-3 0  9999 
        // 2 00694  30.3592  35.8850 0566900 207.3977 149.5617 14.07317170 35263
    ))
  }),

  rest.post('http://localhost:8080/auth/login', (req, res, ctx) => {
    req.bodyUsed = {
        email: "ihamblin@yahoo.com",
        password: "Password123"
    }
    // ctx.body = {
    //     id: 1,
    //     first_name: "Isaac",
    //     last_name: "Hamblin",
    //     password: "$2b$10$A2A8/l33XrxF0rBcmwVg0uLhTyHdqKTEBWjcMFdGyR4s56DpCr/ju",
    //     email: "ihamblin@yahoo.com"
    // }
    return res(ctx.json( [
        {
            status: "Authenticated", 
            userData: {
                id: 1,
                first_name: "Isaac",
                last_name: "Hamblin",
                password: "$2b$10$A2A8/l33XrxF0rBcmwVg0uLhTyHdqKTEBWjcMFdGyR4s56DpCr/ju",
                email: "ihamblin@yahoo.com"
            }
        }
    ]))
  })
]