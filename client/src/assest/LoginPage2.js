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


const Login = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 1200);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1200);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <MDBContainer style={isSmallScreen ? styles.mainCardBig : styles.mainCardSmall}>

      {/* state logo */}
      <div>
        <img src="../../../public/image-525acf9e29b89e9cdea769d5d8c0ef1b8720823e_g8nzze.png" alt="StateLgog" />
        <div>
          <h1>مدرية امن العراق</h1>
          <p>قسم ادارة البيانات</p>
        </div>
      </div>

      {/* main card login */}
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src={serverImage}
              alt="login form"
              className="rounded-start w-100 Image"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column" style={isSmallScreen ? styles.small : styles.big}>
              <div className="d-flex flex-row">
                <MDBIcon
                  fas
                  icon="cubes fa-3x me-3"
                  style={{ color: "#ff6219" }}
                />
                <span className="h1 fw-bold mb-0">Logo</span>
              </div>

              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                أهلاً بك من جديد
              </h5>

              <MDBInput
                wrapperClass="mb-4"
                label="الاسم"
                id="formControlLg"
                type="email"
                size="lg"
                className=""
              />
              <MDBInput
                wrapperClass="mb-4"
                label="كلمة المرور"
                id="formControlLg"
                type="password"
                size="lg"
              />

              <MDBBtn className="mb-4 px-5" style={{ fontSize: "20px" }} color="dark" size="lg">
                تسجيل الدخول
              </MDBBtn>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>

    </MDBContainer>
  );
}

export default Login;

const styles = {
  big: {
    marginTop: "100px",
  },
  small: {
    marginTop: "50px",
  },
  mainCardSmall: {
    marginTop: "50px"
  },
  mainCardBig: {
    marginTop: "150px"
  }
};