import fDocument from "../model/fDocument";
import { response } from "./common";

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
export const createDoc = async (data) => {
    try {
        const doc = await fDocument.create(data);
        return response(req, res, {
            error: false,
            message: "Document created!",
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
