import React, { useContext, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import MapInputs from "../components/MapInputs";
import Table from "../components/Table";
import { Context } from "../index";

export default function MapJornal() {
  let { map } = useContext(Context);
  const URL = "http://localhost:5000/api/cart";
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [data, setData] = useState([]);
  let [res, setRes] = useState({
    nameCart: "",
    area: "",
    salary: "",
    priceDiesel: "",
  });
  function createMap(data) {
    fetch(URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      getMaps();
    });
  }
  // function req() {
  //   fetch(URL)
  //     .then((res) => res.json())
  //     // .then((res) => {
  //     //   setData(res);
  //     //   return res;
  //     // })
  //     .then((res) => {
  //       console.log(res);
  //       map.maps = res;
  //       console.log(map.maps);
  //       console.log(map.maps.map((el) => el.area));
  //       // console.log(map.maps.map((el) => el.area));
  //     });
  // }
  // useEffect(() => {
  //   req();
  // }, []);
  const delet = (id) => {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    }).then(() => {
      getMaps();
    });
  };
  function getMaps() {
    fetch(URL)
      .then((res) => res.json())
      .then((res) => {
        map.maps = [];
        map.maps = res;
      })
      .then(() => {
        console.log(map.maps);
      });
  }
  return (
    <Container>
      <p style={{ textAlign: "center", fontSize: "25px" }}>
        Журнал технологічних карт
      </p>
      <Table
        data={data}
        setRes={setRes}
        setOpen={setOpen}
        setUpdate={setUpdate}
        delet={delet}
      ></Table>
      <button
        style={{ marginTop: "15px", marginLeft: "20px" }}
        onClick={() => {
          setOpen(true);
        }}
      >
        Добавити технологічну карту
      </button>
      <MapInputs
        open={open}
        setOpen={setOpen}
        data={data}
        setData={setData}
        update={update}
        setUpdate={setUpdate}
        res={res}
        setRes={setRes}
        getMaps={getMaps}
        createMap={createMap}
        URL={URL}
      ></MapInputs>
    </Container>
  );
}
