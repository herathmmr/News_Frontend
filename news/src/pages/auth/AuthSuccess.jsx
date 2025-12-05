import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function AuthSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    if (token) {
      localStorage.setItem("token", token);
      toast.success("Login successful!");
      
      // Decode token to check user role
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/home");
        }
      } catch (err) {
        navigate("/home");
      }
    } else if (error) {
      toast.error("Authentication failed. Please try again.");
      navigate("/login");
    } else {
      toast.error("Invalid authentication response");
      navigate("/login");
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-700 font-medium">Processing authentication...</p>
      </div>
    </div>
  );
}