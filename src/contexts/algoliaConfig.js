import { liteClient } from 'algoliasearch/lite';

const ALGOLIA_APP_ID = '8MRLOZ7A26';
const ALGOLIA_SEARCH_API_KEY = '489c1269a1685a0990ecf6569113b29c';

const searchClient = liteClient(ALGOLIA_APP_ID, ALGOLIA_SEARCH_API_KEY);

export default searchClient;
