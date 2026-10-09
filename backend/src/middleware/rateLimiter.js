import ratelimit from "../config/upstash.js";

const ratelimiter = async (req, res, next) => {
  try {
    const identifier = req.ip; // "my-limit-key"  or userId b add kr skty hai
    const { success } = await ratelimit.limit(identifier);

    if (!success) {
      return res.status(429).json({
        // <-- "return" yahan hona ZAROORI hai
        message: "Too many requests! Try again after some time.",
        success: false,
      });
    }

    next();
  } catch (error) {
    console.log("Error in rate limiting:", error);
    next(error);
  }
};

export default ratelimiter;
