import { Router } from "express";
import {
  CreateAnIssue,
  deleteAnIssue,
  getAllIssues,
  getAnIssue,
  updateAnIssue,
} from "../Controllers/issues.js";

const router = Router();

router.post("/", CreateAnIssue);
router.get("/", getAllIssues);
router.get("/:id", getAnIssue);
router.patch("/:id", updateAnIssue);
router.delete("/:id", deleteAnIssue);

export default router;
