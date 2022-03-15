import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function AdminLayout() {
  // const { auth, loading } = useAuth();
  const auth = useSelector(state=>state.auth)
  useEffect(() => {
    const token = localStorage.getItem("my-token");
    if (!token) {
      window.location.href="/"
    }
}, [])
  if (auth.isLoading) return "Loading...";
  return (
    <>
      <Header />
      <main className="container mx-auto mt-10">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}