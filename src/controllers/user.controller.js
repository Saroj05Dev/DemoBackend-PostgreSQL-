import { userService } from "../services/user.service.js";
import { z } from "zod";

// Validation schemas
const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
});

export const userController = {
  async register(req, res) {
    try {
      const validatedData = registerSchema.parse(req.body);
      const result = await userService.register(validatedData);
      
      res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: result,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },

  async login(req, res) {
    try {
      const validatedData = loginSchema.parse(req.body);
      const result = await userService.login(validatedData);
      
      res.json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          message: "Validation error",
          errors: error.errors,
        });
      }
      
      res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  },

  async getProfile(req, res) {
    try {
      const { id } = req.params;
      const user = await userService.getProfile(parseInt(id));
      
      res.json({
        success: true,
        data: user,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  },
};