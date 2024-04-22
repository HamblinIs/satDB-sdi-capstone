const express = require("express");
const cors = require('cors');
const bcrypt = require("bcrypt");
const api = express();
const port = process.env.PORT || 8080;
const knex = require('knex')(require('./knexfile.js')['development'])

app.use(cors(), express.json())

api.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

const saltRounds = 10;

// GET /satellites
/*
[
    {
        id: 1,
        name: ASCENT,
        tail_num: 54362
    },
    {
        id: 2,
        name: EAGLE,
        tail_num: 45364
    }
]
*/


// GET /satellites/:id

/*
    {
        id: 1,
        name: ASCENT,
        tail_num: 54362,
        owner: AFRL,
        images: ["this_file.png, picture.jpg"],
        cad_models: ["cad_model.nsm", "otherModel.nsm"],
        assessmets: [{id: 1, name: "VisMag of ASCENT", date: "2024-03-12"}]
    }
*/


// GET /assessments
/*
[
    {
        id: 1,
        name: "Assessment Name",
        date: "2024-03-12"
    },
    {
        id: 2,
        name: "Assessment Name 2",
        tail_num: "2024-03-12"
    }
]
*/

// GET /assessments/:id

/*
    {
        id: 1,
        name: ASCENT,
        created_by: [{id: 1, name: "John Doe"}, {id: 2, name: "Emily Smith"}]
        date: "2024-03-12",
        description: "yadda yadda",
        images: ["this_file.png, picture.jpg"],
        sim_files: ["COAST_file.nsm", "otherSimFile.nsm"],
        data_files: ["COAST_file.nsm", "otherSimFile.nsm"],
        misc_files: ["COAST_file.nsm", "otherSimFile.nsm"],
        satellites: [{id: 1, name: "ASCENT", tail_num: 54632"}]
    }
*/

// POST /auth/login
/*
    {
        email: "",
        password: ""
    }
*/
api.post("/auth/login", (req, res) => {
    const {email, password} = req.body;
    knex("user_account").select("*").where({email: email})
    .then((dbRes) => {
        try {
            if (bcrypt.compareSync(password, dbRes[0].password)) {
                res.status(201).json({status: "Authenticated", userData: dbRes[0]})
            } else {
                res.status(400).json({status: "Password did not match"});
            }
        } catch {
            res.status(400).json({status: "Bad Request"});
        }
    })
})

// POST /auth/register
/*
    {
        email: "",
        password: "",
        first_name: "",
        last_name: ""
    }
*/
api.post("/auth/register", (req, res) => {
    try {
        const {first_name, last_name, email, password} = req.body;
        const hash = bcrypt.hashSync(password, saltRounds);

        knex("user_accounts").insert({first_name: first_name, last_name: last_name, email: email, password: hash})
        .then(dbRes => {
            knex("user_accounts").select("*").where({email: email})
            .then(dbRes => res.status(201).json({status: "Authenticated", userData: dbRes[0]}))
        })
        .catch(err => res.status(500))

    } catch (err) {
        console.log(err);
        res.status(400).json({error: err})
    }
})