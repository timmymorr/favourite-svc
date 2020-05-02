const supertest = require('supertest');
const should = require('should');
const jwt = require('jsonwebtoken');
const app = require('../../server');

const id = 1234;
const userId = 1;

const payload = { user: 'timmymorr@gmail.com' };
const secret = 'timmysdevelopmentjwtsecret';
const options = { expiresIn: '2d', issuer: 'https://timmymorr.io' };

const token = jwt.sign(payload, secret, options);

describe('Users API test', function () {
  this.timeout(120000);

  it('should add a favourite', (done) => {
    const newFavourite = {
      id: 1234,
      user_id: 1,
      popularity: 501.23,
      vote_count: 2023,
      video: false,
      poster_path: '/xJUILftRf6TJxloOarilOTJfeOn.jpg',
      adult: false,
      backdrop_path: '/5BwqwxMEjeFtdknRV792Svao0K1v.jpg',
      original_language: 'aen',
      original_title: 'Ad Astra',
      genre_ids: [2, 12],
      title: 'Ad Astra',
      vote_average: 6,
      overview: 'Some random text',
      release_date: '2019-09-17',
    };

    supertest(app)
      .post('/api/v1/favourites')
      .set('Authorization', `Bearer: ${token}`)
      .send(newFavourite)
      .expect('Content-type', /json/)
      .expect(201) // This is the HTTP response
      .then((res) => {
        console.log(res);
        res.should.have.property('status').equal(201);
        done();
      })
      .catch((err) => done(err));
  });

  // it('should update a user', (done) => {
  //   const user = {
  //     email: 'jbloggs@mail.ie',
  //     password: 'password1',
  //   };

  //   supertest(app)
  //     .post('/api/v1/user')
  //     .send(user)
  //     .expect('Content-type', /json/)
  //     .expect(200) // This is the HTTP response
  //     .then((res) => {
  //       res.should.have.property('status').equal(200);
  //       should.exist(res.body.token);
  //       id = res.body.id;
  //       token = `Bearer: ${res.body.token}`;
  //       done();
  //     })
  //     .catch((err) => done(err));
  // });

  it('should not get a favourite by ID without a token', (done) => {
    supertest(app)
      .get(`/api/v1/favourite/${userId}/${id}`)
      .expect('Content-type', /json/)
      .expect(401) // This is the HTTP response
      .then((res) => {
        res.should.have.property('status').equal(401);
        done();
      })
      .catch((err) => done(err));
  });

  // it('should get a user by ID', (done) => {
  //   supertest(app)
  //     .get(`/api/v1/favourite/${userId}/${id}`)
  //     .set('Authorization', `Bearer: ${token}`)
  //     .expect('Content-type', /json/)
  //     .expect(200) // This is the HTTP response
  //     .then((res) => {
  //       res.should.have.property('status').equal(200);
  //       done();
  //     })
  //     .catch((err) => done(err));
  // });

  // it('should get al users', (done) => {
  //   supertest(app)
  //     .get('/api/v1/users')
  //     .set('Authorization', token)
  //     .expect('Content-type', /json/)
  //     .expect(200) // This is the HTTP response
  //     .then((res) => {
  //       res.should.have.property('status').equal(200);
  //       done();
  //     })
  //     .catch((err) => done(err));
  // });

  // it('should delete a user by ID', (done) => {
  //   supertest(app)
  //     .delete(`/api/v1/user/${id}`)
  //     .set('Authorization', token)
  //     .expect('Content-type', /json/)
  //     .expect(200) // This is the HTTP response
  //     .then((res) => {
  //       res.should.have.property('status').equal(200);
  //       done();
  //     })
  //     .catch((err) => done(err));
  // });
});
