import express from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getNoteById,
} from "../controllers/noteController.js";

const router = express.Router();

router.route("/").get(getNotes).post(createNote);

router.route("/:id").put(updateNote).delete(deleteNote).get(getNoteById);

export default router;
