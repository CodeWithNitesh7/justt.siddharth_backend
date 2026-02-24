const token = require('../config/token');


exports.login = async (req, res) => {
    const { email, password } = req.body;

    // Check if email or password is missing
    if (!email || !password) {
        return res.status(400).json({
            msg: "Email and password are required"
        });
    }

    try {
        const cleanEmail = email.trim().toLowerCase();
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPass = process.env.ADMIN_PASS;

        // Validate credentials
        if (cleanEmail !== adminEmail || password !== adminPass) {
            return res.status(401).json({
                msg: "Invalid credentials"
            });
        }

        const payload = {
            email: cleanEmail,
            role: "admin"
        };
        const jwtToken = await token(payload);

        // Set cookie
        res.cookie("token", jwtToken, {
            httpOnly: true,
            secure: true, // true in production (HTTPS)
            // sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });

        return res.status(200).json({
            success:true,
            msg: "Welcome Admin",
        });

    } catch (error) {
        return res.status(500).json({
            sucess:false,
            msg: "Internal Server Error",
            error:error.message
        });
    }
};


exports.logout= async(req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly:true,
            secure:true,
            sameSite:"strict",
        });
        return res.status(200).json({sucess:true,
            msg:"Logout Sucessfully"});
    } catch (error) {
        return res.status(500).json({sucess:false,
            msg:"Logout failed ",
            error:error.message
        })
    }
}
