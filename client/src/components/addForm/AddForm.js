import React, { useContext, useEffect, useState } from "react";
import style from "./AddForm.module.css";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { Nav } from "../Nav/Nav";
import axios from "axios";
import { Context } from "../../App";
import { server_url } from "../../config";
export const AddForm = (props) => {
  // console.log(props);
  const [data, setData] = useState({});
  const [adress, setAdress] = useState([]);
  const [classes, setClass] = useState([]);
  const [nw, setNew] = useState(true);
  const [nw2, setNew2] = useState(true);
  const [num, setNum] = useState(localStorage.getItem("num"));
  const [clk, setClk] = useState(false);

  useEffect(() => {
    let token = Cookies.get("auth");
    if (!token) window.location.replace("/");
    if (!jwtDecode(token).admin && !jwtDecode(token).role.includes("add"))
      window.location.replace("/");
    let get = async () => {
      let res = await fetch(`${server_url}/class/`, {
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
          // console.log(item);
          if (item.type == "address") tmp.push(item);
          else tmp2.push(item);
        });

        setAdress(tmp);
        setClass(tmp2);
      }
      // res = await fetch("https://adventurous-erin-long-johns.cyclic.app/form/ ", {
      //   method: "GET",
      //   headers: {
      //     Authorization: `token ${token}`,
      //   },
      // });
      // if (res.status == 200) {
      //   res = await res.json();
      //   console.log(res.length);
      //   if (res.length !== 0) setNum( parseInt( res[0].formNumber) );
      //   else {
      //     setNum(0);
      //   }
      // } else {
      //   console.log(res);
      // }
    };
    get();
  }, []);
  const handelSumbit = async (e) => {
    e.preventDefault();
    //console.log(data);
    setClk(true);

    if (Object.keys(data).length == 0) window.location.replace("/forms");
    const formdata = new FormData();
    for (const [key, value] of Object.entries(data)) {
      //  console.log(key, value);
      formdata.append(key, value);
    }
    formdata.append("formNumber", num + 1);
    let token = Cookies.get("auth");
    let res = await axios.post(
      `${server_url}/form/create`,
      formdata,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    // console.log(res.status);
    if (res.status == 200) {
      // console.log(res);
      window.location.replace("/forms");
    } else {
      // console.log(res);
      window.location.reload();
    }
  };
  return (
    <>
      <Nav name="اضافه استماره" number="000" />
      <div className={style.Acontainer}>
        <form className={style.Form} onSubmit={handelSumbit}>
          <h1 style={{ marginTop: "50px" }}>اضافه استماره جديده</h1>
          <label> الاسم الكامل</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, fullName: e.target.value });
            }}
            placeholder="الاسم الكامل"
          ></input>
          <label> اسم الام</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, motherName: e.target.value });
            }}
            placeholder="اسم الام"
          ></input>
          <label> رقم السجل </label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, recordNumber: e.target.value });
            }}
            placeholder="رقم السجل"
          ></input>
          <label> اسم الزوج/الزوجه</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, husbandName: e.target.value });
            }}
            placeholder=" اسم الزوج/الزوجه"
          ></input>
          <label> اسم الزوج/الزوجه</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, husbandName2: e.target.value });
            }}
            placeholder=" اسم الزوج/الزوجه"
          ></input>
          <label> مسقط الراس</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, birthPlace: e.target.value });
            }}
            placeholder="مسقط الراس"
          ></input>
          <label> تاريخ الميلاد</label>
          <input
            type="date"
            onChange={(e) => {
              setData({ ...data, birthDate: e.target.value });
            }}
          ></input>
          <label> دائرة الاحوال</label>
          <select
            type="text"
            onChange={(e) => {
              if (e.target.value == "new") setNew2(true);
              else setNew2(false);
              setData({ ...data, department: e.target.value });
            }}
            placeholder=" دائرة الاحوال"
          >
            <option value="new" selected>
              {" "}
              جديد{" "}
            </option>
            {adress?.map((classs) => {
              return (
                <option value={classs.name} className={style.options}>
                  {classs.name}
                </option>
              );
            })}
          </select>
          <label>تاريخ التخصيص</label>
          <input
            type="date"
            onChange={(e) => {
              setData({ ...data, assignDate: e.target.value });
            }}
            placeholder="تاريخ التخصيص"
          ></input>

          <label> الشريحة</label>
          <select
            type="text"
            onChange={(e) => {
              if (e.target.value == "new") setNew(true);
              else setNew(false);
              setData({ ...data, classType: e.target.value });
            }}
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

          <label> رقم الشريحه</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, classType: e.target.value });
            }}
            placeholder="الشريحه"
            style={{ display: nw ? "block" : "none" }}
          ></input>

          <label> رقم المقاطعة</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, addressNubmer: e.target.value });
            }}
            placeholder="رقم المقاطعه"
          ></input>
          <label> رقم القطعة</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, pieceNumber: e.target.value });
            }}
            placeholder="رقم القطعه"
          ></input>

          <label>دائره الاحوال </label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, department: e.target.value });
            }}
            placeholder="دائره الاحوال"
            style={{ display: nw2 ? "block" : "none" }}
          ></input>

          <label> رقم المحضر</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, paperNumber: e.target.value });
            }}
            placeholder="رقم المحضر"
          ></input>

          <label> المساحة </label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, area: e.target.value });
            }}
            placeholder="المساحه"
          ></input>
          <label> تحميل ملف اكسيل </label>
          <input
            type="file"
            name="file"
            onChange={(e) => {
              setData({ ...data, file: e.target.files[0] });
            }}
          />
          <label> الملاحظه </label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, note: e.target.value });
            }}
          ></input>
          <label> رقم الاستماره </label>
          <input type="text" placeholder={num * 1 + 1} disabled></input>

          <button type="submit" disabled={clk}>
            {clk ? "تحميل..." : "اضافه +"}{" "}
          </button>
        </form>
      </div>
    </>
  );
};
