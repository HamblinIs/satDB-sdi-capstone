import { rest } from 'msw';

let searchTerm = "asc"

export const handlers = [
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
  )})
]