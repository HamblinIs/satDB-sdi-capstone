const express = require("express");
const cors = require('cors');
const bcrypt = require("bcrypt");
const api = express();
const port = process.env.PORT || 8080;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || "development"])

api.use(cors(), express.json())

api.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

const saltRounds = 10;


api.get('/', (req, res) => {
    res.send('testing');
  })

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
api.get('/satellites', (req, res) => {
    let { name } = req.query;
    if (name != undefined) {
        // console.log(name);
        knex('satellite').select('id', 'name', 'orbit', 'owner', 'tail_num')
        .whereILike('name', `%${name}%`)
        .orderBy('tail_num', 'desc')
        .then( data => res.status(200).json(data))
        .catch(err => res.status(404).send(err));
    } else {
        knex('satellite').select('id', 'name', 'tail_num')
        .then( data => res.status(200).json(data))
        .catch(err => res.status(404).send(err));
    }

})

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
api.get('/satellites/:id', async (req, res) => {
    let cad_models = await knex.raw('SELECT cad_model.file_path_name FROM cad_model, cad_model_to_satellite, satellite WHERE satellite.id = cad_model_to_satellite.satellite_id AND cad_model_to_satellite.cad_model_id = cad_model.id;');
    let images = await knex.raw("SELECT image.file_path_name FROM image, image_to_satellite, satellite WHERE satellite.id = image_to_satellite.satellite_id AND image_to_satellite.image_id = image.id;");
    let assessments = await knex.raw("SELECT assessment.id, assessment.name, assessment.creation_date FROM assessment, satellite_to_assessment, satellite WHERE satellite.id = satellite_to_assessment.satellite_id AND satellite_to_assessment.assessment_id = assessment.id;");
    let satellites = await knex("satellite").select('*').where({id: req.params.id});
    let satellite = satellites[0];
    satellite.images = images["rows"];
    satellite.cad_models = cad_models["rows"];
    satellite.assessments = assessments["rows"];
    res.status(200).json(satellite);
})



// PATCH one satellite into a bunch of tables
api.patch('/satellites/:id', async (req, res) => {
    const { id } = req.params;
    const { orbit, owner, name, tail_num, assessments, cad_models, images } = req.body;

    let image_ids_to_delete = await knex.raw(`SELECT distinct image_to_satellite.image_id FROM image_to_satellite, image WHERE image_to_satellite.satellite_id = ${id};`);
    let image_id_array = image_ids_to_delete["rows"].map(image => image.image_id);
    await knex("image_to_satellite").where({satellite_id: id}).del()
    await knex("image").whereIn('id', image_id_array).del()
    let image_ids_added = await knex("image").insert(images.map(image => ({"file_path_name":image.file_path_name}))).returning('id'); // [ {id: 1}, {id: 2}, {id: 3}]
    await knex("image_to_satellite").insert(image_ids_added.map(image => ({"image_id": image.id, "satellite_id": id})));

    let cad_model_ids_to_delete = await knex.raw(`select distinct cad_model_to_satellite.cad_model_id FROM cad_model_to_satellite, cad_model WHERE cad_model_to_satellite.satellite_id = ${id};`);
    let cad_model_id_array = cad_model_ids_to_delete["rows"].map(cad_model => cad_model.cad_model_id);
    await knex("cad_model_to_satellite").where({satellite_id: id}).del()
    await knex("cad_model").whereIn('id', cad_model_id_array).del()
    let cad_model_ids_added = await knex("cad_model").insert(cad_models.map(cad_model => ({file_path_name: cad_model.file_path_name}))).returning('id'); // [ {id: 1}, {id: 2}, {id: 3}]
    await knex("cad_model_to_satellite").insert(cad_model_ids_added.map(cad_model => ({cad_model_id: cad_model.id, satellite_id: id})));

    await knex("satellite_to_assessment").where({satellite_id: id}).del();
    await knex("satellite_to_assessment").insert(assessments.map(assessment => ({satellite_id: id, assessment_id: assessment.id})));

    await knex('satellite')
        .where({id: id})
        .update({ orbit, owner, name, tail_num })
        .then((count) => {
            if (count > 0) {
                res.status(200).json({ message: `Satellite Id ${id} updated successfully!` });
            } else {
                res.status(404).json({ message: `Satellite Id ${id} not found.` });
            }
        });
});


//TODO:
// PATCH one assessment into assessment table
api.patch('/assessments/:id', (req, res) => {
    const { id } = req.params;

    const { name, satellites, creation_date, description, owner, data_files, sim_files, misc_files } = req.body;

    knex('assessment')
        .where({id: id})
        .update({ name, description, creation_date })
        .then((count) => {
            if (count > 0) {
                res.status(200).json({ message: `Assessment Id ${id} updated successfully!` });
            } else {
                res.status(404).json({ message: `Assessment Id ${id} not found.` });
            }
        });

});


// GET /assessments
api.get('/assessments', (req, res) => {
    let { name } = req.query;
    let {creation_date} = req.query;
    if (name != undefined) {
        // console.log(name);
        knex('assessment').select('id', 'name', 'description', 'creation_date')
        .whereILike('name', `%${name}%`)
        .orderBy('creation_date', 'desc')
        .orderBy('name', 'asc')
        //.orderBy([{ column: 'email' }, { column: 'age', order: 'desc' }]);
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).send(err));
    } else {
        knex('assessment').select('id', 'name', 'creation_date')
        .then(data => res.status(200).json(data))
        .catch(err => res.status(404).send(err));
    }

})
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
api.get('/assessments/:id', async (req, res) => {

       let user_accounts = await knex.raw('SELECT user_accounts.first_name, user_accounts.last_name FROM user_accounts, assessment_to_user_account, assessment WHERE user_accounts.id = assessment_to_user_account.user_account_id AND assessment.id = assessment_to_user_account.assessment_id');
       let sim_files = await knex.raw('SELECT sim_file.file_path_name FROM sim_file, sim_file_to_assessment, assessment WHERE assessment.id = sim_file_to_assessment.assessment_id AND sim_file_to_assessment.sim_file_id = sim_file.id;');
       let images = await knex.raw("SELECT image.file_path_name FROM image, image_to_assessment, assessment WHERE assessment.id = image_to_assessment.assessment_id AND image_to_assessment.image_id = image.id;");
       let data_files = await knex.raw('SELECT data_file.file_path_name FROM data_file, data_file_to_assessment, assessment WHERE assessment.id = data_file_to_assessment.assessment_id AND data_file_to_assessment.data_file_id = data_file.id;');
       let misc_files = await knex.raw('SELECT misc_file.file_path_name FROM misc_file, misc_file_to_assessment, assessment WHERE assessment.id = misc_file_to_assessment.assessment_id AND misc_file_to_assessment.misc_file_id = misc_file.id;');
       let assessments = await knex("assessment").select('name', 'description', 'creation_date').where({id: req.params.id});
       let assessment = assessments[0];
       assessment.satellites = await knex("satellite").select('id', 'name', 'tail_num').where({id: req.params.id});
       assessment.images = images["rows"];
       assessment.data_files = data_files["rows"];
       assessment.misc_files = misc_files["rows"];
       assessment.sim_files = sim_files["rows"];
       assessment.user_accounts = user_accounts["rows"];
    //    assessment.assessments = assessments["rows"];
       res.status(200).json(assessment)
    })
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
    knex("user_accounts").select("*").where({email: email})
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

// POST /satellites
/*
{
    name: "FOO",

}
*/
api.post('/satellite/new', async (req, res) => {
    // const {name, orbit, owner, tailNumber} = req.body;
    try {
        const { name, tail_number, owner, orbit, images, cad_model_files } = req.body;

      const satelliteId = await knex('satellite').insert({name: name, tail_num: tail_number, owner: owner, orbit: orbit}).returning('id');

        if (cad_model_files && cad_model_files.length > 0) {
            const cad_model_file_ids = await knex('cad_model').insert(cad_model_files).returning('id');
            await knex('cad_model_to_satellite').insert(cad_model_file_ids.map(cad_model_file_id => ({cad_model_file_id: cad_model_file_id.id, satellite_id: satelliteId[0].id})))
        }

        if (images && images.length > 0) {
            const image_ids = await knex('image').insert(images).returning('id');
            await knex('image_to_satellite').insert(image_ids.map(image_id => ({image_id: image_id.id, satellite_id: satelliteId[0].id})))
        }

        res.status(201).send({ message: `Satellite Successfuly Created`, id: satelliteId[0].id});

    } catch (error) {
      res.status(500).send(`Unable to add satellite ${error}.`);
    }
});

api.post('/assessment/new', async (req, res) => {
    try {
        const { name, creation_date, description, sim_files, misc_files, images, data_files } = req.body;

      const assessmentId = await knex('assessment').insert({name: name, creation_date: creation_date, description: description}).returning('id');

        if (sim_files && sim_files.length > 0) {
            const sim_file_ids = await knex('sim_file').insert(sim_files).returning('id');
            await knex('sim_file_to_assessment').insert(sim_file_ids.map(sim_file_id => ({sim_file_id: sim_file_id.id, assessment_id: assessmentId[0].id})))
        }

        if (misc_files && misc_files.length > 0) {
            const misc_file_ids = await knex('misc_file').insert(misc_files).returning('id');
            await knex('misc_file_to_assessment').insert(misc_file_ids.map(misc_file_id => ({misc_file_id: misc_file_id.id, assessment_id: assessmentId[0].id})))
        }

        if (data_files && data_files.length > 0) {
            const data_file_ids = await knex('data_file').insert(data_files).returning('id');
            await knex('data_file_to_assessment').insert(data_file_ids.map(data_file_id => ({data_file_id: data_file_id.id, assessment_id: assessmentId[0].id})))
        }

        if (images && images.length > 0) {
            const image_ids = await knex('image').insert(images).returning('id');
            await knex('image_to_assessment').insert(image_ids.map(image_id => ({image_id: image_id.id, assessment_id: assessmentId[0].id})))
        }

        res.status(201).send({message: `Assessment Successfuly Created`, id: assessmentId[0].id});

    } catch (error) {
      res.status(500).send(`Unable to add assessment ${error}.`);
    }
});