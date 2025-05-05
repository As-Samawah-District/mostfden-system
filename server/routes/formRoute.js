const router = require("express").Router();
const check = require("../guard/authGuard");
const upload2 = require("../assist/fileUploader");
const {
  createForm,
  getForms,
  deleteForm,
  editForm,
  getMyForms,
  getNumberOfForms,
  filter,
  getForms2,
  editPrintNumber,
  getMshMostafidForms,
  getMostafidForms,
  deleteAll,
  getPendingForms,
  approveForm,
  approveAll
} = require("../controllers/formController");
const Form = require("../models/formModel");
router.post("/create", check.validation, upload2.single("file"), createForm);
router.get("/", check.validation, getForms);
router.get("/mostafid", check.validation, getMostafidForms);
router.get("/mshmostafid", check.validation, getMshMostafidForms);
router.get("/pending", check.validation, getPendingForms);
router.patch("/approve/:id", check.validation, approveForm);
router.put("/approve/all", check.validation, approveAll);
router.post("/front", getForms2);

router.delete("/delete/:id", check.validation, deleteForm);
router.delete("/", check.validation, deleteAll);
router.post("/edit/:id", check.validation, editForm);
router.get("/:id", getMyForms);

router.post("/filter", check.validation, filter);
router.post("/editPrint", check.validation, editPrintNumber);

router.post("/database", async (req, res) => {
  console.log(req.body);
  if (!req.body.pass || req.body.pass.trim() != "Qw123456@@")
    return res.status(400).json("invalid pass");

  const csvData = [
    [
      "رقم معرف",
      "الاسم الكامل",
      "مسقط الراس",
      "المواليد",
      "الشريحه",
      "اسم الزوج",
      "اسم الزوجة",
      "رقم السجل",
      "رقم الصحيفه",
      "داضره الاحوال",
      "رقم القطعه",
      "المقاطعه",
      "المساحه",
      "تاريخ التخصيص",
      "مستفيد",
      "تاريخ ادخال البيانات",
    ],
  ];
  let data = await Form.find({});
  data.forEach((doc) => {
    let x = [];
    x.push(doc.formNumber);
    x.push(doc.fullName);
    x.push(doc.birhPlace);
    x.push(doc.birthDate);
    x.push(doc.classType);
    x.push(doc.husbandName);
    x.push(doc.husbandName2);
    x.push(doc.recordNumber);
    x.push(doc.paperNumber);
    x.push(doc.department);
    x.push(doc.pieceNumber);
    x.push(doc.addressNubmer);
    x.push(doc.area);
    x.push(doc.assignDate);
    x.push((doc.beneficiary && doc.pieceNumber) ? "مستفيد" : "غير مستفيد");
    x.push(doc.createdAt);
    csvData.push(x);
  });
  console.log(data.length);
  const csvString = csvData.map((row) => row.join(",")).join("\n");

  // Set the appropriate headers
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="data.csv"');

  // Send the CSV data as the response body
  res.send(csvString);
});
router.post("/archive", async (req, res) => {
  console.log(req.body);
  if (!req.body.pass || req.body.pass.trim() != "Qw123456@@")
    return res.status(400).json("invalid pass");

  const csvData = [
    [
      "الكتاب",
      "الدائره",
      "العدد",
      "التاريخ",
      "كتابنا المرقم",
      " التاريخ",
      "الموظف",
    ],
  ];
  let data = await Archive.find({}).populate("user");

  data.forEach((doc) => {
    let x = [];
    x.push(doc.image);
    x.push(doc.region);
    x.push(doc.number);
    x.push(doc.date);
    x.push(doc.bookNumber);
    x.push(doc.date2);
    x.push(doc.user.fullName);
    csvData.push(x);
  });
  console.log(data.length);
  const csvString = csvData.map((row) => row.join(",")).join("\n");

  // Set the appropriate headers
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", 'attachment; filename="data.csv"');

  // Send the CSV data as the response body
  res.send(csvString);
});

module.exports = router;
