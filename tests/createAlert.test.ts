// import createAlert from '../server/Controllers/createAlert.ts'
const createAlert = require('..server/Controllers/createAlert.ts')

/*
 will we create a test file for each contorller?
 Our project is broken up into MANY files, 
might be nice to import and do unit testing
 in our larger jest file?

*/

describe("Create alert tests", () => {
    test('what should this test do?', () => {
      expect(createAlert()).toBe();
    });
   })