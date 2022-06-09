import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const [m, setM] = useState(0);
  const [r, setR] = useState(0);
  const [ob, setOb] = useState([]);

  const generate = () => {
    let newData = [];
    for (let i = 1; i <= r; i++) {
      let newRyad = [];
      for (let j = 0; j <= m; j++) {
        newRyad.push({
          id: i + "-" + j,
          type: j === 0 ? "l" : "m",
          name: j === 0 ? "ryad" + i : "m-" + i + "-" + j,
          r: i,
          m: j,
        });
      }
      newData.push(newRyad);
    }
    setOb(() => newData);
  };

  const buttonHandle = (el) => {
    ob.forEach((arr, i) => {
      let k = 1;
      arr.forEach((e, j) => {
        if (el.id === e.id) {
          ob[i][j] = { ...el, type: el.type === "s" ? "m" : "s", m: 0 };
        }
        if (ob[i][j].type !== "l" && ob[i][j].type !== "s") {
          ob[i][j].m = k++;
        }
      });
    });

    setOb([...ob]);
  };

  const nodeList = useMemo(() => {
    let list = [];
    ob.forEach((arr, i) => {
      list.push(
        <div className="ryad" key={arr[0].id}>
          <span className="ryad_name">Ряд {i + 1}</span>
          {arr.map((el, j) => {
            if (el.type === "l") {
              return null;
            }
            if (el.type == "s") {
              return (
                <div
                  key={el.id}
                  className="item span"
                  onClick={() => buttonHandle(el)}
                ></div>
              );
            }
            return (
              <div key={el.id} className="item">
                <button onClick={() => buttonHandle(el)}>{el.m}</button>
              </div>
            );
          })}
        </div>
      );
    });

    return list;
  }, [ob, buttonHandle]);

  return (
    <div className="App">
      <div className="card-body border ml-1">
        <div className="form-row">
          <div className="form-group col-md-6">
            <input
              type="number"
              className="form-control"
              id="seats_count"
              placeholder="Мест в ряду"
              onChange={(e) => setM(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="number"
              className="form-control"
              id="row"
              placeholder="Рядов"
              onChange={(e) => setR(e.target.value)}
            />
          </div>
        </div>
        <button
          className="btn btn-primary float-right"
          id="create"
          onClick={generate}
        >
          Сгенерировать
        </button>

        <button
          onClick={() => {
            localStorage.setItem("zal", JSON.stringify(ob));
          }}
        >
          Сохранить
        </button>
        <button
          onClick={() => {
            setOb([]);
          }}
        >
          Очистить
        </button>
        <button
          onClick={() => {
            setOb(JSON.parse(localStorage.getItem("zal")));
          }}
        >
          Загрузит из хранилище
        </button>
      </div>
      <div className="ploshad">{nodeList}</div>
    </div>
  );
}

export default App;
