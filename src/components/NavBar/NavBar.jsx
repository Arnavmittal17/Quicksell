import React, { useEffect, useRef, useState } from "react";
import { TiThList } from "react-icons/ti";
import { GoChevronDown } from "react-icons/go";
import "./NavBar.css";
import { useSelector, useDispatch } from "react-redux";
import { selectData } from "../../Actions/DataAction";

localStorage.setItem("group", "status");
localStorage.setItem("order", "priority");

const getOrder = () => {
  if (localStorage.getItem("order")) {
    return localStorage.getItem("order");
  } else {
    return "priority";
  }
};

const getGroup = () => {
  if (localStorage.getItem("group")) {
    return localStorage.getItem("group");
  } else {
    return "status";
  }
};

const NavBar = () => {
  const [displayOnClick, setDisplayOnClick] = useState(false);
  const dispatch = useDispatch();
  const { allTickets, allUser } = useSelector((state) => state.DataReducer);
  const [groupValue, setGroupValue] = useState(getGroup());
  const [orderValue, setOrderValue] = useState(getOrder());

  const dropdownRef = useRef(null);

  const handleGroupValue = (e, valueBool) => {
    if (valueBool) {
      setGroupValue(e.target.value);
      setDisplayOnClick(false); // Close dropdown after selecting
      localStorage.setItem("group", e.target.value);
    } else {
      setOrderValue(e.target.value);
      setDisplayOnClick(false); // Close dropdown after selecting
      localStorage.setItem("order", e.target.value);
    }
  };

  useEffect(() => {
    if (groupValue === "user") {
      dispatch(
        selectData(
          groupValue,
          {
            allTickets,
            allUser,
          },
          orderValue
        )
      );
    } else {
      dispatch(selectData(groupValue, allTickets, orderValue));
    }
  }, [allTickets, dispatch, groupValue, allUser, orderValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDisplayOnClick(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="top-header" style={{ paddingLeft: "3rem" }}>
      <div className="displayButton" ref={dropdownRef}>
        <button
          className="p-10 f-16 btn "
          onClick={() => setDisplayOnClick(!displayOnClick)}
        >
          <TiThList /> Display
          <GoChevronDown />
        </button>
        {displayOnClick && (
          <div
            className="dropOnClick flex-gap-10 p-10"
            style={{ padding: "14px" }}
          >
            <div className="selectGroup flex-sb">
              <span
                style={{
                  fontSize: "14px",
                  color: "#555B5A",
                  paddingRight: "30px",
                }}
              >
                Grouping
              </span>
              <select
                value={groupValue}
                onChange={(e) => handleGroupValue(e, true)}
                className="selectStyle"
                name="group"
                id="group"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="selectGroup flex-sb">
              <span
                style={{
                  fontSize: "14px",
                  color: "#555B5A",
                  paddingRight: "30px",
                }}
              >
                Ordering
              </span>
              <select
                value={orderValue}
                onChange={(e) => handleGroupValue(e, false)}
                className="selectStyle"
                name="order"
                id="order"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
