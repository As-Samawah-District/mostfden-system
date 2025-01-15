import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import style from "./Print.module.css";
import QRCode from "react-qr-code";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { server_url } from "../../config";

export const Print = (props) => {
  const componentRef = useRef();
  const [wdth, setWidth] = useState("90%");
  const [mb, setMb] = useState("40px");
  const [mb1, setMb1] = useState("40px");
  const [user, setUser] = useState("");
  const [number, setNumber] = useState(0);
  const [date, setDate] = useState(
    `${new Date().getDate()}-${
      new Date().getMonth() + 1
    }-${new Date().getFullYear()}`
  );
  const [rf, setRef] = useState(false);
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "SMV",
  });
  const [id, setId] = useState(useParams().id);
  ///  let id = "6473ebcd8b5f100889736829";
  const [data, setMyData] = useState(null);
  let token = Cookies.get("auth");

  useEffect(() => {
    if (!token) window.location.replace("/");

    setUser(jwtDecode(token));
    if (props.husbandName || props.fullName) {
      setMyData({
        husbandName: props.husbandName,
        fullName: props.fullName,
        husbandName2: props.husbandName2,
      });
    } else {
      let get = async () => {
        let res = await fetch(`${server_url}/form/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        });
        // console.log(res);

        if (res.status == 200) {
          res = await res.json();
          if (res.createdAt) {
            const date1 = new Date(res.createdAt.slice(0, 10));
            const date2 = new Date("2023-07-11");
            if (date1 > date2) setRef(true);
          }
          setNumber(res.number);
          setMyData(res);
        }
      };
      get();
    }
  }, []);
  const handelClick = async (e) => {
    e.preventDefault();
    let token = Cookies.get("auth");
    let res = await axios.post(`${server_url}/form/create`,
      {
        fullName: props.fullName,
        husbandName: props.husbandName,
        husbandName2: data.husbandName2,
        b: true,
      },
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    if (res.status == 200) {
      //   res = await res.json()
      //console.log(res.data);
      if (res.data.createdAt) {
        const date1 = new Date(res.data.createdAt.slice(0, 10));
        const date2 = new Date("2023-07-11");
        if (date1 > date2) setRef(true);
      }
      setId(res.data);
      setMyData(res.data);

      //window.location.replace("/forms");
    } else {
      // window.location.reload();
    }
  };
  const handelPrintNumber = async () => {
    let res = await fetch(`${server_url}/form/editPrint`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify({
        id: data._id,
        number: data.number,
      }),
    });
    if (res.status == 200) {
      res = await res.json();
      setMyData(res);
    } else {
      res = await res.json();
      // console.log(res);
    }
  };
  if (!data) return <div className={style.loader}></div>;
  // console.log(data);
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
          name={id}
        >
          <div className={style.top}>
            <div className={style.topW}>
              <div>
                {" "}
                {data.formNumber
                  ? `رقم الاستماره / ${data.formNumber}`
                  : `/ رقم الاستماره`}
              </div>
              <div>
                {" "}
                {data.number != undefined ? `العدد / ${number || data.number}` : `/ العدد`}
              </div>
              <div> {`التاريخ / ${date}`}</div>
            </div>
            <div>
              {/* public/1698956106609-image-525acf9e29b89e9cdea769d5d8c0ef1b8720823e.png */}
            <img src="../../1698956106609-image-525acf9e29b89e9cdea769d5d8c0ef1b8720823e.png" alt="logo" />
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
            <div style={{ marginBottom: "20px" }}>م/ بيان استفادة</div>
            <div style={{ marginBottom: "40px" }}>
              :لدى الفحص و التدقيق في برنامج ادخال المستفيدين تبين مايلي
            </div>
          </div>
          <div className={style.tabl}>
            <div className={style.def}>
              <div>
                {" "}
                {data.motherName
                  ? `اسم الام / ${data.motherName}`
                  : `/ اسم الام`}
              </div>
              <div>
                {" "}
                {data.fullName
                  ? ` مقدم الطلب / ${data.fullName}`
                  : `/ مقدم الطلب`}{" "}
              </div>
            </div>
            <div className={style.def}>
              <div>
                {data.husbandName2
                  ? `اسم الزوجه / ${data.husbandName2}`
                  : `/  اسم الزوجه`}
              </div>
              <div style={{ padding: "10px", borderLeft: ".5px solid black" }}>
                {data.husbandName
                  ? `اسم الزوج / ${data.husbandName}`
                  : `/  اسم الزوج`}
              </div>
            </div>
            <div className={style.def}>
              <div>
                {" "}
                {data.addressNubmer
                  ? `رقم المقاطعه / ${data.addressNubmer}`
                  : `/ رقم المقاطعه`}
              </div>
              <div>
                {" "}
                {data.pieceNumber
                  ? `رقم القطعه / ${data.pieceNumber}`
                  : `/ رقم القطعه`}
              </div>
            </div>
            <div className={style.def}>
              <div>
                {" "}
                {data.classType ? `الشريحه / ${data.classType}` : `/ الشريحه`}
              </div>
              <div>
                {" "}
                {data.assignDate
                  ? `تاريخ التخصيص / ${data.assignDate?.slice(0, 10)}`
                  : `/ تاريخ التخصيص`}
              </div>
            </div>
            {/* <div className={style.def}>
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
            </div> */}
            <div style={{ padding: "10px", borderLeft: ".5px solid black" }}>
              موقف مقدم الطلب / {data.beneficiary ? "مستفيد" : "غير مستفيد"}
            </div>

            <div
              style={{
                padding: "10px",
                borderLeft: ".5px solid black",
                fontSize: "12px",
              }}
            >
              {" "}
              {data.note != "" && data.note
                ? `ملاحظه / ${data.note}`
                : `/ ملاحظه`}
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
            <div>{user.fullName}</div>
            <div> {user.jobTittle} </div>
            <div>{date}</div>
          </div>
          <p style={{ textAlign: "right", marginRight: "20px" }}>
            {" "}
            <b>ملاحظه :</b>
            الاستمارة خالية من الحك والشطب وفي حال ذلك تعتبر مزورة (الاستمارة
            صالحة لمدة ٦٠يوم من تاريخ الصادر)
          </p>
        </div>
        <div className={style.Scontainer}>
          <h3 style={{ lineHeight: "20px", textDecoration: "underline" }}>
            المعلومات الاساسية
          </h3>
          <div>{data.fullName ? `الاسم : ${data.fullName}` : `: الاسم`}</div>
          <div>
            {data.husbandName
              ? ` اسم الزوج : ${data.husbandName}`
              : `: اسم الزوج`}
          </div>
          <div>
            {" "}
            {data.motherName
              ? `اسم الام : ${data.motherName}`
              : `: اسم الام`}{" "}
          </div>
          <div>
            {" "}
            {data.assignDate
              ? `تاريخ التخصيص : ${data.assignDate?.slice(0, 10)}`
              : `: تاريخ التخصيص`}
          </div>
          <div> {data.area ? ` المساحه : ${data.area}` : `: المساحه`}</div>
          <div>
            {" "}
            {data.addressNubmer
              ? ` المقاطعة : ${data.addressNubmer}`
              : `: المقاطعة`}{" "}
          </div>
          <div>
            {data.pieceNumber
              ? `  رقم القطعة : ${data.pieceNumber}`
              : `:  رقم القطعة`}
          </div>
          <div>
            {" "}
            {data.recordNumber
              ? ` رقم السجل : ${data.recordNumber}`
              : `: رقم السجل`}{" "}
          </div>
          <div>
            {data.paperNumber
              ? ` رقم الصحيفة : ${data.paperNumber}`
              : `: رقم الصحيفة`}{" "}
          </div>
          <div>
            {data.classType ? ` الشريحة : ${data.classType}` : `: الشريحة`}{" "}
          </div>
          <div>
            {" "}
            {data.birthDate
              ? ` المواليد : ${data.birthDate?.slice(0, 10)}`
              : `: المواليد`}{" "}
          </div>
          <div>
            {" "}
            {data.birthPlace
              ? ` مسقط الراس : ${data.birthPlace}`
              : `: مسقط الراس`}
          </div>
          <div>
            {data.formNumber
              ? ` رقم الاستمارة : ${data.formNumber}`
              : `: رقم الاستمارة `}{" "}
          </div>
          <div> موقف المقدم : {data.beneficiary ? "مستفيد" : "غير مستفيد"}</div>
          {data.createdAt ? (
            <div>تاريخ الانشاء : {data.createdAt.slice(0, 10)}</div>
          ) : (
            <>تاريخ الانشاء : </>
          )}
          {props.fullName || props.husbandName ? (
            <button
              onClick={id ? handelPrint : handelClick}
              style={{ fontWeight: "bold" }}
            >
              {" "}
              {!id ? "طباعة + انشاء" : "طباعه"}
            </button>
          ) : (
            <button
              onClick={(e) => {
                data.number++;
                setNumber((p) => p + 1);
                setTimeout(() => {
                  handelPrint(e);
                  handelPrintNumber();
                }, 2000);
              }}
              style={{ fontWeight: "bold", width: "40%" }}
            >
              طباعة
            </button>
          )}
        </div>
      </div>
    </>
  );
};
