import "./App.css";
import { useEffect, useState } from "react";
import Field from "./Field";
import Header from "./Header";
import CustomCheckBox from "./CustomCheckBox.js";
import { CSSTransition } from "react-transition-group";

let useInput = (initValue) => {
  const [value, setValue] = useState(initValue);

  const onChange = (value) => setValue(value);

  return { value, onChange };
};

function App() {
  const firstApartment = useInput("");

  //let [firstApartment, setFirstApartment] = useState("");
  let [lastApartment, setLastApartment] = useState("");
  let [floors, setFloors] = useState("");
  let [apartment, setApartment] = useState("");
  let [residential, setResidential] = useState(false);
  let [apartmentsOnFloor, setApartmentsOnFloor] = useState("");
  let [requiredFloor, setRequiredFloor] = useState("");
  let [residentalOnFirstFloor, setResidentalOnFirstFloor] = useState("");
  let [floorsPlan, setFloorsPlan] = useState({});

  let obj = {};
  let floorsArr = [];

  useEffect(() => {
    setApartmentsOnFloor(
      Math.ceil((lastApartment - firstApartment.value) / floors)
    );
  }, [lastApartment, firstApartment.value, floors]);

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
          arr = [...arr, firstApartment.value++];
        }
      }
      obj[floor + " этаж"] = arr;
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="container">
        <form className="form_wrapper" onSubmit={handleSubmit}>
          <div className="field_wrapper">
            <h6>Номер первой квартиры в подьезде:</h6>
            <Field
              value={firstApartment.value}
              setValue={firstApartment.onChange}
            />
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
            <CustomCheckBox
              residential={residential}
              setResidential={setResidential}
            />
          </div>
          <CSSTransition
            in={residential}
            timeout={500}
            classNames={"check_block"}
            mountOnEnter
            unmountOnExit
          >
            <div className="field_wrapper">
              <h6>Укажите количество нежилых квартир:</h6>
              <Field
                value={residentalOnFirstFloor}
                setValue={setResidentalOnFirstFloor}
              />
            </div>
          </CSSTransition>
          <CSSTransition
            in={residential}
            timeout={500}
            classNames={"form__btn"}
          >
            <button
              className={`form__btn ${
                !firstApartment.value || !lastApartment || !floors
                  ? ""
                  : "btn_active"
              }`}
              disabled={!firstApartment.value || !lastApartment || !floors}
            >
              Высчитать данные
            </button>
          </CSSTransition>
        </form>
      </div>
      {requiredFloor && (
        <CSSTransition in={residential} timeout={500} classNames={"form__btn"}>
          <h5>
            Возможно вас интересует этаж &nbsp;
            <span className="active">№ {requiredFloor.split("этаж")} </span>
          </h5>
        </CSSTransition>
      )}

      <CSSTransition in={residential} timeout={500} classNames={"form__btn"}>
        <CSSTransition
          in={!!Object.keys(floorsPlan).length}
          timeout={500}
          classNames={"floors_wrapper"}
        >
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
        </CSSTransition>
      </CSSTransition>
    </div>
  );
}

export default App;
