import { React } from "react";
import { useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";
import { FaRegCircle } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { BiAdjust, BiLoader } from "react-icons/bi";
import { DiCodeigniter } from "react-icons/di";
import { BsThreeDots } from "react-icons/bs";

import {
  BsCheckCircleFill,
  BsFillExclamationSquareFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import "./DashBoard.css";
import Card from "../Card/Card";
const DashBoard = () => {
  const isStatus = localStorage.getItem("group") === "status";
  const isPriority = localStorage.getItem("group") === "priority";
  console.log("stat", isStatus, "prio", isPriority);
  const { selectedData, user } = useSelector(
    (state) => state.SelectDataReducer
  );
  console.log("rere", user);
  return (
    selectedData && (
      <div
        className="dashContainer"
        style={{ display: "flex", justifyContent: "space-around" }}
      >
        {selectedData.map((element, index) => {
          const cardWidthPercentage = 18.7;
          return (
            <div
              key={index}
              className="dashCardContainer"
              style={{ width: `${cardWidthPercentage}%` }}
            >
              <div className="dashCardHeading flex-sb">
                <div className="leftView" style={{ display: "flex" }}>
                  {user ? (
                    <div
                      className="imageContainer relative"
                      style={{
                        width: "10px",
                        height: "15px",
                        display: "flex",
                      }}
                    ></div>
                  ) : isStatus ? (
                    <div
                      className="cardTitle"
                      style={{
                        width: "15px",
                        height: "15px",
                        display: "flex",
                        fontWeight: 200,
                      }}
                    >
                      {element[index].title === "Backlog" ? (
                        <BiLoader
                          style={{ fontSize: "13px", marginTop: "4px" }}
                        />
                      ) : element[index].title === "Todo" ? (
                        <FaRegCircle
                          style={{
                            fontSize: "13px",
                            color: "gray",
                            marginTop: "4px",
                          }}
                        />
                      ) : element[index].title === "In progress" ? (
                        <BiAdjust
                          style={{
                            fontSize: "13px",
                            color: "#f2d750",
                            marginTop: "4px",
                          }}
                        />
                      ) : element[index].title === "Done" ? (
                        <BsCheckCircleFill style={{ marginTop: "4px" }} />
                      ) : (
                        <IoMdCloseCircleOutline style={{ marginTop: "4px" }} />
                      )}
                    </div>
                  ) : isPriority ? (
                    <div
                      className="tags color-grey"
                      style={{
                        width: "35px",
                        height: "30px",
                        display: "flex",
                      }}
                    >
                      {element[index].title === "Low" ||
                      element[index].title === "Medium" ||
                      element[index].title === "High" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          fill="currentColor"
                          className="bi bi-signal"
                          viewBox="0 0 16 16"
                        >
                          <rect x="1" y="10" width="3" height="2" />
                          <rect
                            x="5"
                            y="7"
                            width="3"
                            height="5"
                            opacity={
                              element[index].title === "Medium" ||
                              element[index].title === "High"
                                ? 1
                                : 0.25
                            }
                          />
                          <rect
                            x="9"
                            y="4"
                            width="3"
                            height="8"
                            opacity={element[index].title === "High" ? 1 : 0.25}
                          />
                        </svg>
                      ) : element[index].title === "Urgent" ? (
                        <BsFillExclamationSquareFill />
                      ) : (
                        <p></p>
                      )}
                    </div>
                  ) : (
                    <DiCodeigniter />
                  )}{" "}
                  <span
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    {element[index]?.title}
                    <div style={{ marginLeft: "13px", color: "#8d8f93" }}>
                      {element[index].value?.length}
                    </div>
                  </span>
                </div>
                <div className="rightView">
                  <AiOutlinePlus color="#8d8f93" />{" "}
                  {/* <span style={{ letterSpacing: "2px" }}>...</span> */}
                  <BsThreeDots color="#8d8f93" />
                </div>
              </div>
              <div className="dashList flex-gap-10">
                {element[index]?.value?.map((element, ind) => {
                  return (
                    <Card
                      id={element.id}
                      title={element.title}
                      tag={element.tag}
                      status={element.status}
                      priority={element.priority}
                    />
                  );
                })}
              </div>
            </div>
          );
        })}
        {isStatus && (
          <>
            <div className="dashCardHeading flex-sb">
              <div
                className="leftView"
                style={{
                  fontSize: "15px",
                  marginRight: "90px",
                  wordSpacing: "4px",
                }}
              >
                <div
                  className="cardTitle"
                  style={{
                    width: "13px",
                    height: "13px",
                    display: "inline-block",
                    fontWeight: 200,
                  }}
                >
                  <BsFillCheckCircleFill style={{ color: "blue" }} />
                </div>{" "}
                <span style={{ fontSize: "13px", fontWeight: "lighter" }}>
                  Done
                </span>{" "}
                <span style={{ fontSize: "13px", color: "#8F9997" }}>0</span>
              </div>
            </div>
            <div className="dashCardHeading flex-sb">
              <div
                className="leftView"
                style={{
                  fontSize: "15px",
                  marginRight: "60px",
                  wordSpacing: "4px",
                }}
              >
                <div
                  className="cardTitle"
                  style={{
                    width: "9px",
                    height: "9px",
                    display: "inline-block",
                    fontWeight: 200,
                  }}
                >
                  <MdCancel style={{ color: "grey" }} />
                </div>{" "}
                <span style={{ fontSize: "13px", fontWeight: "lighter" }}>
                  Canceled
                </span>{" "}
                <span style={{ fontSize: "13px", color: "#8F9997" }}>0</span>
              </div>
            </div>
          </>
        )}
      </div>
    )
  );
};
export default DashBoard;
