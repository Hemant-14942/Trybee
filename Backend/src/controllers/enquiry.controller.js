import { Resend } from "resend";
import enquiryModel from "../models/enquiry.model.js";

const resend = new Resend(process.env.RESEND_API_KEY);

const addEnquiry = async (req, res) => {
  try {
    const {name,email,query} = req.body;
    const enquiryData = {
      name,
      email,
      query
    };

    const newEnquiry = new enquiryModel(enquiryData);
    await newEnquiry.save();

    res.json({
      success: true,
      message: "Enquiry added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to add Enquiry" });
  }
};

const listEnquiry = async (req, res) => {
  try {
    const enquiries = await enquiryModel.find({});
    res.json({
      success: true,
      enquiries,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const sendQueryEmail = async (req,res) =>{
  const { name, email, message } = req.body;

  try {
    const data = await resend.emails.send({
      from: "noreply@resend.dev",
      to: "contact@giftnation.in",
      subject: `Contact Form Message from ${name}`,
      reply_to: email,
      html: `
        <p>Hello i am ${name ?? "user"} & my email id is : ${email}</p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error("Email failed", error);
    res.status(500).json({ success: false, error });
  }
}

export { addEnquiry, listEnquiry,sendQueryEmail };
