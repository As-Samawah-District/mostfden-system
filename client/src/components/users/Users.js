import React, { useEffect, useState } from "react";
import style from "./Users.module.css";
import { UserModal } from "../modal2/UserModal";
import Cookies from "js-cookie";
import { Nav } from "../Nav/Nav";
import { server_url } from "../../config";

export const Users = () => {
  const [clk, setClk] = useState(false);
  const [data, setData] = useState(null);
  useEffect(() => {
    let token = Cookies.get("auth");
    if (!token) window.location.replace("/");
    const getAll = async () => {
      let res = await fetch(`${server_url}/auth/all`, {
        method: "GET",
      });
      if (res.status == 200) {
        res = await res.json();
        setData(res);
      }
    };
    getAll();
  }, []);
  if (!data) return <></>;
  return (
    <>
      <Nav name="الموظفين" number="000" />
      <div className={style.Ucontainer}>
        <button
          onClick={() => {
            setClk(true);
          }}
        >
          تسجيل
        </button>
        <div>
          <i
            style={{
              fontSize: "22px",
              fontWeight: "bold",
              marginRight: "20px",
            }}
          >
            الموظـفين
          </i>
          <i
            className="fa fa-users"
            style={{ fontSize: "20px", marginRight: "17px" }}
          ></i>
        </div>
      </div>
      <div style={{ marginTop: "30px" }}></div>
      <div className={style.cardsContainer}>
        {data.map((user) => {
          if (!user.hidden)
            return (
              <div
                className={style.card}
                onClick={() => {
                  window.location.replace(`/profile/${user._id}`);
                }}
              >
                <div className={style.line}></div>
                <img
                  src={
                    user.image
                      ? user.image
                      : "unknown_wm4koi.png"
                  }
                ></img>
                <div className={style.name}>{user.name}</div>
                <div className={style.fname}> {user.fullName} </div>
                <div className={style.boxs} style={{ width: "40%" }}>
                  <i className="fa fa-gear"></i>
                  <i className="fa fa-archive"></i>
                  <i className="fa fa-trash"></i>
                  <i className="fa fa-edit"></i>
                </div>
              </div>
            );
        })}
      </div>

      {clk ? <UserModal setClk={setClk} /> : <></>}
    </>
  );
};
