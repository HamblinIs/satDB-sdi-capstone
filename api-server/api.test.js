const request = require('supertest')
const api = require('./api')

describe('GET /', () => {
    it('should return the default message', (done) => {
        request(api)
            .get('/')
            .expect(200)
            .end((err, res) => {
                if (err) throw err;
                done()
            })
    })
})