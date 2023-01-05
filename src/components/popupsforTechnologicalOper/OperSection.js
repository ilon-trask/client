import React, { useState } from "react";
import css from "../Dialog.module.css";

export default function FormOper({
  open,
  setOpen,
  setSecondOpen,
  cell,
  setCell,
}) {
  const [isErr, setIsErr] = useState(false);
  return (
    <div
      style={open ? { display: "flex" } : { display: "none" }}
      className={css.dialog}
      onClick={() => {
        setOpen(false);
        setIsErr(false);
        setCell("");
      }}
    >
      <div
        className={css.container}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h4>Виберіть розділ</h4>
        <div className="d-flex gap-3 ">
          <div>
            <select>
              <option selected disabled hidden value="">
                Виберіть розділ
              </option>
              <option value="Підготовка ґрунту">Підготовка ґрунту</option>
              <option value="Посадка">Посадка</option>
              <option value="Догляд">Догляд</option>
              <option value="Живлення">Живлення</option>
              <option value="Моріторинг">Моріторинг</option>
              <option value="Захист">Захист</option>
              <option value="Збір">Збір</option>
              <option value="Зберігання">Зберігання</option>
            </select>
          </div>
        </div>
        <div>
          <h4>Виберіть тип</h4>
          <div className="d-flex gap-3 ">
            <div>
              <select
                onChange={(e) => {
                  setCell(e.target.value);
                }}
                value={cell}
              >
                <option selected disabled hidden value="">
                  Виберіть тип
                </option>
                <option value="Механізовані роботи">Механізовані роботи</option>
                <option value="costHandWork">Ручні роботи</option>
                <option value="costMaterials">Матеріали</option>
                <option value="costServices">Послуги</option>
                <option value="Транспортування">Транспортування</option>
              </select>
            </div>
          </div>
        </div>
        {isErr ? "Ви не заповнили поля" : ""}
        <div>
          <button
            className={css.button}
            onClick={() => {
              if (cell == "") {
                setIsErr(true);
              } else {
                setIsErr(false);
                setOpen(false);
                setSecondOpen(true);
              }
            }}
          >
            Створити
          </button>
        </div>
      </div>
    </div>
  );
}
