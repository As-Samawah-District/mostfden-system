const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Log = require("../models/logsModel");
const IP = require("ip");
const os = require("os");
const User = require("../models/userModel");
const Logo = require("../models/logoModel");
const Form = require('../models/formModel')
const signIn = async (req, res) => {
  // console.log(req.body);
  if (!req.body.name) return res.status(400).json("name is required");
  if (!req.body.password) return res.status(400).json("Password is required");

  try {
    let user = await User.find({ name: req.body.name });
    let user2 = await User.find({ name: req.body.name }, { password: false });
    if (user.length == 0) return res.status(404).json("user not exist");
    user = user[0];
    user2 = user2[0];
    bcrypt.compare(req.body.password, user.password).then(async (same) => {
      if (!same) {
        return res.status(400).json("Password is not correct");
      }
      const token = jwt.sign(user2.toJSON(), "HS256", {
        expiresIn: "24h",
      });
      //    console.log('from3 ', user)
      if (!user.hidden)
        await Log.create({
          type: "تسجيل دخول",
          user: user.name,
          details: "",
          system: os.platform(),
          ip: IP.address(),
        });
      res.status(200).json({ token: token });
    });
  } catch (err) {
    console.log(err);
  }
};

const signUp = async (req, res) => {
  //console.log(req.body);
  if (!req.body.name) return res.status(400).json("name is required");
  if (!req.body.password) return res.status(400).json("Password is required");
  if (!req.body.fullName) return res.status(400).json("full Name is required");
  let { name, password, fullName, phone, admin, role } = req.body;
  //console.log(role);
  let image = req.file ? req.file.path : undefined;
  try {
    const user = await User.find({ name: req.body.name });
    if (user.length > 0) {
      return res.status(400).json("user already exists");
    }
    bcrypt.hash(password, 10).then(async (hashed) => {
      try {
        //     console.log(hashed, password)
        let user = await User.create({
          name,
          password: hashed,
          fullName,
          phone,
          admin,
          image,
          hidden: false,
          role: String(req.body.role).split(',')
        });
        console.log('from ', req.user)
        if (!req.user.hidden) {
          await Log.create({
            type: "اضافه موظف",
            user: user.userName,
            details: `تسجيل موظف جديد :${name}`,
            system: os.platform(),
            ip: IP.address(),
          });
        }

      } catch (err) {
        return res.status(400).json(err.message);
      }

      return res.status(200).json("signup sucessfully");
    });
  } catch (err) {
    return res.status(401).json(err);
    console.log("xxxx", err);
  }
};

// create admin user if not exist
const createAdmin = async () => {
  try {
    let user = await User.find({ name: "admin" });
    if (user.length > 0) {
      return;
    }
    bcrypt.hash("Qw123456@@", 10).then(async (hashed) => {
      try {
        await User.create({
          name: "admin",
          password: hashed,
          fullName: "admin",
          phone: "123456",
          admin: true,
          image: "admin.png",
          role: ["admin", "setting"],
        });
        console.log("admin created");
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

// change admin password with given password
const changeAdminPassword = async (password) => {
  try {
    let user = await User.find({ name: "admin" });
    if (user.length == 0) {
      return;
    }
    bcrypt.hash(password, 10).then(async (hashed) => {
      try {
        await User.findByIdAndUpdate(user[0]._id, { password: hashed });
        console.log("admin password changed");
      } catch (err) {
        console.log(err);
      }
    });
  } catch (err) {
    console.log(err);
  }
}

const editProfile = async (req, res) => {
  //  console.log(req.body);
  try {
    if (req.params.id != req.user._id && !req.user.admin)
      return res.status(400).json("you are not authorized");

    try {
      let user = await User.findById(req.params.id);
      if (req.body.name) {
        const test = await User.find({ name: req.body.name });
        if (test.length && test[0].name != user.name) {
          return res.status(400).json("not allowed to use this email");
        }
      }
      let hashed = user.password;
      //  console.log(req.body.role);
      if (req.body.role) console.log(req.body.role);
      let image = req.file ? req.file.filename : user.image;
      if (req.body.password)
        bcrypt.hash(req.body.password, 10).then((result) => {
          hashed = result;
        });
      //    console.log("yyyyyyyyyy");
      user = await User.findByIdAndUpdate(req.params.id, {
        name: req.body.name || user.name,
        password: hashed,
        fullName: req.body.fullName || user.fullName,
        phone: req.body.phone || user.phone,
        admin: req.body.admin || user.admin,
        image: image,
        role: String(req.body.role).split(','),
        jobTittle: req.body.jobTittle || user.jobTittle,
      });
      user = await User.findById(req.params.id);
      const token = jwt.sign(user.toJSON(), "HS256", {
        expiresIn: "24h",
      });
      if (!req.user.hidden) {
        await Log.create({
          type: "تعديل بيانات",
          user: user.name,
          details: `قام ${req.user.name} بتعديل البيانات`,
          system: os.platform(),
          ip: IP.address(),
        });
      }
      return res.status(200).json({ token: token });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  } catch (err) {
    console.log(err);
  }
};

const getAll = async (req, res) => {
  try {
    const data = await User.find({ name: { $ne: "admin" } });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(400).json(error);
  }
};

const changeSign = async (req, res) => {
  //console.log(req.user);
  //console.log( req.file);
  // if (!req.user.admin || !req.file)
  //  return res.status(400).json("you are not authorized");
  // console.log( 'xxxxx' );
  try {
    console.log(req.file);
    await Logo.deleteMany({});
    await Logo.create({
      image: req.file.filename,
    });
    return res.status(200).json(req.file.filename);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const changeRole = async (req, res) => {
  if (!req.user.admin) return res.status(400).json("you are not authorized");
  try {
    await User.findByIdAndUpdate(req.body.id, { admin: req.body.admin });
    return res.status(200).json("done");
  } catch (error) {
    res.status(400).json(error);
  }
};

const getUser = async (req, res) => {
  if (!req.user.admin && req.user._id != req.params.id)
    return res.status(400).json("not authorized");
  try {
    let user = await User.findById(req.params.id);
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getLogo = async (req, res) => {
  try {
    const result = await Logo.find({});
    console.log(result[0].image)
    return res.status(200).json(result[0].image);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteUser = async (req, res) => {
  // console.log(req.user);
  if (!req.user.admin && !req.user.role.includes("setting"))
    return res.status(400).json("not authorized");
  try {
    await User.findByIdAndDelete(req.params.id)
    return res.status(200).json('deleted')
  } catch (error) {
    return res.status(400).json(error)
  }
};

// const numOfForms = async(req,res)=>{
//   try {
//     let len = await Form.find({})
//     if(len) return res.status(200).json(len[len.length - 1].formNumber+1)
//     else return res.status(200).json(1)
//   } catch (error) {
//     return res.status(400).json(error)

//   }
// }
module.exports = {
  signIn,
  signUp,
  editProfile,
  getAll,
  changeSign,
  changeRole,
  getLogo,
  getUser,
  deleteUser,
  createAdmin,
  changeAdminPassword
};
