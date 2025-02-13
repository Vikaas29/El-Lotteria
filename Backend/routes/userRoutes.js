
import { changeandcheck, saveSet } from "../controllers/userController.js";

// routes for all user related data
export function userRoutes(app){

    app.post("/saveset",saveSet);
    
    app.put("/changeandcheck",changeandcheck);

}