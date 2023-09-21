import React, { useEffect, useRef, useState } from "react";
import style from "./detail.module.css";
import bed from "../../assets/images/svg/bed.svg";
import bath from "../../assets/images/svg/bath.svg";
import ruler from "../../assets/images/svg/ruler.svg";
import allSize from "../../assets/images/svg/allSize.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  SearchByLocation,
  favUserProperty,
  getAllFavUserProps,
  getAmenities,
  getAssetById,
  reviewsGet,
} from "../../redux/actions";
import { useParams, Link } from "react-router-dom";
import NotFoundPage from "../404/404";
import Card from "../../components/Card/CardOffer/CardOffer";
import Loader from "../../components/Loader/Loader";
import Booking from "../Reserv/Booking";
import Maps from "../../views/Map/Map";

const Detail = () => {
  // const favoritesData = useSelector((state) => state.myFavoritesProps);
  // console.log("infoafv", favoritesData);

  const ref = useRef();
  useEffect(() => {
    ref.current = reviews;
  });

  const prevReviews = ref.current;

  const { id } = useParams();
  const dispatch = useDispatch();
  const assetDetail = useSelector((state) => state.detail);
  const [imageUrl, setImageUrl] = useState(null);
  const propertiesSug = useSelector((state) => state.properties);
  const reviews = useSelector((state) => state.myReviews);
  const [myReviews, setMyReviews] = useState([]);
  const sugs = propertiesSug?.rows?.filter((el) => el.id !== assetDetail.id);
  const token = localStorage.getItem("log");
  const amenidades = useSelector((state) => state.amenities);
  const [amenities, setAmenities] = useState([]);

  console.log("Detalle", amenities);
  const [loading, setLoading] = useState(true);

  // const isFavorite = Array.isArray(favoritesData) && favoritesData.includes(id);
  // console.log("kolor", isFavorite);

  const handlerOnclick = () => {
    const info = localStorage.getItem("data");
    const userData = JSON.parse(info);
    // console.log("idUser", userData.id, "idAsset", id);
    const idUser = userData.id;
    dispatch(favUserProperty(idUser, id));
    alert("Propiedad guardada en favoritos");
    dispatch(getAllFavUserProps(userData.id));
  };
  console.log("APALAPAPAPA", assetDetail);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(getAssetById(id));
        dispatch(SearchByLocation(assetDetail.location, 1));
        dispatch(reviewsGet(id));
        setMyReviews(reviews);
        dispatch(getAmenities());
        console.log(amenidades);
        const amenitiesDetail = amenidades?.filter((ele) => {
          return assetDetail.amenities?.includes(ele.id);
        });
        console.log("klk", amenitiesDetail);
        setAmenities(amenitiesDetail);
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [reviews]);
  useEffect(() => {
    const info = localStorage.getItem("data");
    const userData = JSON.parse(info);
    // console.log("idUser", userData);
    dispatch(getAllFavUserProps(userData.id));
  }, []);

  // useEffect(() => {}, [id, reviews]);
  console.log(myReviews);

  const stars = (stars) => {
    const starDraw = [];
    for (let i = 0; i < stars; i++) {
      starDraw.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          style={{ marginRight: "10px", color: "#9d0aca" }}
          fill="currentColor"
          class="bi bi-star-fill"
          viewBox="0 0 16 16"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
      );
    }
    return starDraw;
  };
  const noStars = (stars) => {
    const starLength = 5 - stars;
    const starNoDraw = [];
    for (let i = 0; i < starLength; i++) {
      starNoDraw.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          style={{ marginRight: "10px", color: "#9d0aca" }}
          class="bi bi-star"
          viewBox="0 0 16 16"
        >
          <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z" />
        </svg>
      );
    }
    return starNoDraw;
  };

  console.log("Soliii", sugs);

  const handlerImage = (e) => {
    console.log(e);
    setImageUrl(e.target.style["background-image"]);
  };

  const renderDetail = loading ? (
    <Loader></Loader>
  ) : assetDetail && assetDetail.name ? (
    <div className={`  ${style.container}`}>
      <div className={style.wrapper}>
        <header></header>

        <div className={style.imageGallery}>
          <aside className={style.thumbnails}>
            <a
              href="#"
              className={`${style.thumbnail}`}
              data-big="http://placekitten.com/420/600"
            >
              <div
                className={style.thumbnailImage}
                style={{
                  backgroundImage: `url(${assetDetail.images[0]})`,
                }}
                onClick={handlerImage}
              ></div>
            </a>

            <a
              href="#"
              className={style.thumbnail}
              data-big="http://placekitten.com/450/600"
            >
              <div
                className={style.thumbnailImage}
                style={{
                  backgroundImage: `url(${assetDetail.images[1]})`,
                }}
                onClick={handlerImage}
              ></div>
            </a>
            <a
              href="#"
              className={style.thumbnail}
              data-big="http://placekitten.com/460/700"
            >
              <div
                className={`${style.thumbnailImage} ${style.lastChild}`}
                style={{
                  backgroundImage: `url(${assetDetail.images[2]})`,
                }}
                onClick={handlerImage}
              ></div>
            </a>
          </aside>

          <main
            className={style.primary}
            style={{
              backgroundImage: imageUrl
                ? imageUrl
                : `url(${assetDetail.images[0]})`,
            }}
          ></main>
        </div>
      </div>
      <div className={`${style.propertyDetails}`}>
        <div className={` ${style.propertyInfo}`}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              boxShadow:
                "0 10px 15px -3px rgba(0,0,0,.1),0 4px 6px -4px rgba(0,0,0,.2 )",
              marginRight: "94%",
            }}
          >
            <p
              style={{
                // border: "1px #b9b9b9 solid",
                padding: "5px",
                paddingInline: "7px",
                fontWeight: "bold",
                fontSize: "19px",
                // marginRight: "96%",
              }}
            >
              {assetDetail?.averageScore} {"  "}
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              style={{ marginRight: "10px", color: "#9d0aca" }}
              fill="currentColor"
              class="bi bi-star-fill"
              viewBox="0 0 16 16"
            >
              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
            </svg>
          </div>
          <h2 style={{ fontWeight: "lighter", color: "#091f44" }}>
            ${assetDetail.rentPrice} USD por noche
          </h2>
          <h1 className={style.heading}> {assetDetail.name}</h1>
          <p className={style.paragraph}>
            <strong>Dirección:</strong> {assetDetail.address},{" "}
            {assetDetail.location}, {assetDetail.country}
          </p>
          <div
            className={style.profile}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <img src={assetDetail.ownerPic} width={50} />
            <p>{assetDetail.ownerName}</p>
          </div>
          <div className={style.icons}>
            <div className={style.fav}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill={true ? "blue" : "currentColor"}
                class="bi bi-heart-fill"
                viewBox="0 0 16 16"
                onClick={() => handlerOnclick(assetDetail.id)}
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                />
              </svg>
            </div>

            <div className={style.fav}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-exclamation-lg"
                viewBox="0 0 16 16"
              >
                <path d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0L7.005 3.1ZM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z" />
              </svg>
            </div>
          </div>
          <div>
            <ul className={style.amenitiesList}>
              <li className={style.amenitiesItem}>
                <img src={bed} width="20"></img>
                <span> Habitaciones:</span> {assetDetail.rooms}
              </li>
              <li className={style.amenitiesItem}>
                <img src={bath} width={"20"}></img>
                <span> Baños:</span> {assetDetail.bathrooms}
              </li>
              <li className={style.amenitiesItem}>
                <img src={ruler} width={"20"}></img>
                <span> Tamaño propiedad:</span> {assetDetail.coveredArea}mt2
              </li>
              <li className={style.amenitiesItem}>
                <img src={allSize} width={"20"}></img>
                <span> Total Area:</span> {assetDetail.totalArea}mt2
              </li>
            </ul>
          </div>
        </div>

        {token ? (
          <div>
            <div>
              <Booking></Booking>
            </div>
          </div>
        ) : (
          <div className={style.alert}>
            <h5>
              Hola! Para rentar esta propiedad debes de estar{" "}
              <b style={{ color: "#e43838" }}>registrado</b> o{" "}
              <b style={{ color: "#e43838" }}>logeado</b>.
            </h5>
            <p>
              {" "}
              Por favor
              <Link to="/checkIn"> Inicia sesión </Link>
              para reservar o<Link to="/checkIn"> créate una cuenta </Link>
              para acceder a todos los beneficios que ofrece esta página
            </p>
          </div>
        )}

        <div className={style.info}>
          <div style={{ display: "flex" }}>
            <div className={style.description}>
              <h2>Descripcion:</h2>
              <p>{assetDetail.description}</p>
            </div>
            <div className={style.googleMap}>
              <Maps location={assetDetail.location} />
            </div>
          </div>
          <div>
            <h2>Servicios que ofrece la propiedad!</h2>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "row",
                width: "100%",
                padding:"20px",
                gap:"20px",
                justifyContent:"center"
              }}
            >
              {amenities &&
                amenities?.map((ele) => {
                  console.log("epaaaaaaaa", amenities);
                  return (
                    <div style={{display:"flex", flexDirection:"column", marginRight:"70px"}}>
                      <img src={ele.svg} width={120} style={{justifyContent:"center", margin:"0 auto"}}></img>
                      <h5 style={{fontSize:"30px", justifyContent:"center", textAlign:"center"}}>{ele.name}</h5>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className={style.reseñas}>
            <h2>Lee las reseñas de los demas huespedes!</h2>
            <div className={style.reseña}>
              {myReviews &&
                myReviews?.map((ele) => {
                  console.log(ele)
                  return (
                    <div className={style.contReseña}>
                      <svg
                        style={{ position: "absolute", top: "15px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        fill="currentColor"
                        class="bi bi-quote"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                      </svg>
                      <svg
                        style={{
                          position: "absolute",
                          bottom: "110px",
                          right: "10px",
                          transform: "scaleX(-1)",
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="60"
                        height="60"
                        fill="currentColor"
                        class="bi bi-quote"
                        viewBox="0 0 16 16"
                      >
                        <path d="M12 12a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1h-1.388c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 9 7.558V11a1 1 0 0 0 1 1h2Zm-6 0a1 1 0 0 0 1-1V8.558a1 1 0 0 0-1-1H4.612c0-.351.021-.703.062-1.054.062-.372.166-.703.31-.992.145-.29.331-.517.559-.683.227-.186.516-.279.868-.279V3c-.579 0-1.085.124-1.52.372a3.322 3.322 0 0 0-1.085.992 4.92 4.92 0 0 0-.62 1.458A7.712 7.712 0 0 0 3 7.558V11a1 1 0 0 0 1 1h2Z" />
                      </svg>
                      <p>
                       {ele?.comment}
                      </p>
                      <div className={style.reseñaWhite}>
                        <h1 style={{ marginTop: "5px", paddingBottom: "0", }}>
                          {console.log(ele)}
                          {ele?.userName}
                        </h1>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "center",
                            marginBottom: "0px",
                            marginTop: "0",
                          }}
                        >
                          {stars(ele?.score)}
                          {noStars(ele?.score)}
                        </div>
                        <p
                          style={{
                            fontSize: "13px",
                            display: "flex",
                            justifyContent: "center",
                            color: "black",
                            padding: "10px",
                          }}
                        >
                          Este usuario evaluo a la propiedad!
                        </p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {!propertiesSug?.count ? (
            ""
          ) : (
            <div className={style.sugs}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h4>
                  Hemos encontrado <span>{propertiesSug?.count - 1}</span>{" "}
                  coincidencias de localidad
                </h4>
                <Link to={`/property?location=${assetDetail.location}`}>
                  Mira las demas propiedades
                </Link>
              </div>

              <div className={style.card}>
                {sugs?.slice(0, 3).map((el) => {
                  return (
                    <Card
                      name={el.name}
                      description={el.description}
                      location={el.location}
                      country={el.country}
                      images={el.images}
                      total={el.rentPrice}
                    ></Card>
                  );
                })}
              </div>
            </div>
          )}

          <div className={style.security}>
            <h3 style={{ fontSize: "10px" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                style={{ marginRight: "5px" }}
                fill="currentColor"
                class="bi bi-shield-check"
                viewBox="0 0 16 16"
              >
                <path d="M5.338 1.59a61.44 61.44 0 0 0-2.837.856.481.481 0 0 0-.328.39c-.554 4.157.726 7.19 2.253 9.188a10.725 10.725 0 0 0 2.287 2.233c.346.244.652.42.893.533.12.057.218.095.293.118a.55.55 0 0 0 .101.025.615.615 0 0 0 .1-.025c.076-.023.174-.061.294-.118.24-.113.547-.29.893-.533a10.726 10.726 0 0 0 2.287-2.233c1.527-1.997 2.807-5.031 2.253-9.188a.48.48 0 0 0-.328-.39c-.651-.213-1.75-.56-2.837-.855C9.552 1.29 8.531 1.067 8 1.067c-.53 0-1.552.223-2.662.524zM5.072.56C6.157.265 7.31 0 8 0s1.843.265 2.928.56c1.11.3 2.229.655 2.887.87a1.54 1.54 0 0 1 1.044 1.262c.596 4.477-.787 7.795-2.465 9.99a11.775 11.775 0 0 1-2.517 2.453 7.159 7.159 0 0 1-1.048.625c-.28.132-.581.24-.829.24s-.548-.108-.829-.24a7.158 7.158 0 0 1-1.048-.625 11.777 11.777 0 0 1-2.517-2.453C1.928 10.487.545 7.169 1.141 2.692A1.54 1.54 0 0 1 2.185 1.43 62.456 62.456 0 0 1 5.072.56z" />
                <path d="M10.854 5.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 7.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
              </svg>
              Consejos de seguridad a la hora de alquilar
            </h3>
            <div
              style={{ display: "flex", width: "100%", alignItems: "center" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <h1 style={{ marginRight: "10px", color: "#091f44" }}>1</h1>
                <p style={{ color: "#091f44" }}>
                  No pagues sin ver la propiedad o tener documentación
                  certificada.
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <h1 style={{ marginRight: "10px", color: "#091f44" }}>3</h1>
                <p style={{ color: "#091f44" }}>
                  Evita compartir información bancaria o contraseñas por
                  mensajes.
                </p>
              </div>
            </div>
            <div
              style={{ display: "flex", width: "100%", alignItems: "center" }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <h1 style={{ marginRight: "10px", color: "#091f44" }}>2</h1>
                <p style={{ color: "#091f44" }}>
                  Precios demasiado bajos pueden ser señal de estafa.
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "left" }}>
                <h1
                  style={{
                    marginLeft: "17px",
                    color: "#091f44",
                    paddingRight: "15px",
                  }}
                >
                  4
                </h1>
                <p style={{ color: "#091f44" }}>
                  Si dudas de una oferta, repórtala para prevenir fraudes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <NotFoundPage></NotFoundPage>
  );

  return <>{renderDetail}</>;
};

export default Detail;
