import React, { useState, useEffect, useRef } from "react";
import * as XLSX from "xlsx";
import "./pages/Table.css";
import Table2 from "./pages/TableTwo";
import { useReactToPrint } from "react-to-print";

const App = () => {
    const componentToPrintRef = useRef();
   const handlePrint = useReactToPrint({
     content: () => componentToPrintRef.current,
   });
  const fileUploadRef = useRef(null);
  const [heading, setHeading] = useState([]);
  const [selectedCat, setSelectedCat] = useState("");
  const [items, setItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [data, setData] = useState(null);

  console.log("test :", items[0]?.[selectedCat]);

  const catIdtoValue = (catId) => {
    if (catId === "") {
      return "";
    }
    if (catId === "SC") {
      return 3;
    }
    if (catId === "ST") {
      return 4;
    }
    if (catId === "VJ") {
      return 5;
    }
    if (catId === "NT1") {
      return 6;
    }
    if (catId === "NT2") {
      return 7;
    }
    if (catId === "NT3") {
      return 8;
    }
    if (catId === "OBC") {
      return 9;
    }
    if (catId === "EWS") {
      return 10;
    }
    if (catId === "OPEN") {
      return 11;
    }
  };


  useEffect(() => {
    if (items.length !== 0 && selectedCat !== "") {
      setHeading([
        Object.keys(items[0])[0],
        Object.keys(items[0])[1],
        Object.keys(items[0])[2],
        Object.keys(items[0])[catIdtoValue(selectedCat)],
      ]);
      console.log("heading:", heading);
    }
    if (items.length !== 0 && selectedCat === "") {
      console.log("heading:", heading);
      setHeading(Object.keys(items[0]));
    }
  }, [items, selectedCat]);

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  const handleShift = (table, index) => {
    if (table) {
      let data = items[index];
      if (data) {
        items.splice(index, 1);
        setSelectedItems([...selectedItems, data]);
      }
    } else {
      let data = selectedItems[index];
      if (data) {
        selectedItems.splice(index, 1);
        setItems([...items, data]);
      }
    }
  };

  return (
    <div className="main">
      {items.length === 0 && selectedItems.length === 0 ? (
        <div className="input_container">
          <div className="input_box">
            <h2>Upload Your Excel File</h2>
            <div>
              <input
                type="file"
                ref={fileUploadRef}
                onChange={(e) => {
                  setData(e.target.files[0]);
                  readExcel(e.target.files[0]);
                }}
                accept=".xlsx"
                style={{
                  visibility: "hidden",
                }}
              />
              <div className="browse-files">
                <button
                  class="button-28"
                  role="button"
                  onClick={() => fileUploadRef.current.click()}
                >
                  Upload
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="table_container" ref={componentToPrintRef}>
            <Table2
              selectedCat={selectedCat}
              setSelectedCat={setSelectedCat}
              heading={heading}
              items={items}
              handleShift={handleShift}
            />
          </div>
          <button
            style={{ maxWidth: "200px" }}
            class="button-28 print"
            role="button "
            onClick={handlePrint}
          >
            Print
          </button>
        </>
      )}
    </div>
  );
};

export default App;
