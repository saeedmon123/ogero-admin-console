import express from 'express';
import User from '../models/user.model.js';

const router = express.Router();

router.get('/', async (req, res) => res.json(await User.find()));
router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
});
router.put('/:id', async (req, res) => res.json(await User.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => res.json(await User.findByIdAndDelete(req.params.id)));

export default router;
