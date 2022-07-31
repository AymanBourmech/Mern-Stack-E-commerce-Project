import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getArticles } from "../../Features/articleSlice";
import AfficheArticles from "../Articles/AfficheArticles";
const Listarticles = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  return (
    <div>
      <AfficheArticles />
    </div>
  );
};
export default Listarticles;
