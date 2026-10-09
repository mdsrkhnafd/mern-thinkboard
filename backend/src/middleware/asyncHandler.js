// Wraps async route handlers so we don't repeat try/catch in every controller.
// Usage: export const myHandler = asyncHandler(async (req, res) => { ... });
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) => {
    if (error.name === "CastError") {
      return res.status(400).json({ message: "Invalid note ID" });
    }
    return res.status(500).json({ message: error.message });
  });
};

export default asyncHandler;
