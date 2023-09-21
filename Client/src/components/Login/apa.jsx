import React, { useState } from "react";
import { useNavigate } from "react-router";
import style from "./apa.module.css";
import { getLogin } from "../../redux/actions";
import { validation } from "./validation";
import { Modal, ToastBody } from "react-bootstrap";
import fondo from "../../assets/images/Exteriores/imageLogin.avif";
import GoogleLoginButton from "../GoogleAuth/LoginButton/";
import Register from "../Register/Register.jsx";

const Login = ({ setConditional, conditional }) => {
  
  const [loginSlide, setLoginSlide] = useState(false);

  const handleSwitch = () => {
    setLoginSlide(!loginSlide)
    if(conditional === "login") {
      setConditional("register")
    } else {
      setConditional("login")
    }

  }

  console.log(conditional);

  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({ errorsBack: undefined });
  const [toastBody, setToastBody] = useState({ success: false, data: {} });
  const [toast, setToast] = useState(false);
  const navigate = useNavigate("/home");

  const handleChange = (e) => {
    const { name } = e.target;
    const { value } = e.target;

    setLogin({
      ...login,
      [name]: value,
    });
    const errorDetect = validation({ [name]: value });

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorDetect[name],
    }));
  };
  console.log(login);


  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 2500);
    await getLogin(
      login,
      setToast,
      conditional,
      setToastBody,
      navigate,
      setErrors
    );
  };

  console.log(toastBody);

  return (
    <>
      <div
        style={{
          background:
            "linear-gradient(45deg, rgba(29,88,148,1) 7%, rgba(186,38,224,1) 100%)",
          border: "none",
          width: "100vw",
          display: "flex",
          padding: "50px",
          paddingInline: "10%",
          paddingBlock: "5%",
          position: "relative",
          margin: "auto",
        }}
      >
        <div className={`${style.overlay} ${loginSlide ? style.login : style.register}`}>
          <img
            src={fondo}
            style={{
              objectFit: "cover",
              height: "616px",
              width: "100%",
              display: "block",
              // width: "70%",
              // border: "none",
              // borderRadius:"none",
            }}
            className={style.img}
          ></img>
        </div>
        <div
          style={{
            background: "rgba(255, 255, 255, 0.701)",
            width: "100%",
            height:"616px",
            margin: "0 auto",
          }}
        >
          <form onSubmit={handleSubmit}>
            <fieldset
              className={`border  d-flex flex-column text-center ${style.form}`}
            >
              {/* <div class={`d-flex justify-content-center align-items-center  ${style.perfile}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                     <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                    </svg>
                  </div> */}

              <div
                class="d-flex flex-column align-items-center justify-content-center"
                style={{ width: "80%" }}
              >
                <h2
                  style={{
                    marginTop: "15px",
                    letterSpacing: "6px",
                    color: "#091f44",
                  }}
                >
                  LOGIN
                </h2>
                <div class="mt-3" style={{ textAlign: "left", width: "80%" }}>
                  <label class="form-label lead" for="InputEmail">
                    Email{" "}
                  </label>
                  <input
                    type="email"
                    class={`form-control ${style.inputs}`}
                    name="email"
                    id="InputEmail"
                    aria-describedby="emailHelp"
                    value={login.email}
                    placeholder="Escriba su email"
                    onChange={(e) => handleChange(e)}
                  />
                  {errors.email ? (
                    <p style={{ color: "red", fontSize: "3px" }}>
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div class="mt-3" style={{ textAlign: "left", width: "80%" }}>
                  <label class="form-label lead" for="InputPassword">
                    Contraseña
                  </label>
                  <input
                    type="password"
                    class={`form-control ${style.inputs}`}
                    name="password"
                    id="InputPassword"
                    value={login.password}
                    onChange={handleChange}
                    placeholder="Escriba su contraseña"
                  />
                  {errors.password ? (
                    <p style={{ color: "red", fontSize: "3px" }}>
                      {errors.password}
                    </p>
                  ) : null}
                </div>
              </div>

              <hr className={style.hr}></hr>

              <div class="d-flex flex-row align-items-center justify-content-center">
                <div class="col-xs-6 m-3">
                  <button
                    style={{
                      width: "100%",
                      paddingInline: "100px",
                      paddingBlock: "10px",
                    }}
                    type="submit"
                    className={style.button}
                  >
                    {" "}
                    Acceder
                  </button>
                  <br></br>
                    <br></br>
                  <p>
                    Sin cuenta?{" "}
                    <span
                      onClick={handleSwitch}
                      style={{ cursor: "pointer", color: "blueviolet" }}
                    >
                      Registrate
                    </span>
                  </p>
                  <hr className={style.hr}></hr>
                  <p style={{ marginTop: "15px" }}>O inicia sesion con</p>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <GoogleLoginButton />
                  </div>
                </div>
              </div>
            </fieldset>

            <div class={style.alert}>
              {toast && toastBody.success === true ? (
                <div class="justify-self-center align-self-center">
                  <Modal show={toast}>
                    <Modal.Header>
                      <Modal.Title>Logueado con exito✅</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div>
                        <h3>Bienvenido</h3>
                        <div>
                          <img
                            src={toastBody.data.profilePic}
                            alt="foto de perfil"
                          ></img>
                        </div>
                        <h6>{toastBody.data.userName}</h6>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <p> Redirigiendote....</p>
                    </Modal.Footer>
                  </Modal>
                </div>
              ) : toast && toastBody.success === false ? (
                <div class="justify-self-center align-self-center">
                  <Modal show={toast}>
                    <Modal.Header>
                      <Modal.Title>Ocurrio un error🚨</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <div>
                        <p> Intentalo de nuevo</p>
                      </div>
                    </Modal.Body>
                    <Modal.Footer></Modal.Footer>
                  </Modal>
                </div>
              ) : null}
            </div>
          </form>
          <div className={style.leftForm}>
            <Register/>
           {/*  <form>
              <fieldset
                className={`border  d-flex flex-column text-center ${style.form2}`}
              >
                  <h2
                    style={{
                      marginTop: "15px",
                      letterSpacing: "6px",
                      color: "#091f44",
                    }}
                  >
                    REGISTER
                  </h2>
                <div
                  // class="d-flex flex- align-items-center justify-content-center"
                  style={{ width: "80%" } }
                  className={style.gridForm}
                >
                  <div class="mt-3" style={{ textAlign: "left", width: "100%", gridArea:"name" }}>
                    <label  class="form-label lead" for="InputEmail">
                      Nombre
                    </label>
                    <input
                      type="email"
                      class={`form-control ${style.inputs}`}
                      name="email"
                      
                      id="InputEmail"
                      aria-describedby="emailHelp"
                      // value={login.email}
                      placeholder="Escriba su email"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div class="mt-3" style={{ textAlign: "left", width: "100%", gridArea:"userName" }}>
                    <label  class="form-label lead" for="InputEmail">
                     Nombre de usuario
                    </label>
                    <input
                      type="email"
                      class={`form-control ${style.inputs}`}
                      name="email"
                      
                      id="InputEmail"
                      aria-describedby="emailHelp"
                      // value={login.email}
                      placeholder="Escriba su email"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                  <div class="mt-3" style={{ textAlign: "left", width: "100%", gridArea:"correo" }}>
                    <label class="form-label lead" for="InputEmail">
                      Email{" "}
                    </label>
                    <input
                      type="email"
                      class={`form-control ${style.inputs}`}
                      name="email"
                      
                      id="InputEmail"
                      aria-describedby="emailHelp"
                      value={login.email}
                      placeholder="Escriba su email"
                      onChange={(e) => handleChange(e)}
                    />
                    {errors.email ? (
                      <p style={{ color: "red", fontSize: "3px" }}>
                        {errors.email}
                      </p>
                    ) : null}
                  </div>

                  <div class="mt-3" style={{ textAlign: "left", width: "100%", gridArea:"contraseña" }}>
                    <label class="form-label lead" for="InputPassword">
                      Contraseña
                    </label>
                    <input
                      type="password"
                      class={`form-control ${style.inputs}`}
                      name="password"
                      id="InputPassword"
                      value={login.password}
                      onChange={handleChange}
                      placeholder="Escriba su contraseña"
                    />
                    {errors.password ? (
                      <p style={{ color: "red", fontSize: "3px" }}>
                        {errors.password}
                      </p>
                    ) : null}
                  </div>
                  <div class="mt-3" style={{ textAlign: "left", width: "100%", gridArea:"verificar" }}>
                    <label class="form-label lead" for="InputPassword">
                      Verificar contraseña
                    </label>
                    <input
                      type="password"
                      class={`form-control ${style.inputs}`}
                      name="password"
                      id="InputPassword"
                      value={login.password}
                      onChange={handleChange}
                      placeholder="Escriba su contraseña"
                    />
                    {errors.password ? (
                      <p style={{ color: "red", fontSize: "3px" }}>
                        {errors.password}
                      </p>
                    ) : null}
                  </div>
                </div>

                <hr className={style.hr}></hr>

                      <p style={{color:"blue", cursor:"pointer"}} onClick={handleSwitch}>LOGIN</p>
                <div class="d-flex flex-row align-items-center justify-content-center">
                  <div class="col-xs-6 m-3">
                    <button
                      style={{
                        width: "100%",
                        paddingInline: "100px",
                        paddingBlock: "10px",
                      }}
                      type="submit"
                      className={style.button}
                    >
                      {" "}
                      Acceder
                    </button>
                     {loginSlide ? <p>login</p> : <p>register</p>}
                    <p>
                      Sin cuenta?{" "}
                      <span
                        // onClick={handleConditional}
                      onClick={handleSwitch}

                        style={{ cursor: "pointer", color: "blueviolet" }}
                      >
                        Registrate
                      </span>
                    </p>
                    <hr className={style.hr}></hr>
                    <p style={{ marginTop: "15px" }}>O inicia sesion con</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <GoogleLoginButton />
                    
                    </div>
                  </div>
                </div>
              </fieldset>
            </form> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

{
  /* <div class="alert alert-success" style={{backgroundColor : "rgba(81, 187, 99, 0.863)"}} role="alert">
                {toastBody && 
                <div>
                  <h2 style={{color : "green"}}>Bienvenido!</h2>
                  {/* <div>
                    <img src={toastBody.data.profilePic} alt="foto de perfil"></img>
                  </div> 
                  <div>
                    <h6>{toastBody.data.userName}</h6>
                    <p>Reirigiendote...</p>
                  </div>
                </div>
               </div> */
}
