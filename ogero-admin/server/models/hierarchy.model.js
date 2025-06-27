import mongoose from 'mongoose';

const HierarchySchema = new mongoose.Schema({
  title: { type: String, required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Hierarchy', default: null },
}, { timestamps: true });

const Hierarchy = mongoose.model("Hierarchy", HierarchySchema);
export default Hierarchy;
