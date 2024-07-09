import MeAPI from "./me.api";
import SearchAPI from "./search.api";

class API {
  me;
  search;

  constructor() {
    this.me = new MeAPI();
    this.search = new SearchAPI();
  }
}

const api = new API();

export default api;
