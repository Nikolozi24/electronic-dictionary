import { configureStore } from "@reduxjs/toolkit";

import { AuthSlice } from "./authSlice.tsx";
import { thematicSlice } from "./thematicSlice.tsx";



const store = configureStore({
    reducer:{auth: AuthSlice.reducer , thematic: thematicSlice.reducer}
})

export default store