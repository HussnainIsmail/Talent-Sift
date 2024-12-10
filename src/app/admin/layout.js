'use client';
import React from "react";
import AdminSideBar from "../admin/components/AdminSideBar";
import Header from "../admin/components/header";


export default function AdminLayout({ children }) {
  return (
    <div className="container-fluid">
      <div className="row">    
        <AdminSideBar/> 
        <div className="col-10 offset-2 bg-light">
          <Header />
          <div style={{ marginTop: "80px", overflowY: "auto", height: "calc(100vh - 80px)" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
