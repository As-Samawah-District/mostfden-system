import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import style from "./archive.module.css";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { Nav } from "../Nav/Nav";
import { server_url } from "../../config";

export default function Archive() {
  const [data, setData] = useState({});
  const [user, setUser] = useState(null);
  const [myData, setMyData] = useState(null);
  const [search, setSearch] = useState(null);
  useEffect(() => {
    let token = Cookies.get("auth");
    if (!token ) window.location.replace("/");
    setUser(jwtDecode(token));
    const getData = async () => {
      
      let res = await fetch(`${server_url}/archive/getAll`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      if (res.status == 200) {
        res = await res.json();
        setMyData(res);
      }
    };
    getData();
  }, []);
  const handelSubmit = async (e) => {
    const formdata = new FormData();
    for (const [key, value] of Object.entries(data)) {
      formdata.append(key, value);
    }

    let token = Cookies.get("auth");
    let res = await fetch(`${server_url}/archive/add`, {
      method: "POST",
      headers: {
        Authorization: `token ${token}`,
        mode: "no-cors",
      },
      body: formdata,
    });
    if (res.status == 200) window.location.reload();
  };
  const handelSearch = async (e) => {
    e.preventDefault();
    console.log(search);
    let token = Cookies.get("auth");
    let res = await fetch(`${server_url}/archive/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      },
      body: JSON.stringify({ search }),
    });
    if (res.status == 200) {
      res = await res.json();
      setMyData(res);
    }
  };
  return (
    <>
      <div className={style.topContainer}>
        <div className={style.leftSide}>
          <i>
            <h2 className={style.title}>الأرشيف</h2>
          </i>
          <form className={style.frm}>
            <input
              type="text"
              placeholder="...بحث"
              className={style.serch}
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            ></input>
            <button onClick={handelSearch}>
              <i class="fa fa-search"></i>
            </button>
          </form>
          <div className={style.photos}>
            {myData &&
              myData.map((item, index) => {
                return (
                  <div className={style.card} key={index}>
                    <img src={item.image}></img>
                    <div className={style.body}>{item.region}</div>
                    <button type="button" onClick={()=>{
                      window.location.replace(`/archive/${item._id}`)
                    }}>عرض</button>
                  </div>
                );
              })}
          </div>
        </div>

        <div className={style.Scontainer}>
          <h3 className={style.title}>البيانات</h3>
          <label> الدائره الصادر منها الكتاب</label>
          <input
            type="text"
            style={{
              padding: "8px",
              borderRadius: "5px",
              fontSize: "18px",
              textAlign: "right",
            }}
            onChange={(e) => {
              setData({ ...data, region: e.target.value });
            }}
          ></input>
          <label>العدد </label>
          <input
            type="text"
            style={{
              padding: "8px",
              borderRadius: "5px",
              fontSize: "18px",
              textAlign: "right",
            }}
            onChange={(e) => {
              setData({ ...data, number: e.target.value });
            }}
          ></input>
          
          <label>التاريخ</label>
          <input
            type="text"
            style={{
              padding: "8px",
              borderRadius: "5px",
              fontSize: "18px",
              textAlign: "right",
              marginBottom: "15PX",
            }}
            onChange={(e) => {
              setData({ ...data, date: e.target.value });
            }}
          ></input>
          <label> كتابنا المرقم</label>
          <input
            type="text"
            style={{
              padding: "8px",
              borderRadius: "5px",
              fontSize: "18px",
              textAlign: "right",
              marginBottom: "15PX",
            }}
            onChange={(e) => {
              setData({ ...data, bookNumber: e.target.value });
            }}
          ></input>
          <label>التاريخ</label>
          <input
            type="text"
            style={{
              padding: "8px",
              borderRadius: "5px",
              fontSize: "18px",
              textAlign: "right",
              marginBottom: "15PX",
            }}
            onChange={(e) => {
              setData({ ...data, date2: e.target.value });
            }}
          ></input>
          <label> الكتاب</label>
          <input
            type="file"
            style={{
              padding: "8px",
              borderRadius: "5px",
              fontSize: "18px",
              float: "right",
              marginBottom: "15PX",
            }}
            onChange={(e) => {
              setData({ ...data, file: e.target.files[0] });
            }}
          ></input>
          <button
            style={{
              fontWeight: "bold",
              fontSize: "18px",
              width: "35%",
              padding: "10px",
            }}
            onClick={handelSubmit}
          >
            تأكيد
          </button>
        </div>
      </div>
    </>
  );
}
