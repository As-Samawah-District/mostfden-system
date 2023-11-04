import React, { useEffect, useState } from "react";
import style from "./Profile.module.css";
import { Modal } from "../modal/Modal";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useParams } from "react-router-dom";
import { Nav } from "../Nav/Nav";

export const Profile = () => {
  let { id } = useParams();
  let token = Cookies.get("auth");
  const [curUser, setCuser] = useState(null);
  const [user, setUser] = useState(null);
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
  const [clk, setclk] = useState(false);
  const [role, setRole] = useState([]);
  const [err, setErr] = useState(null);
  const [data, setData] = useState({});
  const handelClick = (e) => {
    let tmp = role;
    tmp = [...new Set(tmp)];

    if (e == "add") {
      if (Aclr != "#ffffff") {
        tmp = [...new Set(tmp)];
        setRole(tmp);
      } else {
        tmp = [...new Set(tmp)];
        tmp.splice(tmp.indexOf("add"), 1);
        setRole(tmp);
      }
      setAClr(Aclr == "#ffffff" ? "#0d6efd" : "#ffffff");
      setABclr(Abclr == "#ffffff" ? "#0d6efd" : "#ffffff");
    }
    if (e == "edit") {
      if (Eclr != "#ffffff") {
        tmp = [...new Set(tmp)];
        tmp.push("edit");
        setRole(tmp);
      } else {
        tmp = [...new Set(tmp)];
        tmp.splice(tmp.indexOf("edit"), 1);
        setRole(tmp);
      }
      setEClr(Eclr == "#ffffff" ? "#0d6efd" : "#ffffff");
      setEBclr(Ebclr == "#ffffff" ? "#0d6efd" : "#ffffff");
    }
    if (e == "archive") {
      if (Pclr != "#ffffff") {
        tmp = [...new Set(tmp)];
        tmp.push("archive");
        setRole(tmp);
      } else {
        tmp = [...new Set(tmp)];
        tmp.splice(tmp.indexOf("archive"), 1);
        setRole(tmp);
      }
      setPClr(Pclr == "#ffffff" ? "#0d6efd" : "#ffffff");
      setPBclr(Pbclr == "#ffffff" ? "#0d6efd" : "#ffffff");
    }
    if (e == "setting") {
      if (Sclr != "#ffffff") {
        tmp = [...new Set(tmp)];
        tmp.push("setting");
        setRole(tmp);
      } else {
        tmp.splice(tmp.indexOf("setting"), 1);
        setRole(tmp);
      }
      setSClr(Sclr == "#ffffff" ? "#0d6efd" : "#ffffff");
      setSBclr(Sbclr == "#ffffff" ? "#0d6efd" : "#ffffff");
    }
    if (e == "delete") {
      if (Dclr != "#ffffff") {
        tmp = [...new Set(tmp)];
        tmp.push("delete");
        setRole(tmp);
      } else {
        tmp.splice(tmp.indexOf("delete"), 1);
        setRole(tmp);
      }
      setDClr(Dclr == "#ffffff" ? "#0d6efd" : "#ffffff");
      setDBclr(Dbclr == "#ffffff" ? "#0d6efd" : "#ffffff");
    }
    setRole([...new Set(tmp)]);
  };
  useEffect(() => {
    if (!token) window.location.replace("/");
    setCuser(jwt_decode(token));
    if (!jwt_decode(token).admin && !jwt_decode(token).role.includes("setting"))
      window.location.replace("/");

    const get = async () => {
      let res = await fetch(`http://localhost:8000/auth/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `token ${token}`,
        },
      });

      if (res.status == 200) {
        res = await res.json();
        console.log(res);
        if (res.admin && !jwt_decode(token).admin) window.location.replace("/");
        setUser(res);
        let tmp = role;
        if (res.role.includes("setting")) {
          tmp.push("setting");
          setRole(tmp);
          setSClr("#ffffff");
          setSBclr("#0d6efd");
        }
        if (res.role.includes("add")) {
          tmp.push("add");
          setRole(tmp);
          setAClr("#ffffff");
          setABclr("#0d6efd");
        }
        if (res.role.includes("archive")) {
          tmp.push("archive");
          setRole(tmp);
          setPClr("#ffffff");
          setPBclr("#0d6efd");
        }
        if (res.role.includes("edit")) {
          tmp.push("edit");
          setRole(tmp);
          setEClr("#ffffff");
          setEBclr("#0d6efd");
        }
        if (res.role.includes("delete")) {
          tmp.push("delete");
          setRole(tmp);
          setDClr("#ffffff");
          setDBclr("#0d6efd");
        }
      }
    };
    get();
  }, []);
  const handelSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    let token = Cookies.get("auth");
    const formdata = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formdata.append(key, value);
    }
    let tmp = role;
    setRole([...new Set(tmp)]);
    formdata.append("role", role);
    try {
      let res = await fetch(`http://localhost:8000/auth/edit/${id}`, {
        method: "POST",
        headers: {
          authorization: `token ${token}`,
        },
        body: formdata,
      });
      if (res.status == 200) {
        token = await res.json();
        if (curUser._id == id) Cookies.set("auth", token.token);
        window.location.reload();
      } else {
        res = await res.json();
        setErr(res);
      }
    } catch (er) {
      setErr(er);
    }
  };

  if (!user || !curUser) return <div className={style.loader}></div>;
  return (
    <>
      {" "}
      <Nav name={`الموظف : ${user.name}`} number="000" />
      <div className={style.Pcontainer}>
        <div
          className={style.cont}
          style={{ border: "1px solid white", borderRadius: "20px" }}
        >
          <div
            className={style.tmp}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <h2> {user.name} </h2>
            <i
              className="fa fa-trash"
              style={{ margin: "auto" }}
              onClick={() => {
                setclk(true);
              }}
            />
          </div>
          <hr style={{ width: "90%" }}></hr>
          <div style={{ margin: "auto" }}>
            <img
              src={
                user.image
                  ? user.image
                  : "unknown_wm4koi.png"
              }
            ></img>
          </div>
          {curUser.admin || curUser.role.includes("setting") ? (
            <>
              <h3
                style={{
                  margin: "auto",
                  borderRadius: "20px",
                  padding: "10px 20px",
                  boxShadow: "rgba(0, 0, 0, 0.4) 0px 0px 11px 2px",
                  marginBottom: "20px",
                  color: "#0d6efd",
                }}
              >
                الصلاحيات
              </h3>
              <div className={style.btns}>
                <button
                  style={{ backgroundColor: Pbclr, color: Pclr }}
                  onClick={() => handelClick("archive")}
                >
                  <div>
                    <label>
                      <i className="fa fa-archive"></i>
                    </label>
                    <div>الارشيف</div>
                  </div>
                </button>
                <button
                  style={{ backgroundColor: Ebclr, color: Eclr }}
                  onClick={() => handelClick("edit")}
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
                  onClick={() => handelClick("add")}
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
            </>
          ) : (
            <></>
          )}
          <form className={style.Form} onSubmit={handelSubmit}>
            <div className={style.lebl}> الاسم </div>

            <input
              type="text"
              placeholder={user.name}
              onChange={(e) => {
                setData({ ...data, name: e.target.value });
              }}
            ></input>
            <div className={style.lebl}> الاسم الكامل</div>

            <input
              type="text"
              placeholder={user.fullName}
              onChange={(e) => {
                setData({ ...data, fullName: e.target.value });
              }}
            ></input>
            <div className={style.lebl}> رقم الهاتف</div>

            <input
              type="text"
              placeholder={user.phone}
              onChange={(e) => {
                setData({ ...data, phone: e.target.value });
              }}
            ></input>
            <div className={style.lebl}> الرمز الجديد</div>

            <input
              type="password"
              onChange={(e) => {
                setData({ ...data, password: e.target.value });
              }}
            ></input>
            <div className={style.lebl}> المسمي الوظيفي</div>

            <input
              type="text"
              placeholder={user.jobTittle}
              onChange={(e) => {
                setData({ ...data, jobTittle: e.target.value });
              }}
            ></input>
            <div className={style.lebl}>الصورة الشخصية</div>
            <input
              type="file"
              onChange={(e) => {
                setData({ ...data, file: e.target.files[0] });
              }}
            ></input>
            {err ? (
              <h4 style={{ color: "red", margin: "auto" }}>{err}</h4>
            ) : (
              <></>
            )}
            <button type="submit">تحديث</button>
          </form>
        </div>
        {clk ? <Modal setclk={setclk} id={user._id} /> : <></>}
      </div>
    </>
  );
};
