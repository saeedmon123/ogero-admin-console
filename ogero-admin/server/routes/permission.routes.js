import express from 'express';
import Permission from '../models/permission.model.js';

const router = express.Router();

router.get('/', async (req, res) => res.json(await Permission.find()));
router.post('/', async (req, res) => res.json(await Permission.create(req.body)));
router.put('/:id', async (req, res) => res.json(await Permission.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => res.json(await Permission.findByIdAndDelete(req.params.id)));

export default router;
