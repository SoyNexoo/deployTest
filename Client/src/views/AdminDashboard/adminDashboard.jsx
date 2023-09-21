import React, { useEffect, useRef, useState } from "react";
import style from "./adminDashboard.module.css";
import { useDispatch, useSelector } from "react-redux";

import { getAllReallyProperties } from "../../redux/actions";
import AllUser from "./AllUsers/allUser";
import AllProperties from "./AllProperties/allProperties";
import User from "./Profile/Profile";
import Message from "./Message/Messages";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const [componenteActual, setComponenteActual] = useState("A");
  const [data, setData] = useState({});
  const [color, setColor] = useState('#091f44');
  const [selectedLink, setSelectedLink] = useState(null);

  //? PROPIEDADES -------------------------------------------

  const allProperties = useSelector((state) => state.propertiesCopy);
  const [props, setProps] = useState({order: "rentPriceAsc"})
  const ref = useRef();
  useEffect(() => {
    ref.current = allProperties;
  });
  const prevFilter = ref.current;

  useEffect(() => {
    if (prevFilter !== allProperties) {
      const fetchData = () => {
        dispatch(getAllReallyProperties(props, 1));
      };
      fetchData();
    }
  }, []);

  //? ---------------------------------------------------------

  const handleLinkClick = (linkName) => {
    setComponenteActual(linkName);
    setSelectedLink(linkName); // Establecer el enlace seleccionado al hacer clic
    setColor('#091f44'); // Restablecer el color cuando se hace clic en un enlace
  };


  useEffect(() => {
    const info = localStorage.getItem("data");
    setData(JSON.parse(info));
    setSelectedLink("A"); // Establecer el enlace seleccionado al hacer clic
    setColor("#091f44");  
  }, [localStorage]);

 

  return (
    <div className={style.background}>
      <div className="row" style={{ marginTop: "3rem", width: "100%" }}>
        <div className="col-md-3 p">
          <div
            className={`card ${style.fixedCard}`}
            style={{ position: "sticky", top: "5rem", marginBottom: "1rem" }}
          >
            <div className="card-body mt-2">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <img
                  src={data.profilePic}
                  width={150}
                  style={{
                    height: "150px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <h5 className="card-title pt-1">
                  {data.userName}
                  {" (Admin)"}
                </h5>
              </div>
              <ul>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    onClick={() => {handleLinkClick("A")}}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "15px",
                      height: "70px",
                      width: "90%",
                      paddingInline: "5px",
                      backgroundColor: selectedLink === "A" ? color : "white",
                      color: selectedLink === "A" ? "white" : "black",
                    }}
                    href="#"
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        fill="currentColor"
                        class="bi bi-person-fill-gear"
                        viewBox="0 0 16 16"
                      >
                        <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h5.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.544-3.393C9.077 9.038 8.564 9 8 9c-5 0-6 3-6 4Zm9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382l.045-.148ZM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0Z" />
                      </svg>
                      &nbsp; Editar Perfil
                    </div>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    href="#"
                    onClick={() => {handleLinkClick("B")}}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "15px",
                      height: "70px",
                      width: "90%",
                      paddingInline: "5px",
                      backgroundColor: selectedLink === "B" ? color : "white",
                      color: selectedLink === "B" ? "white" : "black",
                    }}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        fill="currentColor"
                        class="bi bi-houses-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7.207 1a1 1 0 0 0-1.414 0L.146 6.646a.5.5 0 0 0 .708.708L1 7.207V12.5A1.5 1.5 0 0 0 2.5 14h.55a2.51 2.51 0 0 1-.05-.5V9.415a1.5 1.5 0 0 1-.56-2.475l5.353-5.354L7.207 1Z" />
                        <path d="M8.793 2a1 1 0 0 1 1.414 0L12 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l1.854 1.853a.5.5 0 0 1-.708.708L15 8.207V13.5a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 4 13.5V8.207l-.146.147a.5.5 0 1 1-.708-.708L8.793 2Z" />
                      </svg>
                      &nbsp; Propiedades
                    </div>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    onClick={() => {handleLinkClick("C")}}
                    href="#"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "15px",
                      height: "70px",
                      width: "90%",
                      paddingInline: "5px",
                      backgroundColor: selectedLink === "C" ? color : "white",
                      color: selectedLink === "C" ? "white" : "black", 
                    }}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        fill="currentColor"
                        class="bi bi-people-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                      </svg>
                      &nbsp; Todos los usuarios
                    </div>
                  </a>
                </li>
                <li class="nav-item">
                  <a
                    class="nav-link"
                    onClick={() => {handleLinkClick("D")}}
                    href="#"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      borderRadius: "15px",
                      height: "70px",
                      width: "90%",
                      paddingInline: "5px",
                      backgroundColor: selectedLink === "D" ? color : "white",
                      color: selectedLink === "D" ? "white" : "black", 
                    }}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="35"
                        height="35"
                        fill="currentColor"
                        class="bi bi-chat-right-text-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M16 2a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h9.586a1 1 0 0 1 .707.293l2.853 2.853a.5.5 0 0 0 .854-.353V2zM3.5 3h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1 0-1zm0 2.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1z" />
                      </svg>
                      &nbsp; Todos los mensajes
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {componenteActual === "A" ? (
          <div className="col-md-9">
            <User />
          </div>
        ) : componenteActual === "B" ? (
          <div className="col-md-9">
            <AllProperties allProperties={allProperties} setProps={setProps} props={props} />
          </div>
        ) : componenteActual === "C" ? (
          <div className="col-md-9">
            <AllUser />
          </div>
        ) : (
          <div className="col-md-9">
            <Message />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
