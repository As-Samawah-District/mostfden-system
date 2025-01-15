import React, { useEffect, useRef, useState } from "react";
import style from "./archive.module.css";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { SideBar } from "../SideBar/SideBar";
import { Nav } from "../Nav/Nav";
import jwtDecode from "jwt-decode";
import { server_url } from "../../config";

export default function ShowArch() {
  const componentRef = useRef();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "SMV",
  });
  let token = Cookies.get("auth");
  useEffect(() => {
    if (!token || !id) window.location.replace("/");
    if (
      !jwtDecode(token).admin &&
      !jwtDecode(token).role.includes("add") &&
      !jwtDecode(token).role.includes("setting")
    )
      window.location.replace("/");
    const getData = async () => {
      let res = await fetch(`${server_url}/archive/get/?id=${id}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      if (res.status == 200) {
        res = await res.json();
        setData(res);
      }
    };
    getData();
  }, []);
  const handelDelete = async () => {
    if (!data || !data._id) return;
    let res = await fetch(`${server_url}/archive/?id=${data._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `token ${token}`,
      },
    });
    if (res.status == 200) {
        window.location.replace('/archive')
    }
  };
  return (
    <>
      <Nav name="عرض كتاب" number="000" />{" "}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          paddingTop: "20px",
        }}
      >
        <div
          style={{
            alignItems: "center",
            width: "50%",
            margin: "auto",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <h1
            className={style.title}
            style={{ width: "200px", padding: "8px" }}
          >
            عرض كتاب
          </h1> */}

          <img
            ref={componentRef}
            style={{ width: "100%", maxHeight: "90vh", marginBottom: "20px" }}
            src={data?.image}
          ></img>
          <b>
            <label> الدائره الصادر منها الكتاب</label>
          </b>
          <input
            type="text"
            style={{
              padding: "8px",
              borderRadius: "5px",
              fontSize: "18px",
              textAlign: "right",
              marginTop: "10px",
              marginBottom: "5px",
            }}
            placeholder={data?.region}
            disabled
          ></input>
          <b>
            <label>العدد </label>
          </b>
          <input
            type="text"
            style={{
              padding: "8px",
              borderRadius: "5px",
              fontSize: "18px",
              textAlign: "right",
              marginTop: "10px",
              marginBottom: "15px",
            }}
            placeholder={data?.number}
            disabled
          ></input>
          <label>الاسم الثلاثي </label>
          <input
            type="text"
            style={{
              padding: "8px",
              borderRadius: "5px",
              fontSize: "18px",
              textAlign: "right",
            }}
            placeholder={data?.user.fullName}
            disabled
          ></input>
          <b>
            <label>التاريخ</label>
          </b>
          <input
            type="text"
            style={{
              padding: "8px",
              borderRadius: "5px",
              fontSize: "18px",
              textAlign: "right",
              marginBottom: "15PX",
              marginTop: "10px",
            }}
            placeholder={data?.date}
            disabled
          ></input>
          <label>
            {" "}
            <b>كتابنا المرقم</b>
          </label>
          <input
            type="text"
            style={{
              padding: "8px",
              borderRadius: "5px",
              fontSize: "18px",
              textAlign: "right",
              marginBottom: "15PX",
              marginTop: "10px",
            }}
            placeholder={data?.bookNumber}
            disabled
          ></input>
          <b>
            <label>التاريخ</label>
          </b>
          <input
            type="text"
            style={{
              padding: "8px",
              borderRadius: "5px",
              fontSize: "18px",
              textAlign: "right",
              marginBottom: "15PX",
              marginTop: "10px",
            }}
            placeholder={data?.date2}
            disabled
          ></input>
          <button
            style={{
              marginTop: "30px",
              backgroundColor: "red",
              padding: "10px",
              fontWeight: "bold",
              fontSize: "18px",
              color: "white",
              borderRadius: "5px",
              border: "none",
              width: "100px",
            }}
            onClick={handelDelete}
          >
            مسح
          </button>
          <button
            style={{
              marginTop: "30px",
              backgroundColor: "blue",
              padding: "10px",
              fontWeight: "bold",
              fontSize: "18px",
              color: "white",
              borderRadius: "5px",
              border: "none",
              width: "100px",
              marginBottom: "20px",
            }}
            onClick={handelPrint}
          >
            طباعة
          </button>
        </div>
      </div>
    </>
  );
}
