import { rest } from 'msw';

export const createHandlers = [
rest.post('http://localhost:8080/satellite/new', (req, res, ctx) => {
    req.bodyUsed = {
        name: "",
        orbit: "",
        owner: "",
        tail_number: 0,
        cad_model_files: "",
        images: ""
    }

    return res(ctx.json( [
        {
            message: "Satellite Successfuly Created",
            id: 14
        }
    ]))
  }),

//   rest.get(`http://localhost:8080/satellites`, (req, res, ctx) => {
//     return res(ctx.json( [
//         {
//             id: 1,
//             orbit: "LEO",
//             owner: "AFRL",
//             name: "ASCENT",
//             tail_num: 17245
//         }
//     ]))
//   })
]