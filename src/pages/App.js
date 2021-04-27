import React, { useState, useEffect } from "react";
import Card from "../Components/Card";
import InputSearch from "../Components/InputSearch";
import MainTitle from "../Components/MainTitle";
import Modal from "../Components/modal";
import "../css/app.css";

export default function App(props) {
  const urlData = "https://jsonplaceholder.typicode.com/users";
  const urlPhoto = "https://robohash.org/";
  let [photoRobot, setPhotoRobot] = useState("");

  const [dataTable, setDataTable] = useState([]);
  let [dataToShow, setDataToShow] = useState([]);
  let [dataRobot, setDataRobot] = useState([]);

  useEffect(() => {
    fetch(urlData)
      .then((response) => response.json())
      .then((data) => {
        setDataTable(data);
        setDataToShow(data);
      });
  }, [setDataTable]);

  const serachByNameOnType = (inputEvent) => {
    let nameToSearch = inputEvent.target.value;
    let regExpVerTreeChar = new RegExp("...+");
    if (regExpVerTreeChar.test(nameToSearch)) {
      let regExpToSearch = new RegExp(nameToSearch, "i");
      let dataFind = null;
      dataFind = dataTable.filter((element) => {
        return regExpToSearch.test(element.name);
      });
      setDataToShow([...dataFind]);
    } else {
      setDataToShow([...dataTable]);
    }
  };

  const showTitleAndInputSearch = () => {
    if (dataTable.length === 0) {
      return (
        <div className="loader-container">
          <div className="lds-roller">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex-box-header-input">
          <MainTitle />
          <InputSearch onChange={serachByNameOnType} />
        </div>
      );
    }
  };

  const getDataForSpecifiedRobot = (urlRobot) => {
    fetch(urlRobot)
      .then((response) => response.json())
      .then((data) => setDataRobot(data));
  };

  const showMoreInformation = (idData) => {
    setPhotoRobot(`${urlPhoto}${idData}`);
    let urlRobot = `${urlData}/${idData}`;
    getDataForSpecifiedRobot(urlRobot);
    const modal = document.querySelector(".modal");
    if (modal.classList.contains("modal-hide")) {
      modal.classList.add("modal-visible");
      modal.classList.remove("modal-hide");
    }
  };

  const closeModal = () => {
    const modal = document.querySelector(".modal");
    if (modal.classList.contains("modal-visible")) {
      modal.classList.add("modal-hide");
      modal.classList.remove("modal-visible");
    }
  };

  return (
    <div>
      <Modal
        photo={photoRobot}
        name={dataRobot.name}
        email={dataRobot.email}
        phone={dataRobot.phone}
        onClick={closeModal}
      />
      <div>
        {showTitleAndInputSearch()}
        <div className="flex-box">
          {dataToShow.map((data) => {
            return (
              <Card
                key={data.id}
                onClick={() => showMoreInformation(data.id)}
                photo={`${urlPhoto}${data.id}`}
                name={data.name}
                email={data.email}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
