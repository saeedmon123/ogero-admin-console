import express from 'express';
import Hierarchy from '../models/hierarchy.model.js';

const router = express.Router();

router.get('/', async (req, res) => res.json(await Hierarchy.find()));
router.post('/', async (req, res) => res.json(await Hierarchy.create(req.body)));
router.put('/:id', async (req, res) => res.json(await Hierarchy.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => res.json(await Hierarchy.findByIdAndDelete(req.params.id)));

export default router;
