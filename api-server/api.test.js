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
            .expect(200, {name: "ASCENT"})
            .end((err, res) => {
                if (err) throw err;
                done()
            })
    })
})