import mongoose from "mongoose";

const lDocument_schema = new mongoose.Schema({
  owner_first_name: { type: String, required: true },
  owner_last_name: { type: String, required: true },
  doc_name: { type: String, required: true },
  description: { type: String, required: true, maxlength: 500 },
  status: { type: String, default: "submitted" },
  owner_mobile: { type: String, required: true, minlength: 10, maxlength: 10 },
  owner_email: { type: String, required: true },
});

const lDocument = mongoose.model("lost_Document", lDocument_schema);
export default lDocument;
