const request = require('supertest')
const api = require('./api')

describe('GET /', () => {
    test('should return the default message', (done) => {
        request(api)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                done()
            })
    })
}),

describe('GET /satellites', () => {
    test('should return a list of satellites', (done) => {
        request(api)
            .get('/satellites')
            .expect(200)
            .expect((res) => {
                expect(res.name).toBe("ASCENT")
            })
            .end((err, res) => {
                if (err) throw err;
                done()
            })
    })
})

describe('POST /satellite/new', () => {
    test('should post a new satellite to list', (done) => {
        request(api)
            .post('/satellites/new')
            .send({ name, tail_number, owner, orbit, images, cad_model_files })
            .set('Accept', 'application/json')
            .expect(201)
            .expect((res) => {
                expect(res.body).toBe("Satellite Successfuly Created, id: 11")
            })
            .end((err, res) => {
                if (err) throw err;
                done()
            })
})
})