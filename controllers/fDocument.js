import fDocument from "../model/fDocument.js";
import { response } from "./common.js";
import { sendEmail } from "./mail.js";

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
      status: 500,
    });
  }
};
const mailOptions = (found) => {
  return {
    from: "do_not_reply@fidelisadvocates.org",
    to: found.owner_email,
    subject: "Numero yuwatoye Ibyangombwa",
    html: `<h3>Murakoze gukoresha E-ranga</h3> 
<p>Ibyangombwa byanyu byatowe na 
${found.founder_first_name} ${found.founder_last_name} Mwamuhamagara kuri iyi numero:
 ${found.found_mobile}</p>
 <i> ugize ikibazo waduhamagara kuri iyi numero: 0788720204/0786449617</i>`,
  };
};
export const viewFounderMobile = async (req, res) => {
  try {
    const { id, owner_mobile, owner_email } = req.body;
    if (owner_email && owner_email && id) {
      const found = await fDocument.findByIdAndUpdate(id, {
        owner_email,
        owner_mobile,
        status: "paid",
      });
      if (found) {
        const mailResponse = await sendEmail(mailOptions(found));
        if (mailResponse.response)
          res.status(200).json({
            error: false,
            message: "founder contact sent via email",
            result: found,
          });
      } else
        res.status(404).json({
          error: true,
          message: "No data found",
          result: [],
        });
    } else validateInput(req, res);
  } catch (error) {
    return response(req, res, {
      error: true,
      message: error.message,
      result: [],
      status: 500,
    });
  }
};

const validateInput = (req, res) => {
  const { id, owner_mobile, owner_email } = req.body;
  if (!id)
    return res.status(500).json({
      error: true,
      message: "Missing required field id.",
    });
  if (!owner_email)
    return res.status(500).json({
      error: true,
      message: "Missing required field email.",
    });
  if (!owner_mobile)
    return res.status(500).json({
      error: true,
      message: "Missing required field mobile number.",
    });
};

export const deleteDoc = async ({ id, data }) => {
  try {
    const doc = await fDocument.findByIdAndDelete({ _id: id });
    return response(req, res, {
      error: false,
      message: "Document closed suuccessfully!",
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
