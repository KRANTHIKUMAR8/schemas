import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import "./modal.css";

const schemaOptions = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

function Modal({ onClose, onOpen }) {
  const [segmentName, setSegmentName] = useState("");

  const [schemas, setSchemas] = useState([
    // { label: "Add schema to segment", value: "" },
  ]);
  const [availableOptions, setAvailableOptions] = useState([...schemaOptions]);
  const [errors, setErrors] = useState("");
  useEffect(() => {
    console.log("Schemas updated:", schemas);
  }, [schemas]);

  const addSchema = () => {
    const hasEmptyValue = schemas.some((schema) => !schema?.value);

    if (hasEmptyValue) {
      setErrors("Please select a option before adding a new one.");
      return;
    }
    console.log(availableOptions, "availableOptions in add")
    if (availableOptions.length < 1) {
      setErrors("No options left");
      return;
    }

    setErrors("");
    // setSchemas([...schemas, ""]);
    setSchemas((prev) => [...prev, { value: "", label: "" }]);
  };

  const removeSchema = (index) => {
    const removedSchema = schemas[index];
    const updatedSchemas = schemas.filter((_, i) => i !== index);
    setSchemas(updatedSchemas);
    console.log(
      removedSchema,
      "removedSchema",
      updatedSchemas,
      "updatedSchemas"
    );
    if (removedSchema) {
      console.log("removed");
      setAvailableOptions([
        ...availableOptions,
        schemaOptions.find((option) => option.value === removedSchema.value),
      ]);
    }
    setErrors("");
  };

  const handleSelectChange = (value, label, index) => {
    // const updatedSchemas = [...schemas];
    // const previousValue = schemas[index];
    // updatedSchemas[index] = { value, label };
    // setSchemas(updatedSchemas);

    setSchemas((prevSchemas) => {
      const updatedSchemas = [...prevSchemas];
      updatedSchemas[index] = { value, label };
      console.log("updatedschema", updatedSchemas);
      return updatedSchemas;
    });

    console.log(schemas, "scheams");
    // if (previousValue) {
    //   setAvailableOptions((prev) => [
    //     ...prev,
    //     schemaOptions.find((option) => option?.value === previousValue),
    //   ]);
    // }

    setAvailableOptions((prev) =>
      prev.filter((option) => option?.value !== value)
    );
    setErrors("");
  };

  const handleSaveSegment = async () => {
    if (!segmentName.trim()) {
      setErrors("Segment name is required.");
      return;
    }
    console.log("hi", segmentName.trim(), errors);
    if (schemas.length === 0 || schemas.some((schema) => !schema.value)) {
      setErrors("Please add and select any schema.");
      return;
    }

    setErrors("");

    const data = {
      segment_name: segmentName,
      schema: schemas.map((schema) => ({
        [schema.value]: schema.label,
      })),
    };

    console.log("Sending data to server:", data);
    const url = "https://webhook.site/c8e98977-168e-4d38-8d03-40f76c9fcea7";

    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
      });
      onClose();
      console.log(response, "response");
      if (response.ok) {
        console.log("Segment saved successfully");
        onClose();
      } else {
        console.error("Failed to save segment");
      }
    } catch (error) {
      onClose();
      console.error("Error saving segment:", error);
    }
  };

  return (
    <div
      className="modal"
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "100%",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <button
        onClick={onClose}
        style={{
          color: "#fff",
          backgroundColor: "transparent",
          borderColor: "#fff",
          borderRadius: "0px",
          border: "2px solid #fff",
          marginLeft: "10px",
        }}
      >
        Save segment
      </button>
      <div
        className="modal-content"
        style={{
          backgroundColor: "#fff",
          boxShadow: "0 0 10px rgba(0, 0, 0,0.1)",
          // padding: '20px',
          // borderRadius: '5px',
          width: "400px",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "10%",
            color: "#fff",
            backgroundColor: "#06dae9",
            display: "flex",
            alignItems: "center",
            // padding: '-20px',
          }}
        >
          <button
            style={{
              background: "none",
              color: "#fff",
              border: "none",
              fontSize: "18px",
              cursor: "pointer",
            }}
            onClick={onClose}
          >
            <FaChevronLeft />
          </button>
          <h4 style={{ fontSize: "18px", fontWeight: "500" }}>
            Saving Segment
          </h4>
        </div>

        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            overflowY: "auto",
          }}
        >
          {/* {' '} */}
          <div className="input-group" style={{ padding: "20px" }}>
            <h4 style={{ marginBottom: "10px", fontWeight: "400" }}>
              Enter the Name of the Segment
            </h4>
            <input
              type="text"
              placeholder="Name of the segment"
              value={segmentName}
              onChange={(e) => setSegmentName(e.target.value)}
              style={{
                width: "90%",
                padding: "8px",
                marginBottom: "10px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />

            <p style={{ fontSize: "14px" }}>
              To save your segment, you need to add the schemas to build the
              query
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                fontSize: "14px",
              }}
            >
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "green",
                  marginRight: "3px",
                  marginTop: "3px",
                }}
              ></span>
              <span>- User Traits</span>
              <span
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "red",
                  marginRight: "3px",
                  marginTop: "3px",
                  marginLeft: "10px",
                }}
              ></span>
              <span>- Group Traits</span>
            </div>

            <div style={{ margin: "15px 0" }}>
              {schemas.map((schema, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: schema?.value
                        ? schema.value === "gender" ||
                          schema.value === "age" ||
                          schema.value === "last_name" ||
                          schema.value === "first_name"
                          ? "green"
                          : "red"
                        : "grey",
                      marginRight: "10px",
                    }}
                  ></span>

                  <select
                    key={index}
                    value={schema?.value || ""}
                    onChange={(e) => {
                      const selectedValue = e.target.value;
                      const selectedOption = availableOptions.find(
                        (option) => option?.value === selectedValue
                      );
                      console.log(
                        "Selected value:",
                        e.target.value,
                        "Index:",
                        index,
                        schema,
                        schema.value,
                        "availableOptions",
                        availableOptions
                      );

                      console.log(selectedOption, "SEELECTEDOPTIN");
                      if (selectedOption) {
                        handleSelectChange(
                          selectedOption.value,
                          selectedOption.label,
                          index
                        );
                      }
                    }}
                    style={{
                      flex: 1,
                      padding: "8px",
                      marginRight: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  >
                    <option value="" disabled>
                      Add schema to segment
                    </option>
                    {/* {availableOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))} */}

                    {schemaOptions
                      .filter((option) => {
                        return !schemas.some(
                          (s, i) => i !== index && s.value === option.value
                        );
                      })
                      .map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                  </select>
                  <button
                    className="remove_btn"
                    onClick={() => removeSchema(index)}
                  >
                    &minus;
                    {/* &times; */}
                  </button>
                </div>
              ))}
              <button
                onClick={addSchema}
                style={{
                  backgroundColor: "#fff",
                  color: "green",
                  fontWeight: "bold",
                  border: "none",
                  borderRadius: "0px",
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                }}
              >
                <span style={{ fontWeight: "bold" }}>+</span>
                <span
                  style={{
                    borderBottom: "1px solid green",
                  }}
                >
                  Add new schema
                </span>
              </button>
            </div>
            {errors && <p style={{ color: "red" }}>{errors}</p>}
          </div>
          {/* // <button onClick={handleSaveSegment}>Save the Segment</button> */}
          <div className="modal_actions">
            <button className="save_btn" onClick={handleSaveSegment}>
              Save the Segment
            </button>
            <button className="cancel_btn" onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    //{' '}
    // </div>
  );
}

export default Modal;
