import React from "react";
import style from "./Modal.module.css";
import Cookies from "js-cookie";
import { server_url } from "../../config";
export const Modal = (props) => {
  const handelSubmit = async(e)=>{
    e.preventDefault();
    let token = Cookies.get("auth");
    let res = await fetch(`${server_url}/auth/${props.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `token ${token}`,
      }
    });
    if (res.status == 200) {
      window.location.replace('/users')
    }
  }
  return (
    <div>
      <div className={style.test}>
        <div className={style.content}>
          <h4 style={{marginLeft:'35px'}}> هل انت متاكد من اتخاذ هذا الاجراء؟</h4>
          <div className={style.btns}>
            <button style={{ background: "black" }}onClick={()=>{
                props.setclk(false)
            }} >الغاء</button>
            <button onClick={handelSubmit}> حذف </button>
          </div>
        </div>
      </div>
    </div>
  );
};
