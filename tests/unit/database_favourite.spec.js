var db = require('../../lib/db');

test('database insert test', () => {
    return db.insertFavourite(1, "abcd").then(data => {
        expect(data.ID).toBeGreaterThan(0)
    });
});

test('database get rows', () => {
    return db.getFavourites('abcd').then(data => {
        expect(data[0]).toHaveProperty('id')
    });
});

test('database check favourite has exist', () => {
    return db.checkFavourite(1,'abcd').then(data => {
        expect(data).toBeTruthy()
    });
});

test('database delete test', () => {
    return db.deleteFavourite(1).then(data => {
        expect(data).toHaveProperty("changes")
    });
});

