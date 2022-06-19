import lDocument from "../model/lDocument.js";
import { response } from "./common.js";

/* this function will be used to get submitted doc,published doc*/
export const getPublishedDoc = async (req, res) => {
  try {
    const doc = await lDocument.find({ status:"published" });
    return response(req, res, {
      error: false,
      message: "",
      result: doc,
      status: 200,
    });
  } catch (error) {
    return response(req, res, {
      error: true,
      message: error.message,
      result: [],
      status: 500,
    });
  }
};

export const getAllLostDoc = async (req, res) => {
  try {
    const doc = await lDocument.find();
    return response(req, res, {
      error: false,
      message: "",
      result: doc,
      status: 200,
    });
  } catch (error) {
    return res.status(500).json({
      error: true,
      message: error.message,
      result: [],
    });
  }
};
export const updateLostDoc = async (req, res) => {
  try {
    const { id, data } = req.body;
    const doc = await lDocument.findByIdAndUpdate({ _id: id }, data);
    return response(req, res, {
      error: false,
      message: "Document updated!",
      result: doc,
      status: 200,
    });
  } catch (error) {
    return response(req, res, {
      error: false,
      message: error.message,
      result: [],
      status: 500,
    });
  }
};
export const saveLostDoc = async (req, res) => {
  const {
    doc_name,
    description,
    owner_first_name,
    owner_last_name,
    owner_mobile,
    owner_email,
  } = req.body;
  try {
    const doc = await lDocument.create({
      at_created: new Date(),
      doc_name,
      owner_first_name,
      owner_last_name,
      owner_mobile,
      description,
      owner_email,
      status: "submitted",
    });
    return response(req, res, {
      error: false,
      message: "Document created!",
      result: doc,
      status: 200,
    });
  } catch (error) {
    return response(req, res, {
      error: true,
      message: error.message,
      result: [],
      status: 200,
    });
  }
};


export const deleteLostDoc = async (req, res) => {
  try {
    const { id } = req.body;
    const doc = await lDocument.findByIdAndDelete({ _id: id });
    return response(req, res, {
      error: false,
      message: "Document Rejected suuccessfully!",
      result: doc,
      status: 200,
    });
  } catch (error) {
    return response(req, res, {
      error: false,
      message: error.message,
      result: [],
      status: 200,
    });
  }
};
