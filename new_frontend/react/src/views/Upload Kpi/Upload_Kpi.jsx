import React, { useEffect, useState } from "react";
import { useFormik } from "formik";

const Upload_Kpi = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setdata] = useState();
  const employeename = [
    { employee_id: 1, employee_name: "John Doe" },
    { employee_id: 2, employee_name: "John Doe 2" },
    { employee_id: 3, employee_name: "John Doe 3" },
  ];

  const month = [
    { id: 1, name: "January" },
    { id: 2, name: "February" },
    { id: 3, name: "March" },
    { id: 4, name: "April" },
    { id: 5, name: "May" },
    { id: 6, name: "June" },
    { id: 7, name: "July" },
    { id: 8, name: "August" },
    { id: 9, name: "September" },
    { id: 10, name: "October" },
    { id: 11, name: "November" },
    { id: 12, name: "December" },
  ];

  const year = [
    { id: 2022, year: "2022" },
    { id: 2023, year: "2023" },
    { id: 2024, year: "2024" },
    { id: 2025, year: "2025" },
    { id: 2026, year: "2026" },
    { id: 2027, year: "2027" },
    { id: 2028, year: "2028" },
    { id: 2029, year: "2029" },
    { id: 2030, year: "2030" },
  ];

  const validate = (values) => {
    const errors = {};
    if (!values.employee) errors.employee = "Please Select Employee Name";
    if (!values.month) errors.month = "Please Select Month";
    if (!values.year) errors.year = "Please Select Year";
    if (!selectedFile) errors.file = "Please Upload a File";
    return errors;
  };

  const formik = useFormik({
    initialValues: {
      employee: "",
      month: "",
      year: "",
      file: null,
    },
    validate,
    onSubmit: async (values) => {
      setdata((item)=>[{...values, "file":selectedFile}])
      try {
        const response = await fetch("http://127.0.0.1:8000/upload-questions", {
          method: "POST",
          body: data,
          mode: "cors",  
        });

        const result = await response.json();
        console.log("Success:", result);
      } catch (error) {
        console.error("Error:", error);
      }
       
     },
   });
      // const formData = new FormData();
      // formData.append("employee", values.employee);
      // formData.append("month", values.month);
      // formData.append("year", values.year);
      // formData.append("file", selectedFile);

    
      

  return (
    <>
      <h2>Upload KPI</h2>
      <form onSubmit={formik.handleSubmit} className="w-100 bg-white px-3 py-3 kpi-shadow border-radius-kpi">
        <div className="d-flex flex-column">
          <label className="kpi-employee-text mb-2 mt-2">
            Select Employee Name <span className="text-red">*</span>
          </label>
          <select name="employee" onChange={formik.handleChange} value={formik.values.employee} className="kpi-input add-employee-input">
            <option value="">Select Employee Name</option>
            {employeename.map((item) => (
              <option key={item.employee_id} value={item.employee_name}>
                {item.employee_name}
              </option>
            ))}
          </select>
          {formik.errors.employee && <div className="error-text text-red fw-bold">{formik.errors.employee}</div>}
        </div>

        <div className="d-flex flex-column">
          <label className="kpi-employee-text mb-2 mt-2">
            Select Month <span className="text-red">*</span>
          </label>
          <select name="month" onChange={formik.handleChange} value={formik.values.month} className="add-employee-input">
            <option value="">Select Month</option>
            {month.map((item) => (
              <option key={item.id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
          {formik.errors.month && <div className="error-text text-red fw-bold">{formik.errors.month}</div>}
        </div>

        <div className="d-flex flex-column">
          <label className="kpi-employee-text mb-2 mt-2">
            Select Year <span className="text-red">*</span>
          </label>
          <select name="year" onChange={formik.handleChange} value={formik.values.year} className="add-employee-input">
            <option value="">Select Year</option>
            {year.map((item) => (
              <option key={item.id} value={item.year}>
                {item.year}
              </option>
            ))}
          </select>
          {formik.errors.year && <div className="error-text text-red fw-bold">{formik.errors.year}</div>}
        </div>

        <div className="d-flex flex-column">
          <label className="kpi-employee-text mb-2 mt-2">
            Upload KPI <span className="text-red">*</span>
          </label>
          <input
            type="file"
            name="selectedFile"
            onChange={(event) => {
        
  const file = event.currentTarget.files[0];
  
  setSelectedFile(file);
  formik.setFieldValue("file", file);
}}
            className="add-employee-input"
          />
          {formik.errors.selectedFile && <div className="error-text text-red fw-bold">{formik.errors.selectedFile}</div>}
        </div>

        <button type="submit" className="primary-btn mt-4 w-100">
          Submit
        </button>
      </form>
    </>
  );
};

export default Upload_Kpi;
