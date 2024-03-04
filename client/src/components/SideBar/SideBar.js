import React, { useEffect, useState } from "react";
import style from "./SideBar.module.css";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
export const SideBar = () => {
  const [user, setUser] = useState(null);
  const [show, setShow] = useState(false);
  const [width, setWidth] = useState("60px");
  const [marginTop, setMarginTop] = useState("200px");
  const [hide, setHide] = useState("none");
  const handelclick = () => {
    setShow(!show);
    setMarginTop(marginTop === "200px" ? "50px" : "200px");
  };
  const handelWidht = () => {
    setWidth(width === "210px" ? "60px" : "210px");
    setHide(hide === "inline" ? "none" : "inline");
  };

  const handleMouseLeave = () => {
    setWidth(width === "210px" ? "60px" : "60px");
    setHide(hide === "inline" ? "none" : "none");
  };
  useEffect(() => {
    let token = Cookies.get("auth");
    if (!token) window.location.replace("/");
    setUser(jwtDecode(token));
  }, []);
  if (!user) return <></>;
  return (
    <div
      className={style.Scontainer}
      style={{ width: width, marginTop: marginTop, overflowY: "auto" }}
      // onMouseEnter={handelWidht}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={style.section}
        style={{ borderTopLeftRadius: "20px" }}
        onClick={handelWidht}
      >
        <i
          className="fa fa-angle-double-right"
          style={{
            color: "white",
            fontSize: "30px",
            marginRight: "40%",
            padding: "10px 0px 10px 0px",
          }}
        ></i>
      </div>

      {(user.admin ||
        user.role.includes("add") ||
        user.role.includes("edit")) && (
        <Link
          className={style.section}
          to="/forms"
          style={{ textDecoration: "none" }}
        >
          <h1 style={{ color: "white", fontSize: "20px" }}>
            <b style={{ marginRight: "20px", display: hide }}>المستفيدين</b>
            <i
              className="fa fa-book"
              style={{
                color: "white",
                fontSize: "20px",
                marginRight: "20px",
              }}
            ></i>
          </h1>
        </Link>
      )}
      {(user.admin ||
        user.role.includes("add") ||
        user.role.includes("edit")) && (
        <Link
          className={style.section}
          to="/temporaryforms"
          style={{ textDecoration: "none" }}
        >
          <h1 style={{ color: "white", fontSize: "20px" }}>
            <b style={{ marginRight: "20px", display: hide }}>غير المستفيدين</b>
            <i
              className="fa fa-book"
              style={{
                color: "white",
                fontSize: "20px",
                marginRight: "20px",
              }}
            ></i>
          </h1>
        </Link>
      )}

      {(user.admin ||
        user.role.includes("add") ||
        user.role.includes("edit") ||
        user.role.includes("setting")) && (
        <Link
          className={style.section}
          to="/pendingPage"
          style={{ textDecoration: "NONE" }}
        >
          <h1 style={{ color: "white", fontSize: "20px" }}>
            <b style={{ marginRight: "20px", display: hide }}>المصادقه</b>
            <i
              className="fa fa-regular fa-thumbs-up"
              style={{ fontSize: "20px", marginRight: "17px" }}
            ></i>
          </h1>
        </Link>
      )}

      {(user.admin || user.role.includes("add")) && (
        <>
          <Link
            className={style.section}
            to="/form/search"
            style={{ textDecoration: "NONE" }}
          >
            <h1 style={{ color: "white", fontSize: "20px" }}>
              <b style={{ marginRight: "20px", display: hide }}>
                اضافه استماره
              </b>
              <i
                className="fa fa-plus"
                style={{
                  color: "white",
                  fontSize: "20px",
                  marginRight: "20px",
                }}
              ></i>
            </h1>
          </Link>
        </>
      )}

      {(user.admin ||
        user.role.includes("add") ||
        user.role.includes("edit") ||
        user.role.includes("setting")) && (
        <Link
          className={style.section}
          to="/logs"
          style={{ textDecoration: "NONE" }}
        >
          <h1 style={{ color: "white", fontSize: "20px" }}>
            <b style={{ marginRight: "20px", display: hide }}>
              العمليات السابقة
            </b>
            <i
              className="fa fa-history"
              style={{
                color: "white",
                fontSize: "20px",
                marginRight: "20px",
              }}
            ></i>
          </h1>
        </Link>
      )}

      {
        <>
          <a className={style.setting} onClick={handelclick}>
            <i
              className="fa fa-angle-down"
              style={{
                fontSize: "20px",
                color: "white",
                marginRight: "20%",
                marginTop: "0.5rem",
                display: hide,
              }}
            ></i>
            <h1 style={{ color: "white", fontSize: "20px", marginTop: "0.5rem" }}>
              <b style={{ marginRight: "20px", display: hide }}>الاعدادات</b>
              <i
                className="fa fa-gear fa-spin"
                style={{ fontSize: "20px", marginRight: "15px" }}
              ></i>
            </h1>
          </a>
          <div
            className={style.dropdown}
            style={{
              backgroundColor: "white",
              display: show ? "block" : "none",
            }}
          >
            {(user.admin ||
              user.role.includes("add") ||
              user.role.includes("edit") ||
              user.role.includes("setting")) && (
              <Link
                className={style.section}
                to="/classes"
                style={{ textDecoration: "NONE" }}
              >
                <h1 style={{ color: "white", fontSize: "20px" }}>
                  <b style={{ marginRight: "20px", display: hide }}>تصنيفات</b>
                  <i
                    className="fa fa-check-square"
                    style={{ fontSize: "20px", marginRight: "17px" }}
                  ></i>
                </h1>
              </Link>
            )}

            {(user.admin ||
              user.role.includes("add") ||
              user.role.includes("edit") ||
              user.role.includes("setting")) && (
              <Link
                className={style.section}
                to="/users"
                style={{ textDecoration: "NONE" }}
              >
                <h1 style={{ color: "white", fontSize: "20px" }}>
                  <b style={{ marginRight: "20px", display: hide }}>الموظفين</b>
                  <i
                    className="fa fa-users"
                    style={{ fontSize: "20px", marginRight: "17px" }}
                  ></i>
                </h1>
              </Link>
            )}

            {(user.admin ||
              user.role.includes("add") ||
              user.role.includes("edit") ||
              user.role.includes("setting")) && (
              <Link
                className={style.section}
                to="/logo"
                style={{ textDecoration: "NONE" }}
              >
                <h1 style={{ color: "white", fontSize: "20px" }}>
                  <b style={{ marginRight: "20px", display: hide }}>العامه</b>
                  <i
                    className="fa fa-columns"
                    style={{ fontSize: "20px", marginRight: "17px" }}
                  ></i>
                </h1>
              </Link>
            )}

            {(user.admin ||
              user.role.includes("add") ||
              user.role.includes("edit") ||
              user.role.includes("setting")) && (
              <Link
                className={style.section}
                to="/smv-database"
                style={{ textDecoration: "NONE" }}
              >
                <h1 style={{ color: "white", fontSize: "20px" }}>
                  <b style={{ marginRight: "20px", display: hide }}>
                    قاعده البيانات
                  </b>

                  <i
                    className="fa fa-database"
                    style={{
                      color: "white",
                      fontSize: "20px",
                      marginRight: "20px",
                    }}
                  ></i>
                </h1>
              </Link>
            )}

            {(user.admin ||
              user.role.includes("add") ||
              user.role.includes("edit") ||
              user.role.includes("setting")) && (
              <Link
                className={style.section}
                to="/smv-archive"
                style={{ textDecoration: "NONE" }}
              >
                <h1 style={{ color: "white", fontSize: "20px" }}>
                  <b style={{ marginRight: "20px", display: hide }}>
                    تحميل الارشيف
                  </b>

                  <i
                    className="fa fa-archive"
                    style={{
                      color: "white",
                      fontSize: "20px",
                      marginRight: "20px",
                    }}
                  ></i>
                </h1>
              </Link>
            )}
            {
              <Link
                className={style.section}
                to="/archive"
                style={{ textDecoration: "NONE" }}
              >
                <h1 style={{ color: "white", fontSize: "20px" }}>
                  <b style={{ marginRight: "20px", display: hide }}>الارشيف</b>

                  <i
                    className="fa fa-archive"
                    style={{
                      color: "white",
                      fontSize: "20px",
                      marginRight: "20px",
                    }}
                  ></i>
                </h1>
              </Link>
            }

            <Link
              className={style.section}
              to="/NewBook"
              style={{ textDecoration: "NONE" }}
            >
              <h1 style={{ color: "white", fontSize: "20px" }}>
                <b style={{ marginRight: "20px", display: hide }}>
                  بيان عدم استفاده
                </b>

                <i
                  className="fa fa-print"
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginRight: "20px",
                  }}
                ></i>
              </h1>
            </Link>
            <Link
              className={style.section}
              to="/National"
              style={{ textDecoration: "NONE" }}
            >
              <h1 style={{ color: "white", fontSize: "20px" }}>
                <b style={{ marginRight: "20px", display: hide }}>
                  قيد الالكترونيه
                </b>

                <i
                  className="fa fa-print"
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginRight: "20px",
                  }}
                ></i>
              </h1>
            </Link>
            <Link
              className={style.section}
              to="/estifada"
              style={{ textDecoration: "NONE" }}
            >
              <h1 style={{ color: "white", fontSize: "20px" }}>
                <b style={{ marginRight: "20px", display: hide }}>
                  بيان استفاده
                </b>

                <i
                  className="fa fa-print"
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginRight: "20px",
                  }}
                ></i>
              </h1>
            </Link>

            <Link
              className={style.section}
              to="/tashier"
              style={{ textDecoration: "NONE" }}
            >
              <h1 style={{ color: "white", fontSize: "20px" }}>
                <b style={{ marginRight: "20px", display: hide }}>بيان تأشير</b>

                <i
                  className="fa fa-print"
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginRight: "20px",
                  }}
                ></i>
              </h1>
            </Link>
          </div>
        </>
      }
    </div>
  );
};
