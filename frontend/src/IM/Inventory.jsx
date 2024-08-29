import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [quantity, setQuantity] = useState({}); // Store quantity for each item

  useEffect(() => {
    // Fetch all inventory items on component mount
    axios
      .get("http://localhost:3000/auth/getitems")
      .then((res) => {
        console.log(res);
        setItems(res.data);
      })
      .catch((err) => {
        console.error("Error fetching inventory items:", err);
        toast.error("Failed to load inventory items");
      });
  }, []);

  const handleQuantityChange = (e, itemId) => {
    setQuantity({
      ...quantity,
      [itemId]: e.target.value,
    });
  };

  const handleRequestItem = (item) => {
    console.log(item);
    const requestedQuantity = quantity[item.id];
    console.log(item.id);

    axios
      .post("http://localhost:3000/auth/requestitem", {
        itemid: item.id,
        quantity: requestedQuantity,
        pmid: localStorage.getItem("user_id"),
        item: item.item,
      })
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        console.error("Error requesting item:", err);
        toast.error("Failed to request item");
      });
  };

  return (
    <div className="container">
      <ToastContainer position="top-center" />
      <h1 className="my-4">Inventory</h1>
      <div className="row">
        {items.length > 0 ? (
          items.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card">
                <img
                  src={item.imgurl}
                  alt={item.item}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{item.item}</h5>
                  <p className="card-text">
                    Cost per piece: ₹{item.cost} <br />
                    Quantity Available: {item.quantity}
                  </p>
                  <input
                    type="number"
                    className="form-control mb-2"
                    placeholder="Enter quantity"
                    min="1"
                    max={item.quantity}
                    value={quantity[item.id] || ""}
                    onChange={(e) => handleQuantityChange(e, item.id)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={() => handleRequestItem(item)}
                  >
                    Request Item
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No items available in the inventory.</p>
        )}
      </div>
    </div>
  );
};

export default Inventory;
