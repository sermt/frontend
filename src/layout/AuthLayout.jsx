import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto md:grid grid-cols-2 mt-5 p-5 gap-10">
      <Outlet />
      </main>
    </>
  );
};

export default AuthLayout;