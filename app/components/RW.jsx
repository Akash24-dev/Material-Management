"client use"
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  const [drawings, setDrawings] = useState([]);
  const [drawingNo, setDrawingNo] = useState("");
  const [weight, setWeight] = useState("");
  const [quantity, setQuantity] = useState("");
  const [totalWeight, setTotalWeight] = useState(0);

  useEffect(() => {
    const calculatedWeight = weight && quantity ? parseFloat(weight) * parseInt(quantity) : 0;
    setTotalWeight(calculatedWeight);
  }, [weight, quantity]);

  const addDrawing = () => {
    if (!drawingNo.trim() || !weight.trim() || !quantity.trim()) {
      alert("Please fill all fields");
      return;
    }

    const newDrawing = {
      id: uuidv4(),
      drawingNo,
      weight: parseFloat(weight),
      quantity: parseInt(quantity),
      totalWeight,
      rawMaterials: [],
    };

    setDrawings([...drawings, newDrawing]);
    setDrawingNo("");
    setWeight("");
    setQuantity("");
  };

  const addRawMaterial = (drawingId) => {
    const batchNo = `Batch-${Math.floor(Math.random() * 1000)}`;
    const startTime = new Date().toLocaleTimeString();

    const updatedDrawings = drawings.map((drawing) =>
      drawing.id === drawingId
        ? {
          ...drawing,
          rawMaterials: [...drawing.rawMaterials, { id: uuidv4(), batchNo, startTime, endTime: "--:--", status: "Processing" }],
        }
        : drawing
    );

    setDrawings(updatedDrawings);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Raw Material Management</h2>

      <div className="card p-3 mb-4">
        <h4>Add Drawing</h4>
        <div className="row">
          <div className="col-md-3">
            <input type="text" className="form-control" placeholder="Drawing No" value={drawingNo} onChange={(e) => setDrawingNo(e.target.value)} />
          </div>
          <div className="col-md-2">
            <input type="number" className="form-control" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div className="col-md-2">
            <input type="number" className="form-control" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control" placeholder="Total Weight" value={totalWeight ? totalWeight + " kg" : ""} disabled />
          </div>
          <div className="col-md-3">
            <button className="btn btn-success w-100" onClick={addDrawing}>Add Drawing</button>
          </div>
        </div>
      </div>

      <div className="card p-3">
        <h4>Drawing List</h4>
        {drawings.length === 0 ? (
          <p>No Drawings Added</p>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>Drawing No</th>
                <th>Weight</th>
                <th>Quantity</th>
                <th>Total Weight</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {drawings.map((drawing) => (
                <tr key={drawing.id}>
                  <td>{drawing.drawingNo}</td>
                  <td>{drawing.weight} kg</td>
                  <td>{drawing.quantity}</td>
                  <td>{drawing.totalWeight} kg</td>
                  <td>
                    <button className="btn btn-primary btn-sm" onClick={() => addRawMaterial(drawing.id)}>
                      Add Raw Material
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card p-3 mt-4">
        <h4>Raw Materials</h4>
        {drawings.map((drawing) =>
          drawing.rawMaterials.length > 0 ? (
            <div key={drawing.id}>
              <h5>Drawing No: {drawing.drawingNo}</h5>
              <table className="table">
                <thead>
                  <tr>
                    <th>Batch No</th>
                    <th>Start Time</th>
                    <th>End Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {drawing.rawMaterials.map((material) => (
                    <tr key={material.id}>
                      <td>{material.batchNo}</td>
                      <td>{material.startTime}</td>
                      <td>{material.endTime}</td>
                      <td>
                        <span className={`badge ${material.status === "Completed" ? "bg-success" : "bg-warning"}`}>
                          {material.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

export default App;
