import React from "react";
import style from "../modal/Modal.module.css";
import Cookies from "js-cookie";
import { server_url } from "../../config";
export const DeleteModal = (props) => {
  const handelSubmit = async (e) => {
    let token = Cookies.get("auth");
    let res = await fetch(
      `${server_url}/form/delete/${props.id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    if (res.status == 200) {
      window.location.reload();
    } else {
       // console.log(res);
    }
  };
  return (
    <div>
      <div className={style.test}>
        <div className={style.content}>
          <h4 style={{ marginLeft: "35px" }}>
            {" "}
            هل انت متاكد من اتخاذ هذا الاجراء؟
          </h4>
          <div className={style.btns}>
            <button
              style={{ background: "black" }}
              onClick={() => {
                props.setClk(false);
              }}
            >
              الغاء
            </button>
            <button onClick={handelSubmit}> حذف </button>
          </div>
        </div>
      </div>
    </div>
  );
};
