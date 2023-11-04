import React, { useEffect, useState } from "react";
import style from "./Logo.module.css";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { Nav } from "../Nav/Nav";
export const Logo = () => {
  const [logo, setLogo] = useState(null);
  const [file, setFile] = useState(null);
  const [len, setLen] = useState(null);
  useEffect(() => {
    let token = Cookies.get("auth");
    if (!token) window.location.replace("/");
    if (!jwtDecode(token).admin && !jwtDecode(token).role.includes("setting"))
      window.location.replace("/");
    const get = async () => {
      let res = await fetch(
        "http://localhost:8000/auth/logo",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${token}`,
          },
        }
      );
      if (res.status == 200) {
        res = await res.json();
        console.log(res);
        setLogo(res);
      }
      // res = await fetch("http://localhost:8000/form/numbers", {
      //   method: "GET",
      //   headers: {
      //     'Content-Type':'application/json',
      //     Authorization: `token ${token}`,
      //   },
      // })
      // if(res.status == 200){
      //   res = await res.json()
      //   setLen(res)
      // }
    };
    get();
  }, []);
  const handelSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.append("file", file);
    let token = Cookies.get("auth");
    let res = await fetch(
      "http://localhost:8000/auth/logo",
      {
        method: "POST",
        headers: {
          Authorization: `token ${token}`,
          mode: 'no-cors'
        },
        body: formdata,
      }
    );
    console.log(res);
    if (res.status == 200) {
      res = await res.json();
      setLogo(res);
    }
  };
  //if(!len) return <div className={style.loader}></div>
  return (
    <>
      <Nav name="العامه" number="000" />
      <div className={style.LOcontainer}>
        <div style={{ border: "1px solid white", borderRadius: "20px" }}>
          <h2>معلومات اساسية</h2>
          <hr style={{ width: "90%" }}></hr>
          <div className={style.flexx}>
            <div className={style.flexx1}>
              <img
                className={style.logo}
                src={
                  logo
                    ? logo
                    : "unknown_wm4koi.png"
                }
              ></img>
            </div>
            <form className={style.Form} onSubmit={handelSubmit}>
              <div>
                <h3>عدد الكتب المسجلة : {len}</h3>
              </div>
              <div style={{ marginTop: "30px" }}>
                <label>الشعار</label>
              </div>
              <input
                type="file"
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                required
              ></input>
              <button type="submit"> تحديث</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
