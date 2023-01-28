import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState(0);
  const [foodStock, setFoodStock] = useState(0);
  const [foodType, setFoodType] = useState("");
  const [foodMenu, setFoodMenu] = useState([]);
  const [newFoodPrice, setNewFoodPrice] = useState(0);

  console.log("foodName", foodName);
  console.log("foodPrice", foodPrice);
  console.log("foodStock", foodStock);
  console.log("foodType", foodType);
  console.log("foodMenu", foodMenu);
  console.log("newFoodPrice", newFoodPrice);

  function addToMenu() {
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      foodPrice: foodPrice,
      foodStock: foodStock,
      foodType: foodType,
    }).then(() => {
      window.location.reload();
    });
  }

  useEffect(() => {
    Axios.get("http://localhost:3001/view").then((response) => {
      setFoodMenu(response.data);
    });
  }, []);

  function updateFoodPrice(id) {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newFoodPrice: newFoodPrice,
    }).then(() => {
      window.location.reload();
    });
  }

  function deleteFood(id) {
    Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
      window.location.reload();
    });
  }

  return (
    <>
      <h1>JOLLIBEE MENU</h1>
      <label htmlFor="foodName">FOOD NAME:</label>
      <br />
      <input
        type="text"
        name="foodName"
        onChange={(e) => setFoodName(e.target.value)}
      />
      <br />
      <label htmlFor="foodPrice">PRICE:</label>
      <br />
      <input
        type="number"
        name="foodPrice"
        onChange={(e) => setFoodPrice(e.target.value)}
      />
      <br />
      <label htmlFor="foodStock">STOCKS:</label>
      <br />
      <input
        type="number"
        name="foodStocks"
        onChange={(e) => setFoodStock(e.target.value)}
      />
      <br />
      <label htmlFor="foodType">TYPE:</label>
      <br />
      <input
        type="text"
        name="foodType"
        onChange={(e) => setFoodType(e.target.value)}
      />
      <br />
      <br />
      <button onClick={addToMenu}>ADD TO MENU</button>

      <table>
        <thead>
          <tr>
            <td>FOOD NAME</td>
            <td>FOOD PRICE</td>
            <td>FOOD STOCK</td>
            <td>FOOD TYPE</td>
          </tr>
        </thead>
        <tbody>
          {foodMenu.map((p) => {
            console.log("id", p._id);
            return (
              <tr key={p._id}>
                <td>{p.foodName}</td>
                <td>{p.foodPrice}</td>
                <td>{p.foodStock}</td>
                <td>{p.foodType}</td>
                <td>
                  <input
                    type="number"
                    placeholder="update food price"
                    onChange={(e) => {
                      setNewFoodPrice(e.target.value);
                    }}
                  />
                  <button
                    onClick={() => {
                      updateFoodPrice(p._id);
                      console.log("the id", p._id);
                    }}
                  >
                    UPDATE
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      deleteFood(p._id);
                    }}
                  >
                    DELETE
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default App;
