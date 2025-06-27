import express from 'express';
import Role from '../models/role.model.js';

const router = express.Router();

router.get('/', async (req, res) => res.json(await Role.find()));
router.post('/', async (req, res) => res.json(await Role.create(req.body)));
router.put('/:id', async (req, res) => res.json(await Role.findByIdAndUpdate(req.params.id, req.body, { new: true })));
router.delete('/:id', async (req, res) => res.json(await Role.findByIdAndDelete(req.params.id)));

export default router;
