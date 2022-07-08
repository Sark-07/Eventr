const db = require('../DB/DBconnection');
const bycrypt = require('bcryptjs');
let nodemailer = require('nodemailer');





// login

const merchantLogin = async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) return res.status(401).json({ message: "Please enter the correct details." });

        const [getCredentials] = await db.execute(`select email_id, password from merchant_details where email_id = '${email}'`);

        if (getCredentials.length === 0) return res.status(401).json({ message: "Wrong Email Id." });
        // console.log(getCredentials[0].password, getCredentials[0].email);

        const isMatchPassword = await bycrypt.compare(password, getCredentials[0].password);


        if (!isMatchPassword) res.status(401).json({ message: "wrong password. Please provide the correct details." })
        else {

            req.session.authenticated = true;
            res.redirect('/Eventr/api/v1/merchant/dashboard');
        }

    } catch (error) {

        res.status(500).json(error);
    }



}

//registration
const merchantRegister = async (req, res) => {

    try {
        const { firstName, lastName, email, password: plainTextPassword, phoneNumber, address } = req.body;

        // console.log(req.body);

        if (!firstName || !lastName || !email || !plainTextPassword || !phoneNumber || !address || plainTextPassword.length < 3) return res.status(400).json({ message: "Please provide all the required details!" });


        const [getEmail] = await db.execute(`select email_id from merchant_details where email_id = '${email}';`);
        console.log(getEmail);
        if (getEmail.length > 0) return res.status(401).json({ message: "Email already exists." });

        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(plainTextPassword, salt);

        await db.execute(`INSERT INTO merchant_details (merchant_id, first_name, address, email_id, phone_no, bank_account_details, password, last_name) VALUES ( NULL, '${firstName}', '${address}', '${email}', ${phoneNumber}, "", '${hashedPassword}', '${lastName}');`);

        res.status(201).json({ succes: true, message: "Registration succesfull." })

    } catch (error) {

        res.status(500).json(error);
    }
}

const merchantDashboard = async (req, res) => {


    res.status(201).json({ message: `welcome ${""}. Have a great day ahead.` });

}



const merchantForgotPassword = async (req, res) => {

    try {


        const { email } = req.body;

        if (!email) return res.status(400).json({ message: "Please provide your registered email id." });

        const [checkEmail] = await db.execute(`select email_id from merchant_details where email_id = '${email}'`);

        if (checkEmail.length === 0) return res.status(400).json({ message: "Please provide your registered email id." });

        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            requireTLS: true,
            auth: {
                user: 'projecteventr@gmail.com',
                pass: 'eventrpvtltd'
            },
            tls: {
                rejectUnauthorized: false,
                minVersion: "TLSv1.2"
            }
        });


        let token = (Math.floor(Math.random() * 9999) + 1000);
        const mailOptions = {

            from: `Eventr  <projecteventr@gmail.com>`,
            to: 'iampritamsarkar07@gmail.com',
            subject: `Password reset`,
            text: 'Your secret OTP',
            html: `<p><a href="localhost:8080/Eventr/api/v1/merchant/reset-password?otp=${token}">localhost:8080/Eventr/api/v1/merchant/reset-password/:${token}</a></p>`
        }

        transporter.sendMail(mailOptions, async (err, info) => {

            if (err) return res.status(500).json({ err, message: "Some error occured. Please try after sometime." })


            console.log(info.messageId, info.response);


            await db.execute(`UPDATE merchant_details SET token = ${token} WHERE email_id = '${email}';`)

            res.status(200).json({ message: "Reset link has been sent to your Email. Please check your spam folder." });

        })

    } catch (error) {

        res.status(500).json(error)
    }

}


const merchantResetPasswordGet = async (req, res) => {

    res.status(200).json({ message: "Hello madarboard!!" });
}


const merchantResetPasswordPost = async (req, res) => {

    try {
        const { token } = req.params;

        const [getID] = await db.execute(`select merchant_id from merchant_details where token = ${token}`);

        if (getID.length === 0) return res.status(400).json({ message: "Bad request." })


        const { password: plainTextPassword, password2 } = req.body;

        if (!plainTextPassword || !password2 || plainTextPassword != password2) return res.status(400).json({ message: "Bad request." })


        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(plainTextPassword, salt);

        await db.execute(`UPDATE merchant_details SET password = '${hashedPassword}' WHERE merchant_id = ${getID[0].merchant_id};`);
        await db.execute(`UPDATE merchant_details SET token = NULL WHERE token = ${token};`);

        return res.status(201).json({ message: "New password updated. Please login" });


    }

    catch (error) {

        res.status(500).json(error)

    }



}




module.exports = { merchantDashboard, merchantLogin, merchantRegister, merchantForgotPassword, merchantResetPasswordGet, merchantResetPasswordPost }