import { useCallback, useState } from "react";
import "./App.css";

function App() {
  const [m, setM] = useState(0);
  const [r, setR] = useState(0);
  const [ob, setOb] = useState({});

  const handle = () => {
    let nOb = {};
    for (let i = 1; i <= r; i++) {
      nOb[i] = [];
      for (let j = 0; j <= m; j++) {
        nOb[i].push({
          id: i + "-" + j,
          type: j === 0 ? "l" : "m",
          name: j === 0 ? "ryad" + i : "m-" + i + "-" + j,
          r: i,
          m: j,
        });
      }
    }

    setOb((o) => nOb);
  };

  const buttonHandle = useCallback(
    (k, x) => {
      setOb((o) => {
        let newOb = {
          ...o,
          [k]: ob[k].map((n) => {
            if (n.id === x.id) {
              return { ...x, type: x.type === "m" ? "s" : "m" };
            }
            return n;
          }),
        };

        newOb = JSON.parse(JSON.stringify(newOb));
        for (let k in newOb) {
          let i = 1;
          newOb[k].forEach((e) => {
            if (e.type === "m") {
              e.m = i++;
            }
          });
        }
        return newOb;
      });
    },
    [ob]
  );

  const list = useCallback(() => {
    let list = [];
    for (let k in ob) {
      list.push(
        <div className="ryad" key={k}>
          <span className="ryad_name">Ряд {k}</span>
          {ob[k].map((x, i) => {
            if (x.type === "l") {
              return null;
            }
            if (x.type !== "m") {
              return (
                <div
                  key={x.id}
                  className="item span"
                  onClick={() => buttonHandle(k, x)}
                ></div>
              );
            }
            return (
              <div key={x.id} className="item">
                <button onClick={() => buttonHandle(k, x)}>{x.m}</button>
              </div>
            );
          })}
        </div>
      );
    }
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
          onClick={handle}
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
            setOb({});
            // localStorage.removeItem("zal");
          }}
        >
          Очистить
        </button>
        <button
          onClick={() => {
            setOb(JSON.parse(localStorage.getItem("zal")));
            console.log(ob);
          }}
        >
          Загрузит из хранилище
        </button>
      </div>
      <div className="ploshad">{list()}</div>
    </div>
  );
}

export default App;
