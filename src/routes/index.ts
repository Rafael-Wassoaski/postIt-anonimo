import { Router } from "express";
import PostIt from "./postits/Postits";

const router = Router();

router.use("/postit", PostIt);

export default router;

