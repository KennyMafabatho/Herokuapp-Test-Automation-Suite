//dependecies
const assert = require('assert');

const BASE_URL = 'https://reqres.in/api/users';

const REQUEST_BODY = { name: 'John Doe', job: 'QA Engineer' };

//Send the request once, reused by all 4 test cases
async function createUser() {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(REQUEST_BODY)
  });
  const data = await response.json();
  return { status: response.status, data };
}

//Create a user with valid name and job
function createUserTest(status) {
  assert.strictEqual(
    status, 201,
    `Expected status 201 (user created), but got: ${status}`
  );
   console.log('Test Case 01 passed: user created successfully (status 201)');
}

//Verify response includes a generated id
function generatedIdTest(data) {
  assert.ok(
    data.id !== undefined && data.id !== '',
    'Expected response to contain a non-empty id'
  );
    console.log('Test Case 02 passed: response includes a generated id.');
}

//Verify response includes a createdAt field
function createdAtExistsTest(data) {
  assert.ok(
    data.createdAt !== undefined,
    'Expected response to include a createdAt field'
  );
   console.log('Test Case 03 passed: response includes a createdAt field.');
}

//Verify response includes both name and job fields
function testNameAndJobExist(data) {
  assert.ok(
    data.name !== undefined,
    'Expected response to include a name field'
  );
  assert.ok(
    data.job !== undefined,
    'Expected response to include a job field'
  );

  console.log('TC04 passed: response includes both name and job fields.');
}

//Run all test cases 
(async function runTests() {
  try {
    const { status, data } = await createUser();

    console.log('Request body:', REQUEST_BODY);
    console.log('Response status:', status);
    console.log('Response body:', data);
    console.log('');

    createUserTest(status);
    generatedIdTest(data);
    createdAtExistsTest(data);
    testNameAndJobExist(data);

    console.log('\n All 4 test cases passed!');

  } catch (error) {
    console.error('\n Test suite failed:', error.message);
  }
}());


