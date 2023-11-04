import React, { useEffect, useState } from "react";
import style from "./Nav.module.css";
import { SideBar } from "../SideBar/SideBar";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
export const Nav = (props) => {
  const[image,setImage] = useState(null)
  const[name ,setName] = useState(null)
  useEffect(()=>{
    let token = Cookies.get('auth')
    setImage(jwtDecode(token).image)
    setName(jwtDecode(token).name)
  },[])
  if(!image) return <></>
  return (
    <>
      {" "}
      <div className={style.container}>
        <SideBar />
        <div className={style.profile}>
          <img src={image} />
          <div style={{ margin: "auto" }}>
            <h4>{name} </h4>
            <h5 style={{ marginTop: "-10px" }}>
              <a
                style={{ marginLeft: "20px" }}
                onClick={() => {
                  Cookies.remove("auth");
                  window.location.replace("/");
                }}
              >
                {" "}
                تسجيل الخروج{"  "}
                <i className="fa fa-sign-out"></i>
              </a>
            </h5>
          </div>
        </div>

        <div className={style.middel}>
          <a
            className={style.whats}
            style={{ borderColor: "black" }}
            target="_wp"
            href="https://wa.me/17712204921"
          >
            <i className="fa fa-whatsapp" style={{ width: "25px" }}></i> الدعم{" "}
          </a>
          <div className={style.numbers}>العدد: {props.number}</div>
          <div
            className={style.numbers}
            style={{ width: "40px" }}
            onClick={() => {
              window.location.reload();
            }}
          >
            <i className="fa fa-refresh fa-spin"></i>
          </div>
        </div>
        <div
          className={style.numbers}
          style={{
            fontSize: "20px",
            fontWeight: "bolder",
            marginTop: "30px",
            marginRight: "7%",
          }}
        >
          {props.name}
        </div>
      </div>
    </>
  );
};
