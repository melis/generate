import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState([]);

  const generate = () => {
    const list = [];
    if (x && y) {
      for (let r = 1; r <= y; r++) {
        for (let s = 1; s <= x; s++) {}
      }
    }
    return <div>1</div>;
  };

  useEffect(() => {
    let arrY = [];
    if (x && y) {
      for (let r = 1; r <= y; r++) {
        let arrX = [];
        for (let s = 1; s <= x; s++) {
          arrX.push({ id: `${r}.${s}`, type: null, r, s });
        }
        arrY.push(arrX);
      }
    }
    setZ(arrY);
  }, [x, y]);
  const zal = generate();

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
              onChange={(e) => setX(e.target.value)}
            />
          </div>
          <div className="form-group col-md-6">
            <input
              type="number"
              className="form-control"
              id="row"
              placeholder="Рядов"
              onChange={(e) => setY(e.target.value)}
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
            localStorage.setItem("zal", JSON.stringify(""));
          }}
        >
          Сохранить
        </button>
        <button>Очистить</button>
        <button
        // onClick={() => {
        //   setOb(JSON.parse(localStorage.getItem("zal")));
        // }}
        >
          Загрузит из хранилище
        </button>
      </div>
      <div>
        <label htmlFor="" style={{ marginRight: "20px" }}>
          С лева на прова
          <input type="radio" />
        </label>
        <label htmlFor="">
          С права на лево
          <input type="radio" />
        </label>
      </div>
      <div className="ploshad">{zal}</div>
    </div>
  );
}

export default App;
