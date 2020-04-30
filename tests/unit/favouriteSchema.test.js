const should = require('should');
const Favourite = require('../../routes/V1/models/favourite');


describe('favouriteModelTests', () => {
  const testFavourite = {};
  const props = ['id', 'user_id'];

  before(() => {
    testFavourite.id = 1234;
    testFavourite.user_id = 1;
    testFavourite.popularity = 501.23;
    testFavourite.vote_count = 2023;
    testFavourite.video = false;
    testFavourite.poster_path = '/xJUILftRf6TJxloOarilOTJfeOn.jpg';
    testFavourite.adult = false;
    testFavourite.backdrop_path = '/5BwqwxMEjeFtdknRV792Svao0K1v.jpg';
    testFavourite.original_language = 'aen';
    testFavourite.original_title = 'Ad Astra';
    testFavourite.genre_ids = [2, 12];
    testFavourite.title = 'Ad Astra';
    testFavourite.vote_average = 6;
    testFavourite.overview = 'Some random text';
    testFavourite.release_date = '2019-09-17';
  });

  it('should validate a favourite with a id and user_id', (done) => {
    const m = new Favourite(testFavourite);
    m.validate((err) => {
      should.not.exist(err);
      should(m.id).equal(testFavourite.id);
      should(m.user_id).equal(testFavourite.user_id);
      done();
    });
  });

  it('should not validate a user with no id and user_id', (done) => {
    const m = new Favourite({});
    m.validate((err) => {
      should.exist(err);
      should(err.errors).have.property('id');
      should(err.errors).have.property('user_id');
      done();
    });
  });

  props.forEach((prop) => {
    it(`should not validate a user with no ${prop}`, (done) => {
      delete testFavourite[prop];
      const m = new Favourite(testFavourite);
      m.validate((err) => {
        should.exist(err);
        should(err.errors).have.property(prop);
        done();
      });
    });
  });
});
