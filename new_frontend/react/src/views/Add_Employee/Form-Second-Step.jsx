import { useFormik } from "formik";
import React, { useContext } from "react";
import axios from "axios";
import { Employee_Context } from "./employee_context";

const Second_Step = () => {
  const { step, setstep } = useContext(Employee_Context);

  const next = () => setstep((prev) => prev + 1);
  const back = () => setstep((prev) => prev - 1);


  const handleFileChange = (event) => {
    formik.setFieldValue(event.target.name, event.target.files[0]);
  };

  const formik = useFormik({
    initialValues: {
      jan_file: null, feb_file: null, march_file: null, april_file: null,
      may_file: null, june_file: null, july_file: null, aug_file: null,
      sept_file: null, oct_file: null, nov_file: null, dec_file: null,
      jan_mar_file: null, july_sept_file: null, april_june_file: null, 
      oct_dec_file: null, yearly_file: null,
    },
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (values[key]) {
       formData.append("files", values[key]);
        }
  console.log(values[key]);
  
      });

      try {
        const response = await axios.post("http://127.0.0.1:8000/upload-csv/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        
        alert(response.data.message);
      } catch (error) {
        alert("Upload failed: " + (error.response?.data?.detail || error.message));
      }

      
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="p-4 border rounded">
      <h3 className="mb-4">Upload KPI Files</h3>

      {/* Monthly Uploads */}
      {["jan", "feb", "march", "april", "may", "june", "july", "aug", "sept", "oct", "nov", "dec"].map((month) => (
        <div key={month} className="mb-3">
          <label className="form-label">{month.toUpperCase()} KPI</label>
          <input type="file" name={`${month}_file`} onChange={handleFileChange} className="form-control" />
        </div>
      ))}

      {/* Quarterly Uploads */}
      {["jan_mar", "april_june", "july_sept", "oct_dec"].map((quarter) => (
        <div key={quarter} className="mb-3">
          <label className="form-label">{quarter.replace("_", "-").toUpperCase()} KPI</label>
          <input type="file" name={`${quarter}_file`} onChange={handleFileChange} className="form-control" />
        </div>
      ))}

      {/* Yearly Upload */}
      <div className="mb-3">
        <label className="form-label">Yearly KPI</label>
        <input type="file" name="yearly_file" onChange={handleFileChange} className="form-control" />
      </div>

      {/* Buttons */}
      <div className="d-flex justify-content-between">
        <button type="button" className="btn btn-secondary" onClick={back}>Back</button>
        <button type="submit" className="btn btn-primary">Upload</button>
        <button type="button" className="btn btn-secondary" onClick={next}>Next</button>
      </div>
    </form>
  );
};

export default Second_Step;


