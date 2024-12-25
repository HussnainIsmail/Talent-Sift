'use client';
import React, { useEffect} from "react";
import AdminSideBar from "../admin/components/AdminSideBar";
import Header from "../admin/components/header";
import { useRouter } from 'next/navigation';


export default function AdminLayout({ children }) {
      const router = useRouter();
  
  useEffect(() => {
    const role = localStorage.getItem('role');

    // If the role is not admin, redirect to the homepage or another route
    if (role == 'user') {
      router.push('/');  // Redirect to the homepage or any other route you prefer
    }
  }, [router]);
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
