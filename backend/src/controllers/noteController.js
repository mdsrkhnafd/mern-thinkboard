import Note from "../models/Note.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(notes);
});

export const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  if (!title?.trim() || !content?.trim()) {
    return res.status(400).json({ message: "Please add a title and content" });
  }

  const note = await Note.create({
    title: title.trim(),
    content: content.trim(),
    user: req.user._id,
  });
  res.status(201).json(note);
});

export const updateNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  const updates = {};
  if (title !== undefined) updates.title = title.trim();
  if (content !== undefined) updates.content = content.trim();

  const updatedNote = await Note.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    updates,
    { new: true, runValidators: true },
  );

  if (!updatedNote) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.status(200).json(updatedNote);
});

export const deleteNote = asyncHandler(async (req, res) => {
  const deletedNote = await Note.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });

  if (!deletedNote) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.status(200).json({ id: req.params.id, message: "Note deleted" });
});

export const getNoteById = asyncHandler(async (req, res) => {
  const note = await Note.findOne({ _id: req.params.id, user: req.user._id });

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.status(200).json(note);
});
