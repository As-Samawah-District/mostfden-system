import React, { useEffect, useState } from "react";
import style from "./EditForm.module.css";
import jwtDecode from "jwt-decode";
import Cookies from "js-cookie";
import { useParams } from "react-router-dom";
import { Nav } from "../Nav/Nav";
import { server_url } from "../../config";
export const EditForm = () => {
  let { id } = useParams();
  //let id = "6473cc4181abf05ca86eca2a";
  const [mydata, setMyData] = useState(null);
  const [address, setAdress] = useState([]);
  const [classes, setClass] = useState([]);
  const [data, setData] = useState({});
  const [nw, setNew] = useState(true);
  const [nw2, setNew2] = useState(true);
  const [num, setNum] = useState(0);
  useEffect(() => {
    let token = Cookies.get("auth");
    if (!token) window.location.replace("/");
    if (!jwtDecode(token).admin && !jwtDecode(token).role.includes("edit"))
      window.location.replace("/");
    let get = async () => {
      let res = await fetch(`${server_url}/form/${id}`, {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      });

      if (res.status == 200) {
        res = await res.json();
        setMyData(res);
        // console.log(res);
      }

      res = await fetch(`${server_url}/class/`, {
        method: "GET",
        headers: {
          Authorization: `token ${token}`,
        },
      });
      if (res.status == 200) {
        res = await res.json();
        let tmp = [],
          tmp2 = [];
        res.map((item) => {
          //   console.log(item);
          if (item.type == "address") tmp.push(item);
          else tmp2.push(item);
        });

        setAdress(tmp);
        setClass(tmp2);
      }
    };
    get();
  }, []);
  const handelSumbit = async (e) => {
    e.preventDefault();
    // console.log(data);
    const formdata = new FormData();
    for (const [key, value] of Object.entries(data)) {
      // console.log(key, value);
      formdata.append(key, value);
    }
    let token = Cookies.get("auth");
    let res = await fetch(`${server_url}/form/edit/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify(data),
    });
    console.log(res.status);
    if (res.status == 200) {
      res = await res.json();
      //   console.log(res);
      window.location.replace("/forms");
    } else {
      //   console.log(res);
      window.location.replace("/");
    }
  };
  if (!data || !mydata) return <div className={style.loader}></div>;
  // console.log(mydata)
  return (
    <>
      <Nav name="تعديل استماره" />
      <div className={style.Acontainer}>
        <form className={style.Form} onSubmit={handelSumbit}>
          <h1 style={{ marginTop: "50px" }}>تعديل استماره </h1>
          <label> الاسم الكامل</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, fullName: e.target.value });
            }}
            placeholder={mydata.fullName}
          ></input>
          <label> مسقط الراس</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, birthPlace: e.target.value });
            }}
            placeholder={mydata.birthPlace}
          ></input>
          <label> تاريخ الميلاد</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, birthDate: e.target.value });
            }}
            placeholder={mydata.birthDate}
          ></input>
          <label> الشريحة</label>
          <select
            type="text"
            onChange={(e) => {
              if (e.target.value == "new") setNew(true);
              else setNew(false);
              setData({ ...data, classType: e.target.value });
            }}
            placeholder={mydata.classType}
          >
            <option value="new" selected>
              {" "}
              جديد{" "}
            </option>
            {classes?.map((classs) => {
              return (
                <option value={classs.name} className={style.options}>
                  {classs.name}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, classType: e.target.value });
            }}
            placeholder={mydata.classType}
            style={{ display: nw ? "block" : "none" }}
          ></input>
          <label> اسم الام</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, motherName: e.target.value });
            }}
            placeholder={mydata.motherName}
          ></input>
          <label> اسم الزوج/الزوجه</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, husbandName: e.target.value });
            }}
            placeholder={mydata.husbandName}
          ></input>
          <label> رقم السجل </label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, recordNumber: e.target.value });
            }}
            placeholder={mydata.recordNumber}
          ></input>

          {/* <label> رقم الصحيفة</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, paperNumber: e.target.value });
            }}
            placeholder={mydata.paperNumber}
          ></input> */}
          <label> دائرة الاحوال</label>
          <select
            type="text"
            onChange={(e) => {
              if (e.target.value == "new") setNew2(true);
              else setNew2(false);
              setData({ ...data, department: e.target.value });
            }}
            placeholder={mydata.department}
          >
            <option value="new" selected>
              {" "}
              جديد{" "}
            </option>
            {address?.map((classs) => {
              return (
                <option value={classs.name} className={style.options}>
                  {classs.name}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, department: e.target.value });
            }}
            placeholder={mydata.department}
            style={{ display: nw2 ? "block" : "none" }}
          ></input>
          <label>تاريخ التخصيص</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, assignDate: e.target.value });
            }}
            placeholder={mydata.assignDate}
          ></input>
          <label> رقم المقاطعة</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, addressNubmer: e.target.value });
            }}
            placeholder={mydata.addressNubmer}
          ></input>
          <label> رقم القطعة</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, pieceNumber: e.target.value });
            }}
            placeholder={mydata.pieceNumber}
          ></input>
          <label> المساحة </label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, area: e.target.value });
            }}
            placeholder={mydata.area}
          ></input>
          {/*<label> تحميل ملف اكسيل </label>
        <input
          type="file"
          name="file"
          onChange={(e) => {
            setData({ ...data, file: e.target.files[0] });
          }}
        ></input> */}
          {/*<label> رقم الاستماره </label>
        <input type="text" placeholder={num} disabled></input>*/}
          <label> الملاحظه </label>
          <input
            type="text"
            placeholder={mydata.note ? mydata.note : ""}
            onChange={(e) => {
              setData({ ...data, note: e.target.value });
            }}
          ></input>
          <label>
            <div
              style={{
                width: "5rem",
                float: "right",
                display: "flex",
                justifyContent: "space-between",
                fontSize: "20px",
              }}
            >
              مستفيد
              <input
                type="checkbox"
                style={{ marginTop: "10px" }}
                onChange={(e) => {
                  setData({
                    ...data,
                    beneficiary: data.beneficiary ? false : true,
                  });
                }}
              />
            </div>
          </label>
          <button type="submit"> تعديل </button>
        </form>
      </div>
    </>
  );
};
