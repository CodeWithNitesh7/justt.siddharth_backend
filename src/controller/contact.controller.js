const { sendmail } = require("../config/sendMail");
const Contact = require("../model/contact.model");

exports.submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email and message are required",
      });
    }
    
    const newContact = await Contact.create({
      name,
      email,
      subject:"Contacts via Codexnitesh",
      message,
    });
    await sendmail('Contact via Codexnitesh',
      `Name: ${name} \n E-mail: ${email} \n Message:${message}`);

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newContact,
    });

  } catch (error) {
    console.error("Contact Error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


//  get all contact 
exports.getData=async(req,res)=>{
  try {
    const contactData = await Contact.find().sort({createdAt: -1 });
if(!contactData || contactData.length == 0){
  return res.status(200).json({
  sucess:true,
  total:0,
  data:[]
  })
}
return res.status(200).json({
  success:true,
  msg:"Fetched Sucessfully",
  total:contactData.length,
  data:contactData
})
  } catch (error) {
    return res.status(500).json({msg:"Intenal Server error"})
  }
}

// 