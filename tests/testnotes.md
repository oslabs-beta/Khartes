Oh hi Mark (do you get that a lot?) yes hahaha
  
1/6/2023
    Done today:
    - started boiler plating
    - scripts: added jesttest as a script in package.json
        "test" was already taken
    - made test folder (you're in it) and this notes file
    - installed jest as dev dependency
    - made one boilerplate test

    Questions
    - issues with jest and typescript?
    - come up with the tests we need for front and back

1/13
    - don't see the script created -- wondering if it was included in the commit?

what I have done:
- installed @types/jest to get types for testing functions. 
- installed ts-jest created jest.config.js to config jest for TS and somehow it fixed es module issue as well..

notes:
- jest cannot use es modules out of the box (import/export) we need to configure it to do so
- to my understanding jest does not support TS out of the box either.  Can be configured to do so but there is a key fork in the road. Do we want to type check tests (use ts-jest)? Or not (use babel to transpile)?
- additionally, jest is only a test runner, we will also need react testing library to actually create the tests for our React components. could use enzyme but RTL is the new standard/common practice
- may still need to alter the jest.config.js to support jsdom as testenvironment instead of node
- still need to install RTL 