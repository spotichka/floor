import "./App.css";
import { useEffect, useState } from "react";
import Field from "./Field";
import Header from "./Header";

function App() {
  let [firstApartment, setFirstApartment] = useState("");
  let [lastApartment, setLastApartment] = useState("");
  let [apartment, setApartment] = useState("");
  let [floors, setFloors] = useState("");
  let [residential, setResidential] = useState(false);
  let [apartmentsOnFloor, setApartmentsOnFloor] = useState("");
  let [requiredFloor, setRequiredFloor] = useState("");
  let [residentalOnFirstFloor, setResidentalOnFirstFloor] = useState("");
  let [floorsPlan, setFloorsPlan] = useState({});

  let obj = {};
  let floorsArr = [];

  useEffect(() => {
    setApartmentsOnFloor(Math.ceil((lastApartment - firstApartment) / floors));
  }, [lastApartment, firstApartment, floors]);

  let handleSubmit = (e) => {
    getResult();
    e.preventDefault();
  };

  let getResult = () => {
    createFloorsArr();
    createApartmetsObj();
    Object.keys(obj).map((item) => {
      if (obj[item].indexOf(+apartment) >= 0) {
        return setRequiredFloor(item);
      } else return null;
    });
    setFloorsPlan(obj);
  };

  let createFloorsArr = () => {
    for (let floor = 1; floor <= floors; floor++) {
      floorsArr.push(floor);
    }
  };

  let createApartmetsObj = () => {
    for (let floor of floorsArr) {
      let arr = [];
      for (let i = 1; i <= apartmentsOnFloor; i++) {
        if (residential && floor === 1 && arr.length < residentalOnFirstFloor) {
          arr = [...arr, "fill"];
        } else {
          arr = [...arr, firstApartment++];
        }
      }
      obj[floor + " этаж"] = arr;
    }
  };

  return (
    <div className="App">
      <div className="container">
        <Header />
        <form className="form_wrapper" onSubmit={handleSubmit}>
          <div className="field_wrapper">
            <h6>Номер первой квартиры в подьезде:</h6>
            <Field value={firstApartment} setValue={setFirstApartment} />
          </div>
          <div className="field_wrapper">
            <h6>Номер последней квартиры в подьезде:</h6>
            <Field value={lastApartment} setValue={setLastApartment} />
          </div>

          <div className="field_wrapper">
            <h6>Количество этажей в подьезде:</h6>
            <Field value={floors} setValue={setFloors} />
          </div>
          <div className="field_wrapper">
            <h6>Номер квартиры для поиска:</h6>
            <Field value={apartment} setValue={setApartment} />
          </div>

          <div className="field_wrapper">
            <span> На первом этаже есть нежилые квартиры?</span>
            <input
              type="checkbox"
              checked={residential}
              onChange={() => {
                residential ? setResidential(false) : setResidential(true);
              }}
            />
          </div>
          {residential && (
            <div className="field_wrapper">
              <h6>Укажите количество нежилых квартир:</h6>
              <Field
                value={residentalOnFirstFloor}
                setValue={setResidentalOnFirstFloor}
              />
            </div>
          )}
          <button
            className={`form__btn ${
              !firstApartment || !lastApartment || !floors ? "" : "btn_active"
            }`}
            disabled={!firstApartment || !lastApartment || !floors}
          >
            Высчитать данные
          </button>
        </form>
      </div>
      {requiredFloor && (
        <h5>Возможно вас интересует этаж № {requiredFloor.split("этаж")} </h5>
      )}

      <div className="floors_wrapper">
        {Object.keys(floorsPlan).map((item) => {
          return (
            <div key={item}>
              <span className="floors">{item}</span>
              {floorsPlan[item].map((item) => {
                if (apartment === item) {
                  return (
                    <span key={item} className="apartment active">
                      {item}
                    </span>
                  );
                } else if ("fill" === item) {
                  return <span key={item} className="apartment"></span>;
                }
                return (
                  <span key={item} className="apartment">
                    {item}
                  </span>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
