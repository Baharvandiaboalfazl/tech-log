import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema({
  rowsIndex: {
    type: Number,
    default: 10,
  },
  commentsEnabled: {
    type: Boolean,
    default: true,
  },
});

const Settings = mongoose.model("Settings", settingsSchema);
export default Settings;
