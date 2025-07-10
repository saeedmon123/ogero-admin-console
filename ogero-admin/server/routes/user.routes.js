import express from 'express';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

router.get('/', async (req, res) => res.json(await User.find()));
router.post('/', async (req, res) => {
  try {
    const { name, email, password, role, dateOfBirth } = req.body;
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
     const hashedPassword = await bcrypt.hash(password, 10);

     const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      dateOfBirth,
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});
router.put('/:id', async (req, res) => res.json(await User.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => res.json(await User.findByIdAndDelete(req.params.id)));

export default router;
