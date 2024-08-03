import { Request, Response } from "express";
import { User } from "../models";
import { userService } from "../services/userService";
import { error } from "console";
import { jwtService } from "../services/jwtService";

export const authController = {
  register: async (req: Request, res: Response) => {
    const { firstName, lastName, phone, birth, email, password } = req.body;

    try {
      const userAlreadyExists = await userService.findByEmail(email);
      if (userAlreadyExists) {
        throw Error("user already exists.");
      }

      const user = await userService.create({
        firstName,
        lastName,
        phone,
        birth,
        email,
        password,
        role: "user",
      });

      return res.status(201).json({ user });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      const user = await userService.findByEmail(email);

      if (!user) {
        throw Error("email not exists.");
      }

      user.checkPassword(password, (err, isSame) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }

        if (!isSame) {
          return res.status(401).json({ message: "Password incorrect" });
        }

        const payload = {
          id: user.id,
          firstName: user.firstName,
          email: user.email,
        };

        const token = jwtService.signToken(payload, "7d");

        return res.json({ authenticate: true, ...payload, token });
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ message: err.message });
      }
    }
  },
};
