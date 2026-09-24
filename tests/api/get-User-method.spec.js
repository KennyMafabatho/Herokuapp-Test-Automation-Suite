//Dependencies
const assert = require('assert'); 

const BASE_URL = 'https://reqres.in/api/users/2';

//Send the request once, reused by all test cases
async function getUser() {
  const response = await fetch(BASE_URL);
  const data = await response.json();
  return { status: response.status, data,headers: response.headers }  };


//Test Case 01: Verify response status code
function testStatusCode(status) {
  assert.strictEqual(
    status, 200,
    `Expected status 200, but got: ${status}`
  );
  console.log('Test Case 01 passed: status code is 200.');
}

//Test Case 02: Verify correct user id is returned
function testUserId(data) {
  assert.strictEqual(
    data.data.id, 2,
    `Expected user id 2, but got: ${data.data.id}`
  );
  console.log('Test Case 02 passed: correct user id returned.');
}

//Test Case 03: Verify correct email is returned
function testUserEmail(data) {
  assert.strictEqual(
    data.data.email, 'janet.weaver@reqres.in',
    `Expected email "janet.weaver@reqres.in", but got: "${data.data.email}"`
  );
  console.log('Test Case 03 passed: correct email returned.');
}

//Test Case 04: Verify response Content-Type header
function testContentTypeHeader(headers) {
  const contentType = headers.get('content-type');
  assert.ok(
    contentType !== null && contentType.includes('application/json'),
    `Expected content-type to include "application/json", but got: "${contentType}"`
  );
  
  console.log('Test Case 04 passed: content-type header is application/json.');
}

//Run all test cases
(async function runTests() {
  try {
    const { status, data,headers  } = await getUser();

    console.log('Response status:', status);
    console.log('Response body:', data);
    console.log('');

    testStatusCode(status);
    testUserId(data);
    testUserEmail(data);
    testContentTypeHeader(headers);

    console.log('\n All 4 test cases passed!');

  } catch (error) {
    console.error('\n Test suite failed:', error.message);
  }
}());