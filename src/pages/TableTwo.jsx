import React, { useState } from "react";
import "jspdf-autotable";

const Table2 = ({
  heading,
  items,
  handleShift,
  setSelectedCat,
  selectedCat,
}) => {
  const [rank, setRank] = useState(null);

  

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            borderRadius:"5px",
            margin:"10px 0px",
            background: "#ceedc7",
            padding: "0px 25px",
          }}
        >
          <h3>Xerox & Online Center</h3>
        </div>
      </div>
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
            <input
              class="basic-slide"
              id="name"
              type="text"
              placeholder="Name"
            />
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
    </>
  );
};

export default Table2;
