import express from "express";
const router = express.Router();
import passport from "passport";

router.get("/google/success", (req, res) => {
 

  if (req.user) {
    return res.status(200).json({
      status: true,
      message: "User logged in successfully",
      token: req.user.token,
      ...req.user.user,
    });
  }
  return res.status(400).json({
    status: false,
    message: "Please login first",
  });
});

router.get("/google/logout", (req, res) => {
  req.logout();
  res.redirect(process.env.FRONTEND_URL);
});

router.get("/google/failed", (req, res) => {
  res.status(401).json({
    status: false,
    message: "Login failed",
  });
});

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.FRONTEND_URL,
    failureRedirect: "/google/failed",
  })
);

export default router;
