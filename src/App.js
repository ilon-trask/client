import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { authRoutes, publicRoutes } from "./routes";
import css from "./App.css";
import { useContext, useEffect } from "react";
import { Context } from "./index";
import { observer } from "mobx-react-lite";

function App() {
  const { map } = useContext(Context);
  const URL = "http://localhost:5000/api/cart";
  function getMaps() {
    fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        map.maps = res;
        let ids = map.maps.map((el) => el.id);
        for (let i = 0; i < ids.length; i++) {
          getOpers(ids[i]);
        }
      });
  }

  function getOpers(id) {
    fetch("http://localhost:5000/api/cart/" + id)
      .then((res) => res.json())
      .then((res) => {
        res.forEach((el) => {
          getProps(id, el.id, el.cell);
        });
        map.newOper = res;
      });
  }
  function getProps(id, el, cell) {
    console.log(id);
    console.log(el);
    fetch(`http://localhost:5000/api/cart/${id}/${el}/${cell}`)
      .then((res) => res.json())
      .then((el) => {
        if (cell == "costMaterials") {
          map.newCostMaterials = el[0];
        } else if (cell == "costServices") {
          console.log(el[0]);
          map.newCostServices = el[0];
        }
      });
  }
  useEffect(() => {
    getMaps();
  }, []);

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
