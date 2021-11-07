import SeedList from '../expense-categories';
import SeedItem from '../expense-category';
import { render } from '../../../../../utils/test-util';
import { setupServer } from 'msw/node';
import { rest } from 'msw';

const server = setupServer();
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Render empty message if seed list is empty', () => {});
