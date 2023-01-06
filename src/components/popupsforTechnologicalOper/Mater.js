import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { Context } from "../../index";
import css from "../../components/Dialog.module.css";
import { observer } from "mobx-react-lite";

import { getOpers, createOperation, patchOperation } from "../../http/requests";
const Easy = observer(
  ({
    open,
    setOpen,
    cell,
    setCell,
    akk,
    akkum,
    res,
    setRes,
    update,
    setUpdate,
  }) => {
    const { map } = useContext(Context);
    const { id } = useParams();
    const [isErr, setIsErr] = useState(false);
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
              unitsOfCost: "",
              unitsOfConsumption: "",
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
              <p>Назва операції</p>
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
            <div>
              <p>Розхід/кількість на 1 га</p>
              <input
                placeholder="Вкажіть розхід"
                type="number"
                value={res?.amount}
                onChange={(e) => {
                  setRes({ ...res, amount: e.target.value });
                }}
              />
            </div>
            <div>
              <p>Одиниці виміру розходу</p>
              <input
                placeholder="Вкажіть одиниці"
                type="text"
                value={res?.unitsOfConsumption}
                onChange={(e) => {
                  setRes({ ...res, unitsOfConsumption: e.target.value });
                }}
              />
            </div>
          </div>
          {isErr ? "Ви не заповнили поля" : ""}
          <div>
            <button
              className={css.button}
              onClick={() => {
                if (res.nameOper == "" || res.price == "" || res.amount == "") {
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
                  console.log();
                  if (update) {
                    console.log("upd");
                    console.log(akk);
                    patchOperation(map, request, id, akkum);
                  } else {
                    console.log(3);
                    createOperation(map, request, id, akk);
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
