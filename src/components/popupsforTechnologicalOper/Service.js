import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../index";
import css from "../../components/Dialog.module.css";
import { observer } from "mobx-react-lite";

const Easy = observer(
  ({
    open,
    setOpen,
    cell,
    setCell,
    getOpers,
    akk,
    akkum,
    res,
    setRes,
    update,
    setUpdate,
  }) => {
    const { map } = useContext(Context);
    const id = useParams();
    console.log(id.id);
    console.log(akk);

    const [isErr, setIsErr] = useState(false);

    const URL = `http://localhost:5000/api/cart/${id.id}`;
    function createOperation(arr) {
      fetch(URL, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId: id.id,
          sum: akk + +arr.res.price,
          arr,
        }),
      })
        .then(() => {
          console.log(4);
          getMaps();
        })
        .then(() => {
          console.log(1);
          map.opers = [];
          let ids = map.maps.map((el) => el.id);
          for (let i = 0; i < ids.length; i++) {
            getOpers(ids[i]);
          }
        });
    }
    function patchOperation(arr) {
      console.log(akkum);
      fetch(URL, {
        method: "PATCH",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cartId: id.id,
          sum: +akkum + +arr.res.price,
          arr,
        }),
      })
        .then(() => {
          getMaps();
        })
        .then(() => {
          map.opers = [];
          let ids = map.maps.map((el) => el.id);
          for (let i = 0; i < ids.length; i++) {
            getOpers(ids[i]);
          }
        });
    }
    function getMaps() {
      fetch("http://localhost:5000/api/cart")
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          map.maps = [];
          map.maps = res;
        })
        .then(() => {
          console.log(map.maps);
        });
    }
    return (
      <div
        style={open ? { display: "flex" } : { display: "none" }}
        className={css.dialog}
        onClick={() => {
          setOpen(false);
          setIsErr(false);
          if (update) {
            setUpdate(false);
            setRes({
              nameOper: "",
              price: "",
              amount: "",
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
          <h4>Внесіть данні для розрахунку</h4>
          <div className="d-flex gap-3">
            <div>
              <p>Назва послуги</p>
              <input
                placeholder="Вкажіть назву"
                type="text"
                value={res?.nameOper}
                onChange={(e) => {
                  setRes({ ...res, nameOper: e.target.value });
                }}
              />
            </div>
            <div>
              <p>Ціна</p>
              <input
                placeholder="Вкажіть ціну"
                type="number"
                value={res?.price}
                onChange={(e) => {
                  setRes({ ...res, price: e.target.value });
                }}
              />
            </div>
            <div>
              <p>Одиниці виміру ціни</p>
              <input
                placeholder="Вкажіть одиниці"
                type="text"
                value={res?.unitsOfCost}
                onChange={(e) => {
                  setRes({ ...res, unitsOfCost: e.target.value });
                }}
              />
            </div>
          </div>
          {isErr ? "Ви не заповнили поля" : ""}
          <div>
            <button
              className={css.button}
              onClick={() => {
                if (res.nameOper == "" || res.price == "") {
                  setIsErr(true);
                } else {
                  setOpen(false);
                  setCell("");
                  const request = { cell, res };
                  setRes({
                    nameOper: "",
                    price: "",
                    amount: "",
                    unitsOfCost: "",
                    unitsOfConsumption: "",
                  });
                  setIsErr(false);
                  if (update) {
                    console.log("upd");
                    console.log(akk);
                    patchOperation(request);
                  } else {
                    console.log(3);
                    createOperation(request);
                  }
                }
              }}
            >
              Зберегти
            </button>
          </div>
          <p>
            Увага!
            <br />
            Одиниці виміру "ціни" повинні відповідати одиницям виміру "розходу"
            <br />
            Наприклад (грн/кг) відповідає (кг/га) або (грн/шт) відповідає
            (шт/га)
          </p>
        </div>
      </div>
    );
  }
);

export default Easy;
