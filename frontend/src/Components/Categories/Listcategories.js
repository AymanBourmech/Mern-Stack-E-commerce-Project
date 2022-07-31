import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "../../Features/categorieSlice";
import AfficheCategories from "../Categories/AfficheCategories";
const Listcategories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div>
      <AfficheCategories />
    </div>
  );
};
export default Listcategories;
