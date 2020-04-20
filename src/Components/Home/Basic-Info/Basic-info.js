import React, { useState, useEffect } from "react";
import axios from "axios";

const BasicInformation = (props) => {
  const [userInfo, setInfo] = useState();
  const BASE_URL_API = window.BASE_URL_API
  // const username = "akashraj9828"
  const username=props.username ? props.username : "torvalds"
  const FULL_API_URL = BASE_URL_API + username;


  const getUserInfo = async () => {
    let responce = await axios.get(FULL_API_URL);
    const userData = responce.data;
    setInfo(userData.data.user);
  }

  //On load bind data with UI
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <section className="pt-5 text-center">
      {userInfo ? 
        <div className="card p-4">
          <div className="row">
            <div className="left-image-avtar">
              <div className="member-image">
                <img src={userInfo.avatarUrl} alt={`${username}`} />
              </div>
            </div>
            <div className="col-sm-5 text-left">
              <div className="user-details pl-2">
                <h2 className="font-size-21 mb-3 ">{userInfo.name}</h2>
                <p className="font-size-13 mb-1">{userInfo.bio}</p>
                <p className="font-size-13 mb-1">
                  <i className="fa fa-envelope-o email" aria-hidden="true"></i>
                  {userInfo.email ? userInfo.email : "No email added"}
                </p>
                <p className="font-size-13 mb-1">
                  <i className="fa fa-github git-icon" aria-hidden="true"></i>
                  <a className="text-dark" target="_blank" href={userInfo.url}>
                    {userInfo && userInfo.login}
                  </a>
                </p>
                <p className="font-size-13 mb-1">
                  <i className="fa fa-map-marker git-icon" aria-hidden="true"></i>
                  {userInfo.location}
                </p>
              </div>
            </div>
            <div className="col-sm-5">
              <div className="d-flex follow-details justify-content-end text-right">
                <div>
                Fllowers  <img src={process.env.PUBLIC_URL + "/img/octocat.png"} />
                  <p className="font-size-12 mb-0 mt-1 total-badge">
                    {userInfo["followers"].totalCount}
                  </p>
                </div>
                <div className="ml-5">
                <span>Fllowing</span>  <img src={process.env.PUBLIC_URL + "/img/octocat.png"} />
                  <p className="font-size-12 mb-0 mt-1 total-badge">
                    {userInfo["following"].totalCount}
                  </p>
                </div>

                <div className="ml-5">
                <span>Repository</span>  <img src={process.env.PUBLIC_URL + "/img/octocat.png"} />
                  <p className="font-size-12 mb-0 mt-1 total-badge">
                  {userInfo["repositories"].totalCount}
                  </p>
                </div>
              </div>
              <ul className="p-0 m-0 list-unstyled d-flex justify-content-end font-size-12 mt-4">
                <li className="mr-3">
                  <i
                    style={{ color: "#FF9800" }}
                    className="fa fa-comment"
                    aria-hidden="true"
                  ></i>
                  Total Commit : <span className="font-weight-bold">973</span>
                </li>
                <li>
                  <i
                    style={{ color: "#00BCD4" }}
                    className="fa fa-star"
                    aria-hidden="true"
                  ></i>{" "}
                  Total Star : <span className="font-weight-bold">23</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      : 
        "Pleas wait ..."
      }
    </section>
  );
};

export default BasicInformation;