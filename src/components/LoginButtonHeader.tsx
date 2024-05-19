// import { useState, useEffect } from "react";
import { Menu, Dropdown } from 'antd';
import { LogoutOutlined, DownOutlined } from '@ant-design/icons';
// @ts-ignore
import Avatar from "/src/assets/svgs/Avatar"; // Assuming Avatar is a default export from the given path
// @ts-ignore
import { logout } from "../api"; // Importing API function

interface LoginButtonHeaderProps {
  userData: {
    first_name?: string;
    photo_url?: string;
  };
  at: string;
}

function LoginButtonHeader({ userData, at }: LoginButtonHeaderProps) {
  // const [loginStatus, setLoginStatus] = useState(false);
  // const [hover, setHover] = useState(false); // State to track hover status

  // useEffect(() => {
  //   // Fetch and set the login status from localStorage
  //   const storedLoginStatus = localStorage.getItem("loginStatus") === "true";
  //   setLoginStatus(storedLoginStatus);
  // }, []);

  const clearAllCookies = (domain: string) => {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;domain=${domain}`;
    }
  };

  const handleLogout = () => {
    console.log('Logging out...');
    logout(at)
      .then((response: any) => {
        console.log(response);

        // Clear local storage
        localStorage.clear();

        // Clear session storage
        sessionStorage.clear();

        // Clear cookies for current domain and Telegram's OAuth domain
        clearAllCookies(window.location.hostname);
        clearAllCookies(".telegram.org");
        clearAllCookies("oauth.telegram.org");

        // Optionally, redirect to login page or home page
        window.location.href = "/"; // Update the URL as per your routing
      })
      .catch((error: any) => {
        console.error("There was a problem with the Axios request:", error);
      });
  };

  const displayName = userData?.first_name
    ? userData.first_name.length > 8
      ? `${userData.first_name.slice(0, 8)}...`
      : userData.first_name
    : "Login";

  const menu = (
    <Menu>
      <Menu.Item key="logout" onClick={handleLogout}>
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']} disabled={!userData?.first_name}>
      <div
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: userData?.first_name ? "flex-start" : "center",
          borderRadius: "12px",
          overflow: "hidden",
          height: "61px",
          width: "168px",
          boxShadow: "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
          backgroundColor: "#FFF",
          cursor: "pointer",
          padding: "0 20px"
        }}
        // onMouseEnter={() => userData?.first_name && setHover(true)}
        // onMouseLeave={() => userData?.first_name && setHover(false)}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            background: "#EDEDED",
            marginRight: userData?.first_name ? "10px" : "6px"
          }}
        >
          {userData?.photo_url ? (
            <img
              src={userData.photo_url}
              alt="User Avatar"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          ) : (
            <Avatar
              src="placeholder_avatar_url_here" // Placeholder or actual avatar URL
              alt="Default Avatar"
              style={{ width: "40px", height: "40px", borderRadius: "50%" }}
            />
          )}
        </div>
        <span
          style={{
            fontFamily: "Scandia-Regular",
            fontSize: "16px",
            color: "#232D42",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            // overflow: "hidden",
            maxWidth: userData?.first_name ? "calc(100% - 60px)" : "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: userData?.first_name ? "flex-start" : "center"
          }}
        >
          {displayName}
          {userData?.first_name && (
            <DownOutlined
              style={{
                marginLeft: "8px",
                fontSize: "12px",
                // verticalAlign: "middle"
              }}
            />
          )}
        </span>
      </div>
    </Dropdown>
  );
}

export default LoginButtonHeader;
