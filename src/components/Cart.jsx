import React, { useState } from "react";
import { GiShoppingCart } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";

import "./cart.css";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart, resetCart } from "../redux/CartSlice";
import { GrPowerReset } from "react-icons/gr";

const Cart = () => {
  const [listOpen, setListOpen] = useState(false);

  const products = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  const handleOpen = () => {
    listOpen ? setListOpen(false) : setListOpen(true);
  };
  return (
    <div className="cart">
      <div onClick={products.length > 0 ? handleOpen : undefined}>
        <GiShoppingCart className="cart-icon" />
      </div>
      <div className="cart-badge">{products.length}</div>
      {listOpen ? (
        <ul className="cart-list">
          {products.map((product) => (
            <li key={product.id} className="cart-item">
              <img src={product.image} alt="" className="cart-item-image" />
              <span className="cart-item-title">{product.title}</span>
              <span className="cart-item-price">{product.price}</span>
              <span className="cart-item-delete">
                <RiDeleteBin6Line
                  onClick={() => {
                    dispatch(
                      removeFromCart({
                        id: product.id,
                      })
                    );
                  }}
                />
              </span>
            </li>
          ))}
          <span className="cart-item-delete">
            {listOpen && products.length > 0 && (
              <div className="cart-reset-button">
                <GrPowerReset onClick={() => dispatch(resetCart())} />
              </div>
            )}
          </span>
        </ul>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
