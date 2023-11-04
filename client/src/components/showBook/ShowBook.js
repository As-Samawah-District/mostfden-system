import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import style from "../printForm/Print.module.css";
import QRCode from "react-qr-code";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { useParams } from "react-router-dom";

export const ShowBook = () => {
  const componentRef = useRef();
  const [rf, setRef] = useState(false);
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "test",
    onAfterPrint: () => alert("print sucess"),
  });
  let id = useParams().id;
  const [data, setMyData] = useState(null);
  const [user, setUser] = useState("");
  const [mb, setMb] = useState("40px");
  const [mb1, setMb1] = useState("40px");
  const [wdth, setWidth] = useState("90%");
  const [date, setDate] = useState(
    `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`
  );
  useEffect(() => {
    let token = Cookies.get("auth");
    // if (!token) window.location.replace("/");
    // if (!jwtDecode(token).admin && !jwtDecode(token).role.includes("edit"))
    //   window.location.replace("/");
    // setUser(jwtDecode(token).fullName);
    let get = async () => {
      let res = await fetch(`http://localhost:8000/form/${id}`, {
        method: "GET",
        // headers: {
        //   Authorization: `token ${token}`,
        // },
      });
     // console.log(res.status);
      if (res.status == 200) {
        res = await res.json();
        const date1 = new Date(res.createdAt.slice(0, 10));
        const date2 = new Date("2023-07-11");
        if (date1 > date2) setRef(true);
        setMyData(res);
      }
    };
    get();
  }, []);
  if (!data) return <></>;
  return (
    <>
      <div className={style.topContainer}>
        <div
          ref={componentRef}
          className={style.toPrint}
          style={{ width: "80%", marginTop: "20px", marginBottom: "20px" }}
        >
          <div className={style.top}>
            <div className={style.topW}>
              <div>رقم الاستماره / {data.formNumber}</div>
              <div> / العدد</div>
              <div> / التاريخ</div>
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
              marginBottom: "30px",
            }}
          ></hr>
          <div className={style.head}>
            <div style={{ marginBottom: "20px" }}>م/ بيان استفادة</div>
            <div style={{ marginBottom: "50px" }}>
              :لدى الفحص و التدقيق في برنامج ادخال المستفيدين تبين مايلي
            </div>
          </div>
          <div className={style.tabl}>
            <div className={style.def}>
              <div> اسم الام / {data.motherName}</div>
              <div>مقدم الطلب / {data.fullName} </div>
            </div>
            <div style={{ padding: "10px", borderLeft: ".5px solid black" }}>
              اسم الزوج / {data.husbandName}
            </div>

            <div className={style.def}>
              <div>رقم المقاطعة / {data.addressNubmer}</div>
              <div>رقم القطعة / {data.pieceNumber}</div>
            </div>
            <div className={style.def}>
              <div>الشريحة / {data.classType}</div>
              <div>
                {" "}
                تاريخ التخصيص /{" "}
                {data.assignDate ? data.assignDate.slice(0, 10) : ""}
              </div>
            </div>
            <div className={style.def}>
              <div>
                {" "}
                {rf
                  ? `تاريخ ادخال البيانات / ${data.createdAt.slice(0, 10)}`
                  : `/ تاريخ ادخال البيانات`}
              </div>
              <div style={{ padding: "10px", borderLeft: ".5px solid black" }}>
                {" "}
                موقف مقدم الطلب / {data.beneficiary ? "مستفيد" : "غير مستفيد"}
              </div>
            </div>

            <div
              style={{
                padding: "10px",
                borderLeft: ".5px solid black",
                fontSize: "14px",
              }}
            >
              {" "}
              {data.note != "" ? `ملاحظه / ${data.note}` : `/ ملاحظه`}
            </div>
          </div>
          <p className={style.notice} style={{ marginBottom: mb1 }}>
            {" "}
            المعلومات أعلاه تخص الحدود الادارية لمديريتنا ولغاية تاريخ تنظيم
            الاستمارة ونحن غير مسؤولين عن استفادتهم في بلديات المثنى لفك
            ارتباطها من مديريتنا و اي حالة تمليك أخرى لانه من اختصاص مديرية
            التسجيل العقاري في المثنى{" "}
          </p>
          <p className={style.notice} style={{ marginBottom: mb }}>
            في حالة استفادة الموما اليه أعلاه و عدم ذكره ضمن قاعدة البيانات
            يتحمل المستفيد كافة التبعات القانونية بحسب المادة ثالثا من قرار 120
            لسنة 2012
          </p>
          <div className={style.qr}>
            <QRCode
              value={`http://${window.location.hostname}/form/show/${id}`}
              style={{ height: "100px" }}
            />
          </div>
          <div className={style.footer}>
            <div>{user}</div>
            <div>اسم الموظف المسوؤل</div>
            <div>{date}</div>
          </div>
          <p style={{ textAlign: "right", marginRight: "20px" }}>
            {" "}
            <b>ملاحظه :</b> الاستمارة خالية من الحك والشطب وفي حال ذلك تعتبر
            مزورة{" "}
          </p>
        </div>
      </div>
    </>
  );
};
