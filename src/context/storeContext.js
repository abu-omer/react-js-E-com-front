import { createContext, useState } from "react";
// import axios from "axios";

const StoreContext = createContext({});

export const StoreProvider = ({ children }) => {
  //   const [products, setProducts] = useState([]);
  //   const [error, setError] = useState();
  //   const [loding, setLoading] = useState();
  const [categoryName, setCategoryName] = useState("all");

  //   useEffect(() => {
  //     const token = useSelector((state) => state.user.user.accessToken);
  //     console.log("token", token);
  //     const fetchProductsconst = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:3000/api/v1/products/${categoryName}`,
  //           {
  //             headers: {
  //               Authorization: `Bearer ${token}`, // Pass token in Authorization header
  //             },
  //           }
  //         );
  //         setProducts(response.data);
  //       } catch (error) {
  //         setError(error.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     fetchProductsconst();
  //   }, [categoryName, products]);

  //   useEffect(() => {
  //     const fetchPatients = async () => {
  //       try {
  //         const response = await axios.get(
  //           `http://localhost:3000/api/v1/products/category/${categoryName}`
  //         );
  //         setProducts(response.data);
  //       } catch (error) {
  //         setError(error.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     };

  //     fetchPatients();
  //   }, [categoryName]);

  return (
    <StoreContext.Provider
      value={{
        // products,
        // setProducts,
        // loding,
        // error,
        categoryName,
        setCategoryName,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContext;
