const User = require("../models/userModels")
const sendToken = require("../utils/sendToken")
const sendEmail = require("../utils/sendEmail")
const catchAsyncError = require("../middleware/catchAsyncError")
const ErrorHander = require("../utils/errorhandler")
const crypto = require("crypto")
const cloudinary = require("cloudinary")

exports.resisterUser = catchAsyncError(async (req, res, next) => {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
    });
    const { name, email, password } = req.body

    // const file = req.files.avatar
    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale",
    // });
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        },
    })
    sendToken(user, 200, res)
    // const token = user.getJWTToken()
    // res.status(201).json({
    //     success: true,
    //     user,
    //     token
    // })
})

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(500).json({
            message: "Invalid Email or password"
        })
    }

    const user = await User.findOne({ email }).select("+password")
    if (!user) {
        return res.status(500).json({
            message: "Invalid Email or Password"
        })
    }
    const isPassword = await user.comparePassword(password)
    if (!isPassword) {
        return res.status(500).json({
            message: "Invalid Email or Password"
        })
    }

    sendToken(user, 200, res)
    // const token = user.getJWTToken()
    // res.status(200).json({
    //     success: true,
    //     message: "Logged in",
    //     token
    // })
})

exports.logoutUser = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "You are Logged Out"
    })
})

// // forgot password
// exports.forgetPassword = catchAsyncError(async (req, res, next) => {
//     const user = await User.findOne({ email: req.body.email })

//     if (!user) {
//         return next(new ErrorHander("user not found", 404))
//     }

//     // reset password token
//     const resetToken = user.getResetPasswordToken()

//     await user.save({ validateBeforeSave: false })

//     const resetPasswordUrl = `${req.protocol}://${req.get(
//         "host"
//     )}/password/reset/${resetToken}`

//     const message = `your reset password token is :- \n\n  ${resetPasswordUrl} \n\n please ignore if not not requested the url`

//     try {
//         await sendEmail({
//             email: user.email,
//             subject: "Ecommerce Recovery password",
//             message,
//         })

//         res.status(201).json({
//             success: true,
//             message: `Email sent to ${user.email} successfully!`
//         })
//     } catch (err) {
//         user.resetPasswordToken = undefined,
//             user.resetPasswordExpire = undefined,
//             await user.save({ validateBeforeSave: false })
//         return res.status(404).json(error.message, 500)
//     }
// })
// Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHander("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;

    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

    try { 
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return res.status(500).json(error.message, 500)
    }
});

// Reset Password

exports.resetPassword = catchAsyncError(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto.createHash("sha256")
        .update(req.params.token).digest("hex")

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(new ErrorHander("Reset password Token is invalid or has been expired", 500))
    }

    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHander("Password does not match", 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)
})

// get User Detail 
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});



// exports.resetPassword = catchAsyncError(async (req, res, next) => {
//     // creating token hash
//     const resetPasswordToken = crypto
//         .createHash("sha256")
//         .update(req.params.token)
//         .digest("hex");
//     console.log(resetPasswordToken)

//     const user = await User.findOne({
//         resetPasswordToken,
//         resetPasswordExpire: { $gt: Date.now() },
//     });
//     console.log(user)

//     if (!user) {
//         console.log(user)
//         return next(
//             new ErrorHander(
//                 "Reset Password Token is invalid or has been expired",
//                 400
//             )
//         );
//     }

//     if (req.body.password !== req.body.confirmPassword) {
//         return next(new ErrorHander("Password does not password", 400));
//     }

//     user.password = req.body.password;
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;

//     await user.save();

//     sendToken(user, 200, res);
// });

// update User Password

exports.updatePassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password")

    const isPassword = await user.comparePassword(req.body.oldPassword)
    if (!isPassword) {
        return next(new ErrorHander("old Password is incorrect", 404))
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHander("Password does not match", 400))
    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res)
})

// update user profile

// exports.updateProfile = catchAsyncError(async (req, res, next) => {
//     const newUserData = {
//         name: req.body.name,
//         email: req.body.email
//     }

//     const user = await User.findById(req.user.id, newUserData, {
//         new: true,
//         runValidators: true,
//         useFindAndModify: false
//     })

//     res.status(200).json({
//         success: true,
//         user,
//     })
// })
exports.updateProfile = catchAsyncError(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }

    if (req.body.avatar !== "") {
        const user = await User.findById(req.user.id);
        console.log(user)
        const imageId = user.avatar.public_id;
        console.log(imageId)
        await cloudinary.v2.uploader.destroy(imageId);
        console.log(cloudinary.v2.uploader.destroy(imageId))

        const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
            folder: "avatars",
            width: 150,
            crop: "scale",
        });
        console.log(req.body.images)
        console.log(myCloud)

        newUserData.avatar = {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        };

        console.log(newUserData)
    }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

// Get All User 

exports.getAllUser = catchAsyncError(async (req, res, next) => {
    const users = await User.find()

    res.status(200).json({
        success: true,
        users
    })
})

// Get Single user(admin)

exports.getSingleUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHander(`user does not exist wuth Id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user,
    })
})

// update User role 

exports.updateUserRole = catchAsyncError(async (req, res, next) => {
    const newUserdata = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role,
    }


    await User.findByIdAndUpdate(req.params.id, newUserdata, {
        new: true,
        runValidators: true,
        useFindAndModify: true,
    })

    res.status(200).json({
        succes: true,
    })
})

// Delete User (Admin)

exports.deleteUser = catchAsyncError(async (req, res, next) => {
    const user = await User.findById(req.params.id)

    if (!user) {
        return next(new ErrorHander(`User does not exist with Id: ${req.params.id} `, 400))
    }


    // const imageId = user.avatar.public_id;

    // await cloudinary.v2.uploader.destroy(imageId);


    await user.remove();

    res.status(200).json({
        succes: true,
        message: "User Deleted Successfully!"
    })
})
