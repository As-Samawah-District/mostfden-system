import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";
// import loginImage from "../../assest/LoginImage.svg";
import serverImage from "../../assest/ServerImage.svg";
import style from "./Login.module.css";
import Cookies from "js-cookie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenNib } from "@fortawesome/free-solid-svg-icons";
import { server_url } from "../../config";

const Login = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1200);
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [err, setErro] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    setErro(null);
    //`${server_url}
    let res = await fetch(`${server_url}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        password: password,
      }),
    });
    // console.log(res.status);
    let token = await res.json();
    if (res.status == 200) {
      // console.log(token.token);
      Cookies.set("auth", token.token);
      window.location.replace("/forms");
    } else {
      setErro("الاسم او الرقم السري خطأ");
      //     console.log(res.data);
      //  window.location.reload()
    }
  };

  useEffect(() => {
    let token = Cookies.get("auth");
    if (token) window.location.replace("/forms");
  }, []);

  return (
    <div>
      {/* state logo */}
      <div className={style.logoConatiner}>
        <div>
          <h1>مدير بلدية السماوة</h1>
          <p>وحدة نظم المعلومات</p>
        </div>
        <img
          className={style.logo}
          src="image-525acf9e29b89e9cdea769d5d8c0ef1b8720823e_g8nzze.png"
          alt="StateLgog"
        />
      </div>

      {/* main card login */}
      {/* style={isSmallScreen ? styles.mainCardBig : styles.mainCardSmall} */}
      <MDBContainer>
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <div className={style.animateImage}>
                <MDBCardImage
                  src={serverImage}
                  alt="login form"
                  className="rounded-start w-100 Image"
                />
              </div>
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody
                className="d-flex flex-column"
                style={isSmallScreen ? styles.small : styles.big}
              >
                <div
                  className="d-flex flex-col mb-5"
                  style={{ justifyContent: "center" }}
                >
                  <MDBIcon
                    fas
                    className="fa fa-lock fa-3x me-3"
                    style={{ color: "#396ee5" }}
                  />
                  <span className="h1 fw-bold mb-0">!اهلا بك من جديد</span>
                </div>

                <form onSubmit={handelSubmit} style={{width: "100%"}}>
                  <MDBInput
                    wrapperClass="mb-4"
                    label="الاسم"
                    id="formControlLg"
                    type="text"
                    size="lg"
                    required
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="كلمة المرور"
                    id="formControlLg"
                    type="password"
                    size="lg"
                    required
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />

                  <MDBBtn
                    className="mb-4 px-5"
                    style={{ fontSize: "20px", width: "100%" }}
                    color="dark"
                    size="lg"
                    type="submit"
                  >
                    تسجيل الدخول
                  </MDBBtn>
                </form>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </div>
  );
};

export default Login;

const styles = {
  big: {
    marginTop: "150px",
  },
  small: {
    marginTop: "50px",
  },
  mainCardSmall: {
    marginTop: "50px",
  },
  mainCardBig: {
    marginTop: "80px",
  },
};
