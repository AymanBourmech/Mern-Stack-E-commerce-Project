import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, reset } from "../../Features/AuthSlice";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(reset());
    dispatch(logout()).then(() => {
      navigate("/login");
    });
  }, []);

  return <div></div>;
};
export default Logout;
