import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { adminMenu, userMenu } from "./../data/Data";
import { Badge, message } from "antd";
import "../styles/LayoutStyles.css";
const Layout = ({ children }) => {
  const location = useLocation();
  const idparam = useParams();
  console.log(idparam);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  // logout function
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout Successfully");
    navigate("/login");
  };

  // ====== doctor menu start ======
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appoinments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-users",
    },
  ];
  // ====== doctor menu end ======

  // rendering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h6>DAS APP</h6>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}

              <div className={`menu-item `} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to={"/login"}>Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content">
                {
                  <h4 className="fw-bold">
                    {location.pathname === `/`
                      ? "Home"
                      : location.pathname === `/appointments`
                      ? "Appointments List"
                      : location.pathname === `/apply-doctor`
                      ? "Apply Doctor"
                      : location.pathname === `/notification`
                      ? "Notifications"
                      : location.pathname ===
                        `/doctor/book-appointment/${idparam.doctorId}`
                      ? "Booking Here"
                      : location.pathname === `/doctor-appointments`
                      ? "Doctor Appointment List"
                      : location.pathname === `/doctor/profile/${idparam.id}`
                      ? "Manage Profile"
                      : null}
                  </h4>
                }
                <div
                  className="align-items-center justify-content-center d-flex"
                  style={{ cursor: "pointer" }}
                >
                  <Badge
                    count={user && user.notification.length}
                    onClick={() => {
                      navigate("/notification");
                    }}
                  >
                    <i
                      className="fa-solid fa-bell me-2"
                      style={{ color: "#5A607F" }}
                    ></i>
                  </Badge>
                  <Link to={"/profile"}>{user?.name}</Link>
                </div>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
