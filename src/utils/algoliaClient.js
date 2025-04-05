import { algoliasearch } from "algoliasearch";

const client = algoliasearch("WLRMVTXBPD", "0a50acee2e1d278b2b361c1f4dcff128");
const index = client.initIndex("questions");

export { index };
