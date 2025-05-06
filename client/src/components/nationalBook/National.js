import React, { useRef, useState } from "react";
import style from "../printForm/Print.module.css";
import { useReactToPrint } from "react-to-print";
import QRCode from "react-qr-code";
export default function National() {
  const [data, setData] = useState({});
  const [wdth, setWidth] = useState("85%");
  const [mb1, setMb1] = useState("40px");
  const [date, setDate] = useState(
    `${new Date().getDate()}-${new Date().getMonth() + 1
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
      <div className={style.topContainer} >
        <div
          ref={componentRef}
          className={style.toPrint}
          style={{ width: wdth, padding: '20px', marginTop: '30px' }}
        >
          <div className={style.top}>
            <div className={style.topW}>
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
            <div style={{ marginBottom: "20px" }}>م/ صور قيد عائلية</div>
          </div>

          <p className={style.notice} style={{ marginBottom: "5px" }}>
            .... تهديكم مديريتنا اطيب التحيات
          </p>

          <p className={style.notice} style={{ marginBottom: "150px" }}>
            يرجى تزويدنا بصوره قيد عائلية معنونه الى مديرتنا للسيد/ة (
            {data.husbandName}) مع تأشير اسم الجد
            الرابع واسماء الزوج او الزوجة السابقين ان وجد مع التقدير
          </p>
          <div
            className={style.footer}
            style={{
              textAlign: "left",
              marginLeft: "25px",
              marginBottom: "50px",
            }}
          >
            <div style={{ marginLeft: "15px" }}>ر. المهندسين الاقدم</div>
            <div style={{ marginLeft: "20px" }}>جابر عبدوش عجيل</div>
            <div style={{ marginBottom: "70px" }}>مدير بلدية السماوة/وكالة</div>
            <div style={{ marginLeft: "25px" }}>: مهندس تقني</div>
            <div style={{ marginLeft: "15px" }}> صالح مرتضى صالح</div>
            <div style={{ marginLeft: "5px" }}>م. وحدة نظم المعلومات</div>
            <div style={{ marginLeft: "30px" }}> {date} </div>
          </div>
          <div
            className={style.footer}
            style={{ textAlign: "right", marginRight: "25px", marginTop: '90px' }}
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
            <div style={{ marginLeft: "10px" }}>
              <b>baladiya.samawa@gmail.com</b> <b>-*</b>
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
          <label>الي </label>
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
          <label>اسم السيد</label>
          <input
            type="text"
            style={{
              padding: "8px",
              borderRadius: "5px",
              fontSize: "18px",
              textAlign: "right",
              marginBottom: "15px",
            }}
            onChange={(e) => {
              setData({ ...data, husbandName: e.target.value });
            }}
          ></input>

          {/* <label>اسم الزوجه</label>
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
              setData({ ...data, wifeName: e.target.value });
            }}
          ></input> */}
          <button onClick={handelPrint} style={{ fontWeight: "bold" }}>
            طباعة
          </button>
        </div>
      </div>
    </>
  );
}
