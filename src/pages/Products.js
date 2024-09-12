// import { useContext } from "react";
import axios from "axios";
import "./products.css";
import { useEffect, useContext } from "react";
// import StoreContext from "../context/storeContext";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/CartSlice";
import { deleteProduct } from "../redux/ProductsSlice";
import { fetchProducts } from "../redux/productsActions";
import StoreContext from "../context/storeContext";

const Products = () => {
  // const { products } = useContext(StoreContext);
  const dispatch = useDispatch();

  const token = useSelector((state) => state.user.user.accessToken);
  const products = useSelector((state) => state.products.products); // Select products from Redux store
  const { categoryName } = useContext(StoreContext);
  useEffect(() => {
    if (token) {
      dispatch(fetchProducts({ categoryName, token }));
    }
  }, [categoryName, token, dispatch]);
  // const status = useSelector((state) => state.products.status);
  // const error = useSelector((state) => state.products.error);

  const handleDelete = async (productId) => {
    console.log(productId);
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/products/delete/${productId}`
      );
      dispatch(deleteProduct(productId));
    } catch (error) {
      console.log(error.message);
    }
  };

  // const handleError = (e) => {
  //   e.target.src = "path/to/placeholder/image.jpg"; // Path to placeholder image
  // };

  return (
    <div className="flex">
      {products.map((product) => (
        <div key={product._id} className="product-card">
          <h2 className="product-title">{product.title}</h2>
          <div className="product-description">{product.description}</div>
          <div className="product-price">{product.price}</div>
          <div>
            {product.categories.map((category) => (
              <span key={category._id}>{category.name}</span>
            ))}
          </div>
          <img
            className="product-image"
            src={product.image}
            // E:\projects\projone\backend\uploads
            alt={product.title}

            // onError={handleError}
          />
          <button
            onClick={() => {
              dispatch(
                addToCart({
                  id: product._id,
                  title: product.title,
                  discrption: product.description,
                  image: product.image,
                  price: product.price,
                })
              );
            }}
            className="ptn"
          >
            ADD TO CART
          </button>
          <button
            onClick={() => {
              handleDelete(product._id);
            }}
            className="ptn"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;
