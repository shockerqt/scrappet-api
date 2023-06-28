import { before, describe, it, skip, test, todo } from 'node:test';
import isPromise from 'node:util';
import assert from 'node:assert';
import build from './app';

// const test = async () => {
//   const app = await build();

//   console.log(app);
//   void describe('Basic app setup', () => {
//     it('App instanceof fastify', () => {
//       console.log(app);
//     });

//     it('Test route', async () => {
//       app.get('/', () => ({ hello: 'world' }));

//       const response = await app.inject({
//         method: 'GET',
//         url: '/',
//       });

//       assert.ok(response.statusCode === 200);
//       assert.ok(response.body.hello === 'world');
//     });
//   });


//   void describe('');

// };

// void test();

// assert(typeof test() === typeof Promise);
const testOnly = test({ only: true });
const testOnlyShorthand = test.only();

const testSkip = test({ skip: true });
const testSkipShorthand = test.skip();

const testTodo = test({ todo: true });
const testTodoShorthand = test.todo();

console.log(test, test.todo);
