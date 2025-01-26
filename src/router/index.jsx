// HOOKS
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegistrationPage";
import LandingPage from "../pages/LandingPage";
import LoanForm from "../components/ui/LoanForm";
import NavBar from "../components/common/Navbar";
// PAGES & COMPONENTS
function AppRouter() {
  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  return (
    <BrowserRouter>
      {/* <ScrollTop /> */}
      <NavBar />
      <Routes>
        {/* AUTH ROUTES STACK */}
        <Route path="/auth" element={<Outlet />}>
          <Route path="signup" element={<RegisterPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="forgotpassword" element={<ForgotPasswordPage />} />
        </Route>

        {/* ADMIN ROUTES STACK */}
        <Route
          path="/admin"
          element={
            //   loggedInUser?.isLogIn &&
            //  loggedInUser?.email == "admin@gmail.com"
            <Outlet />
          }
        >
          <Route index element />
          <Route path="users" element />
          <Route path="products" element />
          <Route path="profile" element />
          <Route path="orders" element />
        </Route>
        {/* USER ROUTES STACK */}
        <Route
          path="/user"
          element={
            loggedInUser?.isLogIn ? (
              <>
                <Outlet />
              </>
            ) : (
              <Navigate to={"/"} />
            )
          }
        >
          <Route path="profile" element />
          <Route path="orders" element />
        </Route>

        {/* HOME ROUTES STACK */}
        <Route
          path="/"
          element={
            <>
              <Outlet />
            </>
          }
        >
          <Route index element={<LandingPage />} />
          <Route path="apply/:category/:subcategory" element={<LoanForm />} />
          <Route path="loan-form" element={<LoanForm />} />

          <Route path="hero" element />
          <Route path="services" element />
          <Route path="categories" element />
          <Route path="featuredproducts" element />
          <Route path="cartitems" element />
          <Route path="checkout" element />
          <Route path="productlisting/:searchQuery" element />
          <Route path="*" element />
        </Route>
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  );
}
export default AppRouter;
