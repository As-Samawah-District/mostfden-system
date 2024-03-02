import React, { useRef, useState } from "react";
import style from "../printForm/Print.module.css";
import { useReactToPrint } from "react-to-print";
export default function Tashier() {
  const [data, setData] = useState({});
  const [wdth, setWidth] = useState("85%");
  const [date, setDate] = useState(
    `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`
  );
  const componentRef = useRef();
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "SMV",
  });
  return (
    <>
      <div className={style.nav}>
        <button
          onClick={() => {
            window.location.replace("/forms");
          }}
        >
          X
        </button>
        <div>
          <h2>{data.fullName}</h2>
        </div>
      </div>
      <div className={style.tmp}></div>
      <div className={style.topContainer}>
        <div
          ref={componentRef}
          className={style.toPrint}
          style={{ width: wdth }}
        >
          <div className={style.top}>
            <div className={style.topW}>
              {/* <div>
                {" "}
                {data.formNumber
                  ? `رقم الاستماره / ${data.formNumber}`
                  : `/ رقم الاستماره`}
              </div> */}
              <div
                style={{
                  marginLeft: "25px",
                  marginTop: "10px",
                  marginBottom: "5px",
                }}
              >
                {" "}
                / العدد
              </div>
              <div style={{ marginLeft: "25px" }}> / التاريخ</div>
            </div>
            <div>
              <img src="1698956106609-image-525acf9e29b89e9cdea769d5d8c0ef1b8720823e.png"></img>
            </div>
            <div className={style.topW}>
              <div> مديرية بلدية السماوة</div>
              <div> شعبة التخطيط والمتابعة</div>
              <div> وحدة نظم المعلومات</div>
            </div>
          </div>
          <hr
            style={{
              width: "90%",
              border: "1.5px solid black",
              marginBottom: "10px",
            }}
          ></hr>
          <div className={style.head}>
            <div style={{ marginBottom: "20px" }}>الى/ {data.to}</div>
            <div style={{ marginBottom: "20px" }}>م/ بيان استفادة</div>
          </div>

          <p className={style.notice} style={{ marginBottom: "5px" }}>
            .... تهديكم مديريتنا اطيب التحيات
          </p>
          <p className={style.notice} style={{ marginBottom: "5px" }}>
            كتابكم المرقم ({data.bookNumber}) في {data.date}
          </p>
          <p
            className={style.notice}
            style={{ marginBottom: "150px", lineHeight: "40px" }}
          >
            لدى الفحص والتدقيق في برنامج ادخال المستفيدين تبين عدم استفادة
            السيد/ة ({data.name}) ضمن الحدود الادارية لمديريتنا ونحن غير مسؤولين
            عن استفادتهم في بلديات المثنى لفك ارتباطها من مديريتنا او حالة تمليك
            اخرى لأنها من اختصاص دائرة التسجيل العقاري في المثنى وتم تأشير
            القطعة وحسب الاستمارة المرفقة مع التقدير
          </p>
          <div
            className={style.footer}
            style={{
              textAlign: "left",
              marginLeft: "25px",
              marginBottom: "50px",
            }}
          >
            <div style={{ marginLeft: "15px" }}>ر. المهندسين</div>
            <div style={{ marginLeft: "10px" }}>احسان سعد حسون</div>
            <div style={{ marginBottom: "70px" }}>مدير بلدية السماوة </div>
            <div style={{ marginLeft: "35px" }}>م. مبرمج</div>
            <div style={{ marginLeft: "5px" }}> صالح مرتضى صالح</div>
            <div style={{ marginLeft: "20px" }}> {date} </div>
          </div>
          <div
            className={style.footer}
            style={{ textAlign: "right", marginRight: "25px" }}
          >
            <div style={{ marginLeft: "15px" }}>
              {" "}
              <b style={{ textAlign: "left" }}>.....: </b>نسخه منه الى{" "}
            </div>
            <div style={{ marginLeft: "10px" }}>
              .<b>وحده نظم المعلومات // للحفظ لطفا</b>
              <b>-*</b>
            </div>
            <div style={{ marginLeft: "10px" }}>
              .<b>الاضبارة</b> <b>-*</b>
            </div>
          </div>
        </div>

        <div className={style.Scontainer}>
          <h3
            style={{
              lineHeight: "20px",
              textDecoration: "underline",
              textAlign: "center",
            }}
          >
            البيانات المتغيره
          </h3>
          <label> الي </label>
          <input
            type="text"
            style={{
              padding: "8px",
              borderRadius: "5px",
              fontSize: "18px",
              textAlign: "right",
            }}
            onChange={(e) => {
              setData({ ...data, to: e.target.value });
            }}
          ></input>
          <label>اسم الغير مستفيد</label>
          <input
            type="text"
            style={{
              padding: "8px",
              borderRadius: "5px",
              fontSize: "18px",
              textAlign: "right",
            }}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
          ></input>
          <label>رقم الكتاب</label>
          <input
            type="text"
            style={{
              padding: "8px",
              borderRadius: "5px",
              fontSize: "18px",
              textAlign: "right",
            }}
            onChange={(e) => {
              setData({ ...data, bookNumber: e.target.value });
            }}
          ></input>
          <label>التاريخ</label>
          <input
            type="text"
            style={{
              padding: "8px",
              borderRadius: "5px",
              fontSize: "18px",
              textAlign: "right",
              marginBottom: "15PX",
            }}
            onChange={(e) => {
              setData({ ...data, date: e.target.value });
            }}
          ></input>
          <button onClick={handelPrint} style={{ fontWeight: "bold" }}>
            طباعة
          </button>
        </div>
      </div>
    </>
  );
}
