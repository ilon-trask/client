import React, { useContext, useState } from "react";
import { Context } from "../index";
import css from "./Dialog.module.css";

export default function MapInputs({
  open,
  setOpen,
  update,
  setUpdate,
  res,
  setRes,
  getMaps,
  createMap,
  URL,
}) {
  let { map } = useContext(Context);
  let [err, setErr] = useState(false);

  function updateMap(res) {
    fetch("http://localhost:5000/api/cart", {
      method: "PATCH",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(res),
    }).then(() => {
      getMaps();
    });
  }

  return (
    <div
      style={open ? { display: "flex" } : { display: "none" }}
      className={css.dialog}
      onClick={() => {
        setOpen(false);
        if (update) {
          setUpdate(false);
          setRes({
            nameCart: "",
            area: "",
            salary: "",
            priceDiesel: "",
          });
        }
      }}
    >
      <div
        className={css.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h4>Загальні показники для розрахунку</h4>
        <div className="d-flex gap-3 ">
          <div>
            <p>Назва культури</p>
            <input
              placeholder="Вкажіть дату"
              type="text"
              value={res.nameCart}
              onChange={(e) => {
                setRes({ ...res, nameCart: e.target.value });
              }}
            />
          </div>
          <div>
            <p>Площа, га</p>
            <input
              placeholder="Вкажіть дату"
              type="number"
              onChange={(e) => {
                setRes({ ...res, area: e.target.value });
              }}
              value={res.area}
            />
          </div>
          <div>
            <p>Розрахункова ЗП, грн</p>
            <input
              placeholder="Вкажіть дату"
              type="number"
              onChange={(e) => {
                setRes({ ...res, salary: e.target.value });
              }}
              value={res.salary}
            />
          </div>
          <div>
            <p>Ціна ДП, грн</p>
            <input
              placeholder="Вкажіть дату"
              type="number"
              onChange={(e) => {
                setRes({ ...res, priceDiesel: e.target.value });
              }}
              value={res.priceDiesel}
            />
          </div>
        </div>
        {err ? "Ви не заповнили поля!" : ""}
        <div>
          <button
            className={css.button}
            onClick={() => {
              if (
                res.nameCart == "" ||
                res.area == "" ||
                res.salary == "" ||
                res.priceDiesel == ""
              ) {
                setErr(true);
              } else {
                setErr(false);
                setOpen(false);
                setRes({ nameCart: "", area: "", salary: "", priceDiesel: "" });
                if (update) {
                  updateMap(res);
                  console.log("upd");
                } else {
                  createMap(res);
                }
                setUpdate(false);
              }
            }}
          >
            Зберегти
          </button>
        </div>
      </div>
    </div>
  );
}
