import { rest } from 'msw';

export const handlers = [
rest.get(`http://localhost:8080/satellites?name=asc`, (req, res, ctx) => {
    return res(ctx.json(  [
        {
            "id": 1,
            "name": "ASCENT",
            "orbit": "LEO",
            "owner": "AFRL",
            "tail_num": 17245
        }
    ])
  )})
]