import React, { useContext, useEffect, useState } from "react";
import style from "./PendingPage.module.css";
import Cookies from "js-cookie";
import { Nav } from "../Nav/Nav";
import jwtDecode from "jwt-decode";
import { Print } from "../printForm/Print";
import { DeleteModal } from "../deleteModal/DeleteModal";
import axios from "axios";
import { server_url } from "../../config";
export const PendingPage = (props) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [all, setAll] = useState(null);
  const [searchType, setType] = useState("");
  const [searchValue, setValue] = useState("");
  const [search, setSearch] = useState({});
  const [countyNumber, SetCountyNumber] = useState(null);
  const [num, setNum] = useState(0);
  const [currentPage, setCur] = useState(1);
  const [check, setCheck] = useState(false);
  const [clk, setClk] = useState(false);
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState(null);
  const [husbandName, sethusbandName] = useState(null);
  const [husbandName2, sethusbandName2] = useState(null);
  const [checkUser, setCheckUser] = useState(false);
  // console.log(num);
  let token = Cookies.get("auth");
  useEffect(() => {
    if (!token) window.location.replace("/");
    if (
      !jwtDecode(token).admin &&
      !jwtDecode(token).role.includes("add") &&
      !jwtDecode(token).role.includes("setting") &&
      !jwtDecode(token).role.includes("edit")
    ) {
      setCheckUser(false);
      if (!jwtDecode(token).role.includes("print"))
        window.location.replace("/");
    } else setCheckUser(true);
    setUser(jwtDecode(token));

    const get = async () => {
      axios
        .get(`${server_url}/form/pending?page=1`, {
          headers: {
            Authorization: `token ${token}`,
          },
        })
        .then((res) => {
          setData(res.data.data);
          setAll(res.data.data);
          setNum(res.data.len);
          localStorage.setItem("num", res.data.len);
        })
        .catch((err) => {
          // console.log(err);
        });
    };

    if (
      !jwtDecode(token).admin &&
      !jwtDecode(token).role.includes("add") &&
      !jwtDecode(token).role.includes("setting") &&
      !jwtDecode(token).role.includes("edit")
    ) {
      setData({});
    } else get();
  }, []);

  const handlePending = (id) => {
    axios
      .patch(
        `${server_url}/form/approve/${id}`,
        {},
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )
      .then((res) => {
        console.log("🚀 ~ handlePending ~ res:", res)
        window.location.reload();
      })
      .catch((err) => {
        console.log("🚀 ~ handlePending ~ err:", err)
      });
  };

  const handleAproveAllClick = async (e) => {
    e.preventDefault();
    console.log("🚀 ~ handleAproveAllClick ~ token:", token)
    const data = await axios
      .put(`${server_url}/form/approve/all`, {}, {
        headers: {
          Authorization: `token ${token}`,
        },
      }).then((res) => {
        console.log("🚀 ~ handleAproveAllClick ~ res:", res)
        window.location.reload();
      }).catch((err) => {
        console.log("🚀 ~ handleAproveAllClick ~ err:", err)
      });
  };

  //   wait
  const handelSubmit = async (e) => {
    e.preventDefault();
    setCur(1);
    if (checkUser) {
      if (Object.keys(search).length === 0) {
        axios
          .get(`${server_url}/form/mostafid/?page=1`, {
            headers: {
              Authorization: `token ${token}`,
            },
          })
          .then((res) => {
            if (res.data.data.length) {
              setCur(1);
              setData(res.data.data);
            } else {
              setData([]);
            }
          });
      } else {
        axios
          .post(`${server_url}/form/front/?page=1`, {
            search,
          })
          .then((res) => {
            if (res.data.length) {
              setCur(1);
              setData(res.data);
            } else {
              setData([]);
            }
          });
      }
    }
  };

  const handelNext = async () => {
    if (checkUser) {
      if (Object.keys(search).length === 0) {
        axios
          .get(`${server_url}/form/pending/?page=${currentPage + 1}`, {
            headers: {
              Authorization: `token ${token}`,
            },
          })
          .then((res) => {
            if (res.data.data.length) {
              setCur((pre) => pre + 1);
              setData(res.data.data);
            }
          });
      } else {
        axios
          .post(`${server_url}/?page=${currentPage + 1}`, {
            search,
          })
          .then((res) => {
            if (res.data.length) {
              setCur((pre) => pre + 1);
              setData(res.data);
            }
          });
      }
    }
  };

  const handelPrev = async () => {
    if (currentPage == 1) return;
    if (checkUser) {
      if (Object.keys(search).length === 0) {
        axios
          .get(`${server_url}/?page=${currentPage - 1}`, {
            headers: {
              Authorization: `token ${token}`,
            },
          })
          .then((res) => {
            if (res.data.data.length) {
              setCur((pre) => pre - 1);
              setData(res.data.data);
            }
          });
      } else {
        axios
          .post(`${server_url}/form/front/?page=${currentPage - 1}`, {
            search,
          })
          .then((res) => {
            if (res.data.length) {
              setCur((pre) => pre - 1);
              setData(res.data);
            }
          });
      }
    }
  };

  if (!data || !user) return <div className={style.loader}></div>;
  return check ? (
    <Print
      husbandName={husbandName}
      husbandName2={husbandName2}
      fullName={fullName}
    ></Print>
  ) : (
    <>
      <Nav name="الكتب" number={num} />
      <div className={style.Lcontainer}>
        <form onSubmit={handelSubmit}>
          <button type="submit">
            <i className="fa fa-arrow-circle-left"></i>
          </button>
          <button className={style.approve} style={{ width: "200px" }} onClick={handleAproveAllClick}>
            مصادقه الكل
          </button>
          <input
            type={"text"}
            placeholder="رقم المقاطعة"
            name="fullName"
            onChange={(e) => {
              setSearch(e.target.value);
              SetCountyNumber(e.target.value);
              handelSubmit(e);
            }}
          ></input>
        </form>
        <div className={style.girdTable}>
          <div className={style.girdItem}>الاجراء </div>
          <div className={style.girdItem}>رقم الاستماره</div>
          <div className={style.girdItem}>الشريحه</div>
          <div className={style.girdItem}>تاريخ التخصيص</div>
          <div className={style.girdItem}>دائره الاحوال </div>
          <div className={style.girdItem}>رقم المقاطعة</div>
          <div className={style.girdItem}>رقم القطعه</div>
          <div className={style.girdItem}>الاسم </div>
          <div className={style.girdItem}>#</div>
        </div>
        {checkUser &&
          data.map((data, index) => {
            return (
              <>
                <div className={style.girdTable2}>
                  <div
                    className={style.girdItem2}
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      marginLeft: "15px",
                    }}
                  >
                    {(user.admin || user.role.includes("delete")) && (
                      <i
                        className="fa fa-trash"
                        style={{ fontSize: "1.2rem", cursor: "pointer" }}
                        onClick={() => {
                          console.log(data);
                          setId(data._id);
                          setClk(true);
                        }}
                      ></i>
                    )}
                    {(user.admin || user.role.includes("edit")) && (
                      <i
                        className="fa fa-edit"
                        style={{
                          color: "blue",
                          fontSize: "1.2rem",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          window.location.replace(`/form/edit/${data._id}`);
                        }}
                      ></i>
                    )}

                    <button
                      className="fa fa-thumbs-up"
                      style={{
                        fontSize: "1.2rem",
                        cursor: "pointer",
                        backgroundColor: "transparent",
                        color: "#58cf58",
                        borderRadius: "5px",
                        outline: "none",
                        height: "30px",
                        border: "none",
                        paddingBottom: "20px",
                      }}
                      onClick={() => {
                        handlePending(data._id);
                      }}
                    ></button>
                  </div>
                  <div className={style.girdItem2}>
                    {" "}
                    {data.formNumber ? data.formNumber : "null"}
                  </div>
                  <div
                    className={style.girdItem2}
                    style={{ textAlign: "center" }}
                  >
                    {data.classType ? data.classType : "null"}
                  </div>

                  <div className={style.girdItem2}>
                    {" "}
                    {data.assignDate
                      ? data.assignDate.slice(0, 10)
                      : "null"}{" "}
                  </div>
                  <div className={style.girdItem2}>
                    {data.department ? data.department : "null"}
                  </div>
                  <div className={style.girdItem2}>
                    {" "}
                    {data.addressNubmer ? data.addressNubmer : "null"}{" "}
                  </div>
                  <div className={style.girdItem2}>
                    <div>{data.pieceNumber ? data.pieceNumber : "null"}</div>
                    <h5>
                      <i>المساحة : {data.area ? data.area : " "}</i>
                    </h5>
                  </div>
                  <div className={style.girdItem2}>
                    <div> {data.fullName}</div>{" "}
                    {!data.beneficiary && (
                      <p
                        style={{
                          backgroundColor: "yellow",
                          fontWeight: "600",
                          width: "80%",
                          margin: "auto",
                          borderRadius: "10px",
                          marginTop: "10px",
                        }}
                      >
                        غير مستفيد
                      </p>
                    )}
                    <h5>
                      <i>
                        اسم الزوج : {data.husbandName ? data.husbandName : ""}
                      </i>
                    </h5>
                  </div>
                  <div className={style.girdItem2}>{index + 1}</div>
                </div>
                {index != num - 1 ? <hr style={{ width: "100%" }}></hr> : <></>}
              </>
            );
          })}
        {data.length == 0 && (husbandName || fullName) && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              className={style.tba3a}
              onClick={() => {
                setCheck(true);
              }}
            >
              {" "}
              طباعة كتاب غير مستفيد{" "}
            </button>
          </div>
        )}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className={style.pagination}>
            <button onClick={handelPrev}>&laquo;</button>
            <button>{currentPage}</button>

            <button onClick={handelNext}>&raquo;</button>
          </div>
        </div>
      </div>
      {clk && <DeleteModal setClk={setClk} id={id} />}
    </>
  );
};
