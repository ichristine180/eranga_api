import fDocument from "../model/fDocument.js";
import { response } from "./common.js";

/* this function will be used to get submitted doc,published doc*/
export const findByStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const doc = await fDocument.find({ status });
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

export const getAllDocument = async (req, res) => {
  try {
    const doc = await fDocument.findAll();
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
export const updateDoc = async ({ id, data }) => {
  try {
    const doc = await fDocument.findByIdAndUpdate({ _id: id }, data);
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
export const createDoc = async (req, res) => {
  const {
    doc_image,
    founder_first_name,
    founder_last_name,
    found_mobile,
    description,
    owner_first_name,
    owner_last_name,
  } = req.body;
  try {
    const doc = await fDocument.create({
      doc_image,
      founder_first_name,
      founder_last_name,
      found_mobile,
      description,
      owner_first_name,
      owner_last_name,
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
      status: 500,
    });
  }
};

export const viewFounderMobile = async (req, res) => {
  try {
    const { id, owner_first_name, owner_last_name, owner_mobile, owner_email } =
      req.body;
    const found = await fDocument.findByIdAndUpdate(id, {
      owner_email,
      owner_first_name,
      owner_last_name,
      owner_mobile,
      status: "paid",
    });
    res.status(200).json({
      error: false,
      message: "",
      result: found,
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
