import React from "react";
const HeaderComponent = () => {
  return (
      <div
          style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "70px",
              // backgroundColor: "#f8f9fa", // optional: navbar-like background
              gap: "15px", // spacing between logo and text
          }}
      >
          <img
              src="src/assets/svislogo.png" // replace with your actual path or URL
              alt="School Logo"
              style={{ width: "50px", height: "50px", objectFit: "contain" }}
          />

          <a
              className="navbar-brand mb-0 h1"
              href="https://sunvalleyncr.in/"
              style={{
                  fontSize: "24px",
                  textAlign: "center",
                  color: "inherit",
                  textDecoration: "none",
              }}
          >
              Sun Valley International School Alumni Portal
          </a>
      </div>


  );
};

export default HeaderComponent;
