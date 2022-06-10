import { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";

function App() {
  const [m, setM] = useState(0);
  const [r, setR] = useState(0);
  const [ob, setOb] = useState([]);
  const [arrow, setErrow] = useState(false);

  const generate = () => {
    let newData = [];
    for (let i = 1; i <= r; i++) {
      let newRyad = [];
      for (let j = 0; j <= m; j++) {
        newRyad.push({
          id: i + "-" + j,
          type: j === 0 ? "l" : "m",
          r: i,
          m: j,
        });
      }
      newData.push(newRyad);
    }
    setOb(() => newData);
  };

  useEffect(() => {
    console.log(ob);
  }, [ob]);

  const reverse = () => {
    ob.reverse();
    setOb([...ob]);
  };

  const buttonHandle = useCallback(
    (el, t) => {
      for (let i = 0; i < ob.length; i++) {
        let k = 1;
        for (let j = 0; j < ob[i].length; j++) {
          if (el.id === ob[i][j].id) {
            ob[i][j] = { ...el, type: t ? "m" : "s", m: 0 };
          }
          if (ob[i][j].type === "m") {
            ob[i][j].m = k++;
          }
        }
      }
      setOb([...ob]);
    },
    [ob]
  );

  const row = useCallback(
    (arr) => {
      let array = [...arr];
      if (arrow) {
        array.reverse();
      }
      return array.map((el, j) => {
        if (el.type === "l") {
          return null;
        }
        if (el.type === "s") {
          return (
            <div
              key={el.id}
              className="item span"
              onClick={() => buttonHandle(el, 1)}
            ></div>
          );
        }
        return (
          <div key={el.id} className="item">
            <span>
              {el.r}.{el.m}
            </span>
            <button onClick={() => buttonHandle(el, 0)}>{el.m}</button>
          </div>
        );
      });
    },
    [arrow, buttonHandle]
  );

  const nodeList = useMemo(() => {
    let list = [];
    ob.forEach((arr, i) => {
      list.push(
        <div className="ryad" key={arr[0].id}>
          <span className="ryad_name">Ряд {arr[0].r}</span>
          {row(arr)}
          {/* <div
            className="item"
            onClick={() => {
              ob.forEach((a, i) => {
                if (a[0].r === arr[0].r) {
                  a.push({ id: `${a[0].r}.${i}`, type: "m", r: a[0].r, m: 99 });
                }
              });
              setOb([...ob]);
            }}
          >
            +
          </div> */}
        </div>
      );
    });

    return list;
  }, [ob, row]);

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
        <button onClick={() => setOb([])}>Очистить</button>
        <button
          onClick={() => {
            setOb(JSON.parse(localStorage.getItem("zal")));
          }}
        >
          Загрузит из хранилище
        </button>
      </div>
      <div>
        <label
          htmlFor=""
          style={{ marginRight: "20px" }}
          onClick={() => setErrow(false)}
        >
          С лева на права
          <input type="radio" checked={!arrow} />
        </label>
        <label htmlFor="" onClick={() => setErrow(true)}>
          С права на лево
          <input type="radio" checked={arrow} />
        </label>
        <button onClick={reverse}>Верх вниз</button>
      </div>
      <div className="ploshad">{nodeList}</div>
    </div>
  );
}

export default App;
