import React, { useEffect, useRef, useState } from "react";
import style from "./Logs.module.css";
import { useReactToPrint } from "react-to-print";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import { Nav } from "../Nav/Nav";
export const Logs = () => {
  const [all, setAll] = useState(null);
  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);
  const [selected, setSelected] = useState({});
  const [date, setDate] = useState();
  const [currentPage, setCur] = useState(1);
  const componentRef = useRef();

  const handelPrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "SMV",
  });

  useEffect(() => {
    let token = Cookies.get("auth");
    if (!token) window.location.replace("/");
    if (!jwtDecode(token).admin) window.location.replace("/forms");
    const get = async () => {
      let res = await fetch("http://localhost:8000/logs", {
        method: "POST",
        headers: {
          Authorization: `token ${token}`,
        },
      });
      if (res.status == 200) {
        res = await res.json();
        let tmp2 = res.length ? res[0].createdAt.slice(0, 10) : "";
        setDate(tmp2);
        setAll(res);
        if (res.length) setData(JSON.stringify(res[0].createdAt).slice(1, 11));
        let tmp = [];
        res.map((record) => {
          let date1 = new Date(tmp2).getTime();
          let date2 = new Date(
            JSON.stringify(record.createdAt).slice(1, 11)
          ).getTime();
          if (date1 == date2) {
            tmp.push(record);
          }
        });
        setData(tmp);
      }
      res = await fetch("http://localhost:8000/auth/all", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.status == 200) {
        res = await res.json();
        setUsers(res);
      }
    };
    get();
  }, []);
  const handelSubmit = async (e) => {
    e.preventDefault();
    setCur(1);
    let tmp = [],
      x = 0;
    let start = 0;
    for (let i = 0; i < all.length; ++i) {
      let ok = 1;
      if (selected.from) {
        let date1 = new Date(selected.from).getTime();
        let date2 = new Date(
          JSON.stringify(all[i].createdAt).slice(1, 11)
        ).getTime();
        if (date1 > date2) ok = 0;
      }
      if (selected.to) {
        let date1 = new Date(selected.from).getTime();
        let date2 = new Date(
          JSON.stringify(all[i].createdAt).slice(1, 11)
        ).getTime();
        if (date1 < date2) ok = 0;
      }
      if (selected.user) {
        let tmm = String(all[i]["user"]).includes(String(selected.user));
        if (!tmm) ok = 0;
      }
      if (selected.type) {
        let tmm = String(all[i]["type"]).includes(selected.type);
        if (!tmm) ok = 0;
      }

      if (ok) x++;
      if (ok && x >= start) tmp.push(all[i]);
      if (tmp.length == 30) break;
    }
    setData(tmp);
  };

  const handelNext = async () => {
    let tmp = [],
      x = 0;
    let start = currentPage * 30;
    for (let i = 0; i < all.length; ++i) {
      let ok = 1;
      if (selected.from) {
        let date1 = new Date(selected.from).getTime();
        let date2 = new Date(
          JSON.stringify(all[i].createdAt).slice(1, 11)
        ).getTime();
        if (date1 > date2) ok = 0;
      }
      if (selected.to) {
        let date1 = new Date(selected.from).getTime();
        let date2 = new Date(
          JSON.stringify(all[i].createdAt).slice(1, 11)
        ).getTime();
        if (date1 < date2) ok = 0;
      }
      if (selected.user) {
        let tmm = String(all[i]["user"]) == selected.user;
        if (!tmm) ok = 0;
      }
      if (selected.type) {
        let tmm = String(all[i]["type"]) == selected.type;
        if (!tmm) ok = 0;
      }

      if (ok) x++;
      if (ok && x >= start) tmp.push(all[i]);
      if (tmp.length == 30) break;
    }
    if (tmp.length) {
      setData(tmp);
      setCur((prev) => prev + 1);
      // setLen(start + tmp.length);
    }
  };
  const handelPrev = async () => {
    if (currentPage == 1) return;

    let tmp = [],
      x = 0;
    let start = (currentPage - 2) * 30;
    for (let i = 0; i < all.length; ++i) {
      let ok = 1;
      if (selected.from) {
        let date1 = new Date(selected.from).getTime();
        let date2 = new Date(
          JSON.stringify(all[i].createdAt).slice(1, 11)
        ).getTime();
        if (date1 > date2) ok = 0;
      }
      if (selected.to) {
        let date1 = new Date(selected.from).getTime();
        let date2 = new Date(
          JSON.stringify(all[i].createdAt).slice(1, 11)
        ).getTime();
        if (date1 < date2) ok = 0;
      }
      if (selected.user) {
        let tmm = String(all[i]["user"]).includes(selected.user);
        if (!tmm) ok = 0;
      }
      if (selected.type) {
        let tmm = String(all[i]["type"]).includes(selected.type);
        if (!tmm) ok = 0;
      }

      if (ok) x++;
      if (ok && x >= start) tmp.push(all[i]);
      if (tmp.length == 30) break;
    }
    if (tmp.length) {
      setData(tmp);
      setCur((pre) => pre - 1);
    }
  };
  if (!data || !users) return <div className={style.loader}></div>;
  return (
    <>
      {" "}
      <Nav name="Logs system" number="000" />
      <div className={style.LContainer}>
        <div style={{ border: "1px solid white", borderRadius: "20px" }}>
          <h2>Logs system </h2>
          <hr style={{ width: "90%" }}></hr>
          <form className={style.Form} onSubmit={handelSubmit}>
            <button type="submit">
              <i className="fa fa-arrow-circle-left"></i>
            </button>
            <button type="submit" onClick={handelPrint}>
              طباعه
            </button>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ marginLeft: "10px", fontWeight: "bold" }}>
                الي
              </label>
              <input
                type="date"
                onChange={(e) => {
                  setSelected({ ...selected, to: e.target.value });
                }}
                defaultValue={date}
              ></input>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <label style={{ marginLeft: "10px", fontWeight: "bold" }}>
                {" "}
                من
              </label>
              <input
                type="date"
                onChange={(e) => {
                  setSelected({ ...selected, from: e.target.value });
                }}
                defaultValue={date}
              ></input>
            </div>
            <select
              type="text"
              onChange={(e) => {
                setSelected({ ...selected, type: e.target.value });
              }}
            >
              <option value="" selected>
                النوع: الكل
              </option>
              <option value="تسجيل دخول" className={style.options}>
                تسجيل دخول
              </option>
              <option value="اضافه استماره" className={style.options}>
                اضافه استماره
              </option>
              <option value="تعديل" className={style.options}>
                تعديل
              </option>
              <option value="حذف" className={style.options}>
                حذف
              </option>
              <option value="اضافه موظف" className={style.options}>
                اضافه موظف
              </option>

              <option value="excel" className={style.options}>
                اضافه excel
              </option>
            </select>
            <select
              type="text"
              onChange={(e) => {
                setSelected({ ...selected, user: e.target.value });
              }}
            >
              <option value="" selected>
                الموظف: الكل
              </option>
              {users.map((user) => {
                return (
                  <option value={user.name} className={style.options}>
                    {user.name}
                  </option>
                );
              })}
            </select>
          </form>
          <div ref={componentRef}>
            <div className={style.girdTable}>
              <div className={style.girdItem}>IP </div>
              <div className={style.girdItem}>المنصة</div>
              <div className={style.girdItem}>التاريخ</div>
              <div className={style.girdItem}>التفاصيل</div>
              <div className={style.girdItem}>الموظف</div>
              <div className={style.girdItem}>النوع </div>
            </div>
            {data.map((item) => {
              let color = "";
              if (item.type.includes("دخول")) color = "#8ef3e7";
              if (item.type.includes("حذف")) color = "#f39a8e";
              if (item.type.includes("تعديل")) color = "#ffc107";
              if (item.type.includes("اضافه")) color = "#8ebef3";
              if (item.type.includes("موظف")) color = "#cb8ef3";
              return (
                <div className={style.girdTable2}>
                  <div className={style.girdItem2}>{item.ip}</div>
                  <div className={style.girdItem2}>{item.system}</div>
                  <div className={style.girdItem2}>
                    {item.createdAt.slice(0, 10)}
                  </div>
                  <div className={style.girdItem2}>{item.details}</div>
                  <div className={style.girdItem2}>{item.user}</div>
                  <div className={style.girdItem2}>
                    <div
                      className={style.type}
                      style={{ backgroundColor: color }}
                    >
                      {" "}
                      {item.type}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          className={style.pagination}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <button onClick={handelPrev}>&laquo;</button>
          <button>{currentPage}</button>

          <button onClick={handelNext}>&raquo;</button>
        </div>
      </div>
    </>
  );
};
