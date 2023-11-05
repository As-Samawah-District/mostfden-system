import React, { useEffect, useState } from "react";
import style from "./Class.module.css";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { Nav } from "../Nav/Nav";
import { server_url } from "../../config";
const Class = () => {
  const [data, setData] = useState(null);
  const [data2, setData2] = useState(null);
  const [Name, setName] = useState(null);
  useEffect(() => {
    let token = Cookies.get("auth");
    if (!token) window.location.replace("/");
    //console.log(jwtDecode(token).admin);
    if (!jwtDecode(token).admin && !jwtDecode(token).role.includes("setting"))
      window.location.replace("/");
    const get = async () => {
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
          //  console.log(item);
          if (item.type == "address") tmp.push(item);
          else tmp2.push(item);
        });
        setData(tmp);
        setData2(tmp2);
      } else {
        window.location.replace("/");
      }
    };
    get();
  }, []);
  const handelDelete = async (id) => {
    let token = Cookies.get("auth");
    // console.log(id);
    let res = await fetch(`${server_url}/class/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
    });
    if (res.status == 200) {
      window.location.reload();
    } else {
      window.location.replace("/");
    }
  };
  const handelAdd = async (e) => {
    e.preventDefault();
    // console.log(Name);
    let token = Cookies.get("auth");
    //  console.log(token);
    let res = await fetch(`${server_url}/class/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify({
        name: Name,
        type: "address",
      }),
    });
    if (res.status == 200) {
      window.location.reload();
    } else {
      window.location.replace("/");
    }
  };
  const handelAdd2 = async (e) => {
    e.preventDefault();
    // console.log(Name);
    let token = Cookies.get("auth");
    // console.log(token);
    let res = await fetch(`${server_url}/class/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify({
        name: Name,
        type: "classType",
      }),
    });
    if (res.status == 200) {
      window.location.reload();
    } else {
      window.location.replace("/");
    }
  };
  if (!data) return <div className={style.loader}></div>;
  return (
    <>
      <Nav name="التصنيفات" number="000" />
      <div className={style.Ccontainer} style={{ paddingBottom: "30px" }}>
        <div style={{ border: "1px solid white", borderRadius: "20px" }}>
          <h2>دائره الاحوال</h2>
          <hr
            style={{ width: "90%", margin: "auto", marginBottom: "20px" }}
          ></hr>
          <div className={style.btn}>
            <form onSubmit={handelAdd}>
              <button type="submit">اضافه+ </button>
              <input
                type="text"
                placeholder="الاسم"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            </form>
          </div>
          <div className={style.girdTable}>
            <div className={style.girdItem}>الاجراء </div>
            <div className={style.girdItem} style={{ textAlign: "right" }}>
              الاسم{" "}
            </div>
            <div className={style.girdItem} style={{ textAlign: "right" }}>
              #
            </div>
          </div>
          {data.map((item, index) => {
            if (item.type == "address")
              return (
                <>
                  <div className={style.girdTable2}>
                    <div
                      className={style.girdItem2}
                      onClick={() => handelDelete(item._id)}
                    >
                      <i
                        className="fa fa-trash"
                        style={{ fontSize: "1.2rem", cursor: "pointer" }}
                      ></i>
                    </div>
                    <div
                      className={style.girdItem2}
                      style={{ textAlign: "right" }}
                    >
                      {" "}
                      {item.name}
                    </div>
                    <div
                      className={style.girdItem2}
                      style={{ textAlign: "right" }}
                    >
                      {" "}
                      {index + 1}
                    </div>
                  </div>
                  <hr style={{ width: "90%" }}></hr>
                </>
              );
          })}
          {/* **** */}
        </div>
      </div>
      <div className={style.Ccontainer} style={{ paddingBottom: "30px" }}>
        <div style={{ border: "1px solid white", borderRadius: "20px" }}>
          <h2> شريحه</h2>
          <hr
            style={{ width: "90%", margin: "auto", marginBottom: "20px" }}
          ></hr>
          <div className={style.btn}>
            <form onSubmit={handelAdd2}>
              <button type="submit">اضافه+ </button>
              <input
                type="text"
                placeholder="الاسم"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
            </form>
          </div>
          <div className={style.girdTable}>
            <div className={style.girdItem}>الاجراء </div>
            <div className={style.girdItem} style={{ textAlign: "right" }}>
              الاسم{" "}
            </div>
            <div className={style.girdItem} style={{ textAlign: "right" }}>
              #
            </div>
          </div>
          {data2.map((item, index) => {
            if (item.type != "address")
              return (
                <>
                  <div className={style.girdTable2}>
                    <div
                      className={style.girdItem2}
                      onClick={() => handelDelete(item._id)}
                    >
                      <i
                        className="fa fa-trash"
                        style={{ fontSize: "1.2rem", cursor: "pointer" }}
                      ></i>
                    </div>
                    <div
                      className={style.girdItem2}
                      style={{ textAlign: "right" }}
                    >
                      {" "}
                      {item.name}
                    </div>
                    <div
                      className={style.girdItem2}
                      style={{ textAlign: "right" }}
                    >
                      {" "}
                      {index + 1}
                    </div>
                  </div>
                  <hr style={{ width: "90%" }}></hr>
                </>
              );
          })}
          {/* **** */}
        </div>
      </div>
    </>
  );
};

export default Class;
