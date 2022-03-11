import { Router } from "express";
import { createPostIt, getPostIts } from "../../controllers/PostItController";

const router = Router();

router.get('/', getPostIts);
router.post('/', createPostIt);

export default router;