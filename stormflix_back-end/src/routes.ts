import express from "express";
import { categoriesController } from "./controllers/categoriesController";
import { courseController } from "./controllers/courseController";
import { authController } from "./controllers/authController";
import { ensureAuth, ensureAuthViaQuery } from "./middlewares/auth";
import { episodeController } from "./controllers/episodeController";
import { favoritesController } from "./controllers/favoritesController";
import { likeController } from "./controllers/likeController";
import { usersController } from "./controllers/usersController";

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);

router.get("/categories", ensureAuth, categoriesController.index);
router.get("/categories/:id", ensureAuth, categoriesController.show);

router.get("/courses/featured", ensureAuth, courseController.featured);
router.get("/courses/popular", ensureAuth, courseController.popular);
router.get("/courses/newest", courseController.newest);
router.get("/courses/search", ensureAuth, courseController.search);
router.get("/courses/:id", ensureAuth, courseController.show);

router.get("/episodes/stream", ensureAuthViaQuery, episodeController.stream);

router.get(
  "/episodes/:id/watchTime",
  ensureAuth,
  episodeController.getWatchTime
);
router.post(
  "/episodes/:id/watchTime",
  ensureAuth,
  episodeController.setWatchTime
);

router.post("/favorites", ensureAuth, favoritesController.save);
router.get("/favorites", ensureAuth, favoritesController.index);
router.delete("/favorites/:id", ensureAuth, favoritesController.delete);

router.post("/likes", ensureAuth, likeController.save);
router.delete("/likes/:id", ensureAuth, likeController.delete);

router.get("/users/current", ensureAuth, usersController.show);
router.get("/users/current/watching", ensureAuth, usersController.watching);
router.put("/users/current", ensureAuth, usersController.update);
router.put(
  "/users/current/password",
  ensureAuth,
  usersController.updatePassword
);

export { router };
