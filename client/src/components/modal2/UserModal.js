import React, { useState } from "react";
import style from "./UserModal.module.css";
import Cookies from "js-cookie";
import { server_url } from "../../config";

export const UserModal = (props) => {
  const [Dbclr, setDBclr] = useState("#ffffff");
  const [Dclr, setDClr] = useState("#0d6efd");
  const [Pbclr, setPBclr] = useState("#ffffff");
  const [Pclr, setPClr] = useState("#0d6efd");
  const [Ebclr, setEBclr] = useState("#ffffff");
  const [Eclr, setEClr] = useState("#0d6efd");
  const [Abclr, setABclr] = useState("#ffffff");
  const [Aclr, setAClr] = useState("#0d6efd");
  const [Sbclr, setSBclr] = useState("#ffffff");
  const [Sclr, setSClr] = useState("#0d6efd");
  const [data, setData] = useState({});
  const [role, setRole] = useState([]);
  const [err, setErr] = useState(null);
  const handelClick = (e) => {
    if (e == "delete") {
      if (Dclr != "#ffffff") {
        let tmp = role;
        role.push("delete");
        setRole(tmp);
      } else {
        let tmp = role;
        tmp.splice(role.indexOf("delete"), 1);
        setRole(tmp);
      }
      setDClr(Dclr == "#ffffff" ? "#0d6efd" : "#ffffff");
      setDBclr(Dbclr == "#ffffff" ? "#0d6efd" : "#ffffff");
    }
    if (e == "add") {
      if (Aclr != "#ffffff") {
        let tmp = role;
        tmp.push("add");
        setRole(tmp);
      } else {
        let tmp = role;
        tmp.splice(role.indexOf("add"), 1);
        setRole(tmp);
      }
      setAClr(Aclr == "#ffffff" ? "#0d6efd" : "#ffffff");
      setABclr(Abclr == "#ffffff" ? "#0d6efd" : "#ffffff");
    }
    if (e == "edit") {
      if (Eclr != "#ffffff") {
        let tmp = role;
        tmp.push("edit");
        setRole(tmp);
      } else {
        let tmp = role;
        tmp.splice(role.indexOf("edit"), 1);
        setRole(tmp);
      }
      setEClr(Eclr == "#ffffff" ? "#0d6efd" : "#ffffff");
      setEBclr(Ebclr == "#ffffff" ? "#0d6efd" : "#ffffff");
    }
    if (e == "print") {
      if (Pclr != "#ffffff") {
        let tmp = role;
        tmp.push("print");
        setRole(tmp);
      } else {
        let tmp = role;
        tmp.splice(role.indexOf("print"), 1);
        setRole(tmp);
      }
      setPClr(Pclr == "#ffffff" ? "#0d6efd" : "#ffffff");
      setPBclr(Pbclr == "#ffffff" ? "#0d6efd" : "#ffffff");
    }
    if (e == "setting") {
      if (Sclr != "#ffffff") {
        let tmp = role;
        tmp.push("setting");
        setRole(tmp);
      } else {
        let tmp = role;
        tmp.splice(role.indexOf("setting"), 1);
        setRole(tmp);
      }
      setSClr(Sclr == "#ffffff" ? "#0d6efd" : "#ffffff");
      setSBclr(Sbclr == "#ffffff" ? "#0d6efd" : "#ffffff");
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    const formdata = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formdata.append(key, value);
    }
    formdata.append("role", role);
    let token = Cookies.get("auth");
    try {
      let res = await fetch(`${server_url}/auth/signup`, {
        method: "POST",
        body: formdata,
        headers: {
          Authorization: `token ${token}`,
        },
      });
      if (res.status == 200) {
        window.location.replace("/users");
      } else {
        res = await res.json();
        setErr(res);
      }
    } catch (er) {
      setErr(er);
    }
  };
  return (
    <div>
      <div className={style.test}>
        <form className={style.content} onSubmit={handelSubmit}>
          <h3>
            <button
              onClick={() => {
                props.setClk(false);
              }}
            >
              X
            </button>{" "}
            اضافة موظف جديد
          </h3>
          <label>الاسم</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
            }}
            required
          ></input>

          <label> الرمز السري</label>
          <input
            type="password"
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
            }}
            required
          ></input>

          <label> الاسم الكامل</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, fullName: e.target.value });
            }}
            required
          ></input>

          <label> رقم الهاتف</label>
          <input
            type="text"
            onChange={(e) => {
              setData({ ...data, phone: e.target.value });
            }}
          ></input>

          {/* <label> الايميل</label>
          <input
            type="email"
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
            }}
          ></input> */}
          <label>الصورة الشخصية </label>
          <input
            type="file"
            onChange={(e) => {
              setData({ ...data, file: e.target.files[0] });
            }}
          ></input>
          <label>الصلاحيات</label>
          <div className={style.btns}>
            <button
              style={{ backgroundColor: Pbclr, color: Pclr }}
              onClick={(e) => {
                e.preventDefault();
                handelClick("print");
              }}
            >
              <div>
                <label>
                  <i className="fa fa-print"></i>
                </label>
                <div>طباعه</div>
              </div>
            </button>
            <button
              style={{ backgroundColor: Ebclr, color: Eclr }}
              onClick={(e) => {
                e.preventDefault();
                handelClick("edit");
              }}
            >
              <div>
                <label>
                  <i className="fa fa-edit"></i>
                </label>
                <div>تعديل</div>
              </div>
            </button>
            <button
              style={{ backgroundColor: Abclr, color: Aclr }}
              name="add"
              onClick={(e) => {
                e.preventDefault();
                handelClick("add");
              }}
            >
              <div>
                <label>
                  <i className="fa fa-plus"></i>
                </label>
                <div>اضافه</div>
              </div>
            </button>
            <button
              style={{ backgroundColor: Dbclr, color: Dclr }}
              value="delete"
              onClick={(e) => {
                e.preventDefault();
                handelClick("delete");
              }}
            >
              <div>
                <label>
                  <i className="fa fa-trash"></i>
                </label>
                <div>حذف</div>
              </div>
            </button>
            <button
              style={{ backgroundColor: Sbclr, color: Sclr }}
              value="setting"
              onClick={(e) => {
                e.preventDefault();
                handelClick("setting");
              }}
            >
              <div>
                <label>
                  <i className="fa fa-gear"></i>
                </label>
                <div>الاعدادات</div>
              </div>
            </button>
          </div>
          {err ? (
            <div style={{ color: "red", margin: "auto" }}>{err}</div>
          ) : (
            <></>
          )}
          <button type="submit">تسجيل</button>
        </form>
      </div>
    </div>
  );
};
