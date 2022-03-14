import { Router } from "express";
import { createPostIt, getPostIts, countPostIts } from "../../controllers/PostItController";

const router = Router();

router.get('/', getPostIts);
router.get('/next-number', countPostIts);
router.post('/', createPostIt);

export default router;