import React, { useState } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const Table2 = ({
  heading,
  items,
  handleShift,
  setSelectedCat,
  selectedCat,
}) => {
  const [rank, setRank] = useState(null);
  // const [selectedItems, setSelectedItems] = useState([]);

  // const handleCheckboxChange = (item, index) => {
  //   let updatedSelectedItems = [...selectedItems];
  //   if (selectedItems.includes(index)) {
  //     updatedSelectedItems = selectedItems.filter(
  //       (selectedIndex) => selectedIndex !== index
  //     );
  //   } else {
  //     updatedSelectedItems.push(index);
  //   }
  //   setSelectedItems(updatedSelectedItems);
  // };

  // const handlePrint = () => {
  //   const selectedData = selectedItems.map((index) => items[index]);
  //   const headers = Object.keys(selectedData[0]);
  //   const convertedArray = selectedData.map((obj) =>
  //     headers.map((header) => obj[header])
  //   );

  //   const doc = new jsPDF("p", "pt");

  //   const columns = heading.map((h) => {
  //     return { title: h, dataKey: h };
  //   });

  //   doc.autoTable({
  //     head: [columns],
  //     body: convertedArray,
  //     styles: {
  //       fontSize: 8,
  //     },
  //   });

  //   doc.save("selected-data.pdf");
  // };

  return (
    <div className="table_box">
      {/* input */}
      <div
        class="row"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <span>
          <label class="slide1" for="name">
            Name
          </label>
          <input class="basic-slide" id="name" type="text" placeholder="Name" />
        </span>
        <span>
          <label class="slide2" for="caste">
            Caste
          </label>
          <select
            class="basic-slide"
            id="category"
            name="category"
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
          >
            <option value="">All</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
            <option value="VJ">VJ</option>
            <option value="NT1">NT1</option>
            <option value="NT2">NT2</option>
            <option value="NT3">NT3</option>
            <option value="OBC">OBC</option>
            <option value="EWS">EWS</option>
            <option value="OPEN">OPEN</option>
          </select>
        </span>
        <span>
          <label class="slide3" for="phone">
            Rank
          </label>
          <input
            class="basic-slide"
            id="phone"
            type="number"
            placeholder="Your Rank"
            value={rank}
            onChange={(e) => setRank(parseInt(e.target.value))}
          />
        </span>
      </div>

      {/* input end  */}

      {rank && <h3>College less than Rank : {rank}</h3>}
      <table
        // className="table"
        class="styled-table"
      >
        <thead>
          <tr>
            {heading.map((h) => (
              <th scope="col" className="table_heading">
                {h === selectedCat ? "Rank" : h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {items
            .filter((item) => {
              if (selectedCat !== "") {
                if (rank === undefined || rank === null) {
                  return item;
                } else {
                  return item?.[selectedCat] <= rank;
                }
              } else {
                return item;
              }
            })
            .map((d, idx) => (
              <tr key={idx}>
                {heading.map((h) => {
                  return (
                    <td align="center" className="table_data">
                      {d[h]}
                    </td>
                  );
                })}
              </tr>
            ))}
        </tbody>
      </table>

      {rank && (
        <>
          <h3>College greater than Rank : {rank}</h3>
          <table
            // className="table"
            class="styled-table bg-color"
          >
            <thead>
              <tr>
                {heading.map((h) => (
                  <th scope="col" className="table_heading">
                    {h === selectedCat ? "Rank" : h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items
                .filter((item) => {
                  if (selectedCat !== "") {
                    if (rank === undefined || rank === null) {
                      return item;
                    } else {
                      return item?.[selectedCat] > rank;
                    }
                  } else {
                    return item;
                  }
                })
                .map((d, idx) => (
                  <tr key={idx}>
                    {heading.map((h) => {
                      return <td align="left">{d[h]}</td>;
                    })}
                  </tr>
                ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Table2;
