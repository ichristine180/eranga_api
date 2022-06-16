import mongoose from "mongoose";

const fDocument_schema = new mongoose.Schema({
  at_created: { type: Date },
  doc_image: { data: Buffer, contentType: String },
  owner_first_name: { type: String, required: true },
  owner_last_name: { type: String, required: true },
  owner_mobile: { type: String, minlength: 10, maxlength: 10 },
  owner_email: { type: String },
  founder_first_name: { type: String, required: true },
  founder_last_name: { type: String, required: true },
  found_mobile: { type: String, required: true, minlength: 10, maxlength: 10 },
  description: { type: String, required: true, maxlength: 500 },
  status: { type: String, default: "submitted" },
  lost_Document: { type: mongoose.Schema.Types.ObjectId, ref: "lost_Document" },
});

const fDocument = mongoose.model("found_Document", fDocument_schema);
export default fDocument;
