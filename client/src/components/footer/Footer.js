import React from 'react'
import style from "./Footer.module.css";

const Footer = () => {
  return (
      <div className={style.foot}>
        <div style={{ marginLeft: "50px" }}>
          © 2024 Copyright:{"  "}
          <a href="https://ko-sage.com/" style={{ color: "#0378ff", flex: "1"}}>
            ko-sage.com
          </a>
        </div>
        <div style={{ marginRight: "50px" }}>
          جميع الحقوق محفوظه لشركه{" "}
          <span style={{ color: "#0378ff" }}>الكوسج</span>
        </div>
      </div>
  )
}

export default Footer
