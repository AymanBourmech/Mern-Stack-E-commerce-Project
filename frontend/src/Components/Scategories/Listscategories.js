import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getScategories } from "../../Features/scategorieSlice";
import AfficheScategories from "../Scategories/AfficheScategories";
const Listscategories = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getScategories());
  }, [dispatch]);

  return (
    <div>
      <AfficheScategories />
    </div>
  );
};
export default Listscategories;
