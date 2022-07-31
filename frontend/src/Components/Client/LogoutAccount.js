import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, reset } from "../../Features/AuthSlice";
import { clearCart } from "../../Features/cartSlice";
const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(reset());
    dispatch(clearCart());
    dispatch(logout()).then(() => {
      navigate("/");
    });
  }, []);
  return <div></div>;
};
export default Logout;
