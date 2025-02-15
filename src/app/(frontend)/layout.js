'use client';
import React, { useEffect } from "react";
import AdminSideBar from "../admin/components/AdminSideBar";
import Header from "../admin/components/header";
import { useRouter } from 'next/navigation';
import NavBar from "@/sections/NavBar";


export default function AdminLayout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem('role');

    if (role == 'user') {
      router.push('/');
    }
  }, [router]);
  return (
    <div className="container-fluid p-0">
    <NavBar/>
            {children}  
    </div>
  );
}
