import { useDispatch, useSelector } from "react-redux";
import "../../App.css";
import { addToCart } from "../../Features/cartSlice";
import { getArticles } from "../../Features/articleSlice";
import { useEffect } from "react";
import { getTotals } from "../../Features/cartSlice";
const Card = () => {
  const { articles } = useSelector((state) => state.articles);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getArticles());
    dispatch(getTotals());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div className="home-container positionCont">
      <h2>Nouvel Arrivage</h2>
      <div className="products">
        {articles &&
          articles?.map((product) => (
            <div key={product._id} className="product">
              <h3 style={{ height: 40 }}>{product.designation}</h3>
              <img
                src={`data:image/image/png;base64,${product.imageartpetitf}`}
                alt={product.designation}
                height="200"
              />

              <div className="details">
                <span>{product.marque}</span>
                <span className="price"> {product.prixVente} TND</span>
              </div>
              <button
                onClick={() => handleAddToCart(product)}
                style={{ height: 40 }}
              >
                Ajouter au panier
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Card;
