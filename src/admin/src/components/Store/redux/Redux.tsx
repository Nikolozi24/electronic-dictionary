import { createStore } from "redux";

import reducer from "./Reducer.tsx";

const store = createStore(reducer)

export default store