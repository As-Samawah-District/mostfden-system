import React, { useEffect, useState } from "react";
import style from "./LoginNotUsed.module.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { server_url } from "../../config";

const Login = () => {
  useEffect(() => {
    let token = Cookies.get("auth");
    if (token) window.location.replace("/forms");
  }, []);

  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [err, setErro] = useState(null);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    //`${server_url}
    let res = await fetch(`${server_url}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    });
    // console.log(res.status);
    let token = await res.json();
    if (res.status == 200) {
      // console.log(token.token);
      Cookies.set("auth", token.token);
      window.location.replace("/forms");
    } else {
      setErro("الاسم او الرقم السري خطأ");
      //     console.log(res.data);
      //  window.location.reload()
    }
  };
  
  return (
    <div style={{ margin: "0px" }}>
      {/* right side */}
      <div className={style.right}>
        <div
          style={{
            display: "flex",
            justifyContent: "right",
          }}
        >
          <div className={style.description}>
            <h4>مدير بلدية السماوة</h4>
            <h6 className={style.H6}>وحدة نظم المعلومات</h6>
          </div>
          <img
            className={style.logo}
            src="1698956106609-image-525acf9e29b89e9cdea769d5d8c0ef1b8720823e.png"
            alt="stateImage"
          ></img>
        </div>
        <a
          target="_wp"
          href="https://wa.me/17712204921"
          className={style.whats}
        >
          <div>التواصل مع الدعم</div>
          <div>
            <i className="fa fa-whatsapp" style={{ width: "25px" }}></i>{" "}
            +1&nbsp;(771)&nbsp;220‑4921
          </div>
        </a>
      </div>

      {/* middel & login page */}
      <div className={style.middel}>
        <img src="erp_xeqat5.png" className={style.image3} alt="loginImage" />
        <form className={style.rightM} onSubmit={handelSubmit}>
          <img src="lock_vxwiql.png" alt="" />
          <h4>!اهلا بك من جديد</h4>
          <input
            type="text"
            className={style.inputform}
            placeholder="الحساب"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          ></input>
          <input
            type="password"
            className={style.inputform}
            placeholder="الرمز السري"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            style={{ marginTop: "10px" }}
          ></input>
          {err && (
            <p
              style={{
                color: "red",
                marginLeft: "auto",
                marginRight: "auto",
                fontSize: "12px",
              }}
            >
              {err}
            </p>
          )}
          <button type="submit" style={{ marginTop: err ? "0px" : "12px" }}>
            تسجيل الدخول
          </button>
        </form>
      </div>

      {/* phone */}
      <div className={style.container}>

        <form className={style.secondForm} onSubmit={handelSubmit}>
          <img src="lock_vxwiql.png" alt="lockImage" />
          <h4>!اهلا بك من جديد</h4>
          <input
            type="text"
            className={style.inputform}
            placeholder="الاسم"
            onChange={(e) => {
              setName(e.target.value);
            }}
            required
          ></input>
          <input
            type="password"
            className={style.inputform}
            placeholder="الرمز السري"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
            style={{ marginTop: "10px" }}
          ></input>
          
          {err && (
            <p
              style={{ color: "red", marginLeft: "auto", marginRight: "auto" }}
            >
              {err}
            </p>
          )}

          <button type="submit">تسجيل الدخول</button>
        </form>


        <a
            target="_wp"
            href="https://wa.me/17712204921"
            className={style.whats}
          >
            <div>التواصل مع الدعم</div>
            <div>
              <i className="fa fa-whatsapp" style={{ width: "25px" }}></i>{" "}
              +1&nbsp;(771)&nbsp;220‑4921
            </div>
          </a>

      </div>
      
    </div>
  );
};

export default Login;
