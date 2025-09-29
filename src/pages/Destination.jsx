// import React, { useState, useEffect } from "react";

// const API_URL = "http://192.168.1.93:8000/api/v1/suggested-destinations";

// const Destination = () => {
//   const [formData, setFormData] = useState({
//     place: "",
//     state: "",
//     latitude: "",
//     longitude: "",
//     imageUrl: "",
//   });
//   const [destinations, setDestinations] = useState([]);
//   const [errors, setErrors] = useState({});
//   const [showForm, setShowForm] = useState(false);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch destinations on mount
//   useEffect(() => {
//     const fetchDestinations = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(API_URL);
//         if (!res.ok) throw new Error("Failed to fetch destinations");
//         const data = await res.json();
//         // ✅ Use `data.data` array only
//         setDestinations(data.data || []);
//       } catch (err) {
//         console.error("Fetch error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchDestinations();
//   }, []);

//   // ✅ Validation
//   const validateForm = () => {
//     const newErrors = {};
//     if (!formData.place.trim()) newErrors.place = "Place is required";
//     if (!formData.latitude.trim())
//       newErrors.latitude = "Latitude is required";
//     else if (
//       isNaN(formData.latitude) ||
//       formData.latitude < -90 ||
//       formData.latitude > 90
//     )
//       newErrors.latitude = "Latitude must be between -90 and 90";
//     if (!formData.longitude.trim())
//       newErrors.longitude = "Longitude is required";
//     else if (
//       isNaN(formData.longitude) ||
//       formData.longitude < -180 ||
//       formData.longitude > 180
//     )
//       newErrors.longitude = "Longitude must be between -180 and 180";
//     if (
//       formData.imageUrl &&
//       !/^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/i.test(formData.imageUrl)
//     )
//       newErrors.imageUrl = "Invalid image URL";
//     return newErrors;
//   };

//   // ✅ Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors({ ...errors, [name]: "" });
//   };

//   // ✅ Submit handler with API POST
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validateForm();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           place: formData.place,
//           state: formData.state,
//           imageUrl: formData.imageUrl,
//           location: {
//             type: "Point",
//             coordinates: [parseFloat(formData.longitude), parseFloat(formData.latitude)],
//           },
//         }),
//       });
//       if (!res.ok) throw new Error("Failed to add destination");
//       const newDest = await res.json();

//       setDestinations((prev) => [...prev, newDest]);
//       setFormData({
//         place: "",
//         state: "",
//         latitude: "",
//         longitude: "",
//         imageUrl: "",
//       });
//       setErrors({});
//       setShowForm(false);
//     } catch (err) {
//       console.error("Submit error:", err);
//     }
//   };

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "linear-gradient(to bottom right, #eef2ff, #fdf2f8)",
//         padding: "32px",
//         fontFamily: "'Poppins', sans-serif",
//       }}
//     >
//       {/* Header */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: "24px",
//         }}
//       >
//         <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#333" }}>
//           Destination Manager
//         </h1>
//         {!showForm && (
//           <button
//             onClick={() => setShowForm(true)}
//             style={{
//               padding: "10px 18px",
//               backgroundColor: "#FF385C",
//               color: "#fff",
//               border: "none",
//               borderRadius: "6px",
//               fontWeight: "400",
//               cursor: "pointer",
//             }}
//           >
//             + Add Destination
//           </button>
//         )}
//       </div>

//       {/* Add Form */}
//       {showForm && (
//         <div
//           style={{
//             backgroundColor: "#fff",
//             padding: "24px",
//             borderRadius: "8px",
//             boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
//             marginBottom: "24px",
//           }}
//         >
//           <form
//             onSubmit={handleSubmit}
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
//               gap: "16px",
//             }}
//           >
//             {["place", "state", "latitude", "longitude", "imageUrl"].map(
//               (field, i) => (
//                 <div key={i}>
//                   <input
//                     type={field === "latitude" || field === "longitude" ? "number" : "text"}
//                     step="any"
//                     name={field}
//                     placeholder={
//                       field === "state"
//                         ? "State (optional)"
//                         : field.charAt(0).toUpperCase() + field.slice(1)
//                     }
//                     value={formData[field]}
//                     onChange={handleChange}
//                     style={{
//                       width: "100%",
//                       padding: "10px",
//                       border: errors[field]
//                         ? "2px solid #dc3545"
//                         : "1px solid #ccc",
//                       borderRadius: "6px",
//                       outline: "none",
//                     }}
//                   />
//                   {errors[field] && (
//                     <p style={{ color: "#dc3545", fontSize: "12px", marginTop: "4px" }}>
//                       {errors[field]}
//                     </p>
//                   )}
//                 </div>
//               )
//             )}

//             <div style={{ gridColumn: "1 / -1", textAlign: "right" }}>
//               <button
//                 type="submit"
//                 style={{
//                   padding: "10px 20px",
//                   marginRight: "10px",
//                   backgroundColor: "#4b5e9b",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "6px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Save
//               </button>
//               <button
//                 type="button"
//                 onClick={() => setShowForm(false)}
//                 style={{
//                   padding: "10px 20px",
//                   backgroundColor: "#dc3545",
//                   color: "#fff",
//                   border: "none",
//                   borderRadius: "6px",
//                   cursor: "pointer",
//                 }}
//               >
//                 Cancel
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Table */}
//       {loading ? (
//         <p style={{ textAlign: "center", color: "#666" }}>Loading...</p>
//       ) : destinations.length > 0 ? (
//         <div style={{ overflowX: "auto" }}>
//           <table
//             style={{
//               width: "100%",
//               borderCollapse: "collapse",
//               backgroundColor: "#fff",
//               borderRadius: "8px",
//               overflow: "hidden",
//               boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
//             }}
//           >
//             <thead style={{ backgroundColor: "#4b5e9b", color: "#fff" }}>
//               <tr>
//                 {["Place", "State", "Latitude", "Longitude", "Image", "Status"].map(
//                   (col) => (
//                     <th
//                       key={col}
//                       style={{ padding: "12px", textAlign: "left", fontWeight: "600" }}
//                     >
//                       {col}
//                     </th>
//                   )
//                 )}
//               </tr>
//             </thead>
//             <tbody>
//               {destinations.map((dest, index) => {
//                 const [lon, lat] = dest.location?.coordinates || [];
//                 return (
//                   <tr
//                     key={dest._id || index}
//                     style={{ backgroundColor: index % 2 === 0 ? "#f9fafb" : "#fff" }}
//                   >
//                     <td style={{ padding: "12px" }}>{dest.place}</td>
//                     <td style={{ padding: "12px" }}>{dest.state || "N/A"}</td>
//                     <td style={{ padding: "12px" }}>{lat}</td>
//                     <td style={{ padding: "12px" }}>{lon}</td>
//                     <td style={{ padding: "12px" }}>
//                       {dest.imageUrl ? (
//                         <img
//                           src={dest.imageUrl}
//                           alt={dest.place}
//                           style={{
//                             width: "64px",
//                             height: "48px",
//                             objectFit: "cover",
//                             borderRadius: "4px",
//                           }}
//                         />
//                       ) : (
//                         <span style={{ color: "#666" }}>No Image</span>
//                       )}
//                     </td>
//                     <td style={{ padding: "12px" }}>
//                       {dest.isActive ? (
//                         <span style={{ color: "green" }}>Active</span>
//                       ) : (
//                         <span style={{ color: "red" }}>Inactive</span>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <p style={{ textAlign: "center", color: "#666" }}>No destinations found.</p>
//       )}
//     </div>
//   );
// };

// export default Destination;
import React, { useState, useEffect } from "react";

const API_URL = "https://api.stayfinderindia.net/api/v1/suggested-destinations";

const Destination = () => {
  const [formData, setFormData] = useState({
    place: "",
    state: "",
    latitude: "",
    longitude: "",
    imageUrl: "",
  });
  const [destinations, setDestinations] = useState([]);
  const [errors, setErrors] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ✅ Fetch destinations on mount
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch destinations");
        const data = await res.json();
        setDestinations(data.data || []);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDestinations();
  }, []);

  // ✅ Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.place.trim()) newErrors.place = "Place is required";
    if (!formData.latitude.trim())
      newErrors.latitude = "Latitude is required";
    else if (
      isNaN(formData.latitude) ||
      formData.latitude < -90 ||
      formData.latitude > 90
    )
      newErrors.latitude = "Latitude must be between -90 and 90";
    if (!formData.longitude.trim())
      newErrors.longitude = "Longitude is required";
    else if (
      isNaN(formData.longitude) ||
      formData.longitude < -180 ||
      formData.longitude > 180
    )
      newErrors.longitude = "Longitude must be between -180 and 180";
    if (
      formData.imageUrl &&
      !/^https?:\/\/.*\.(?:png|jpg|jpeg|gif)$/i.test(formData.imageUrl)
    )
      newErrors.imageUrl = "Invalid image URL";
    return newErrors;
  };

  // ✅ Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  // ✅ Submit handler with API POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          place: formData.place,
          state: formData.state,
          imageUrl: formData.imageUrl,
          location: {
            type: "Point",
            coordinates: [
              parseFloat(formData.longitude),
              parseFloat(formData.latitude),
            ],
          },
        }),
      });
      if (!res.ok) throw new Error("Failed to add destination");
      const newDest = await res.json();

      setDestinations((prev) => [...prev, newDest]);
      setFormData({
        place: "",
        state: "",
        latitude: "",
        longitude: "",
        imageUrl: "",
      });
      setErrors({});
      setShowForm(false);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  // ✅ Pagination logic
  const totalItems = destinations.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData = destinations.slice(indexOfFirst, indexOfLast);

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // reset page
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #eef2ff, #fdf2f8)",
        padding: "32px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ fontSize: "28px", fontWeight: "700", color: "#333" }}>
          Destination Manager
        </h1>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            style={{
              padding: "10px 18px",
              backgroundColor: "#FF385C",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "400",
              cursor: "pointer",
            }}
          >
            + Add Destination
          </button>
        )}
      </div>

      {/* Add Form */}
      {showForm && (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "24px",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            marginBottom: "24px",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
            }}
          >
            {["place", "state", "latitude", "longitude", "imageUrl"].map(
              (field, i) => (
                <div key={i}>
                  <input
                    type={
                      field === "latitude" || field === "longitude"
                        ? "number"
                        : "text"
                    }
                    step="any"
                    name={field}
                    placeholder={
                      field === "state"
                        ? "State (optional)"
                        : field.charAt(0).toUpperCase() + field.slice(1)
                    }
                    value={formData[field]}
                    onChange={handleChange}
                    style={{
                      width: "100%",
                      padding: "10px",
                      border: errors[field]
                        ? "2px solid #dc3545"
                        : "1px solid #ccc",
                      borderRadius: "6px",
                      outline: "none",
                    }}
                  />
                  {errors[field] && (
                    <p
                      style={{
                        color: "#dc3545",
                        fontSize: "12px",
                        marginTop: "4px",
                      }}
                    >
                      {errors[field]}
                    </p>
                  )}
                </div>
              )
            )}

            <div style={{ gridColumn: "1 / -1", textAlign: "right" }}>
              <button
                type="submit"
                style={{
                  padding: "10px 20px",
                  marginRight: "10px",
                  backgroundColor: "#4b5e9b",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#dc3545",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      {loading ? (
        <p style={{ textAlign: "center", color: "#666" }}>Loading...</p>
      ) : destinations.length > 0 ? (
        <>
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                backgroundColor: "#fff",
                borderRadius: "8px",
                overflow: "hidden",
                boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              }}
            >
              <thead style={{ backgroundColor: "#4b5e9b", color: "#fff" }}>
                <tr>
                  {[
                    "Place",
                    "State",
                    "Latitude",
                    "Longitude",
                    "Image",
                    "Status",
                  ].map((col) => (
                    <th
                      key={col}
                      style={{
                        padding: "12px",
                        textAlign: "left",
                        fontWeight: "600",
                      }}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentData.map((dest, index) => {
                  const [lon, lat] = dest.location?.coordinates || [];
                  return (
                    <tr
                      key={dest._id || index}
                      style={{
                        backgroundColor: index % 2 === 0 ? "#f9fafb" : "#fff",
                      }}
                    >
                      <td style={{ padding: "12px" }}>{dest.place}</td>
                      <td style={{ padding: "12px" }}>{dest.state || "N/A"}</td>
                      <td style={{ padding: "12px" }}>{lat}</td>
                      <td style={{ padding: "12px" }}>{lon}</td>
                      <td style={{ padding: "12px" }}>
                        {dest.imageUrl ? (
                          <img
                            src={dest.imageUrl}
                            alt={dest.place}
                            style={{
                              width: "64px",
                              height: "48px",
                              objectFit: "cover",
                              borderRadius: "4px",
                            }}
                          />
                        ) : (
                          <span style={{ color: "#666" }}>No Image</span>
                        )}
                      </td>
                      <td style={{ padding: "12px" }}>
                        {dest.isActive ? (
                          <span style={{ color: "green" }}>Active</span>
                        ) : (
                          <span style={{ color: "red" }}>Inactive</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* ✅ Pagination UI */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "16px",
              gap: "16px",
              fontSize: "14px",
              color: "#333",
            }}
          >
            <div>
              Rows per page:{" "}
              <select
                value={rowsPerPage}
                onChange={handleRowsChange}
                style={{ padding: "4px 8px", borderRadius: "4px" }}
              >
                {[5, 10, 15, 20].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {totalItems === 0
                ? "0 of 0"
                : `${indexOfFirst + 1}–${
                    indexOfLast > totalItems ? totalItems : indexOfLast
                  } of ${totalItems}`}
            </div>
            <div>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.max(prev - 1, 1))
                }
                disabled={currentPage === 1}
                style={{
                  marginRight: "8px",
                  padding: "4px 8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  backgroundColor: currentPage === 1 ? "#eee" : "#fff",
                  cursor: currentPage === 1 ? "not-allowed" : "pointer",
                }}
              >
                ◀
              </button>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  backgroundColor: currentPage === totalPages ? "#eee" : "#fff",
                  cursor:
                    currentPage === totalPages ? "not-allowed" : "pointer",
                }}
              >
                ▶
              </button>
            </div>
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center", color: "#666" }}>
          No destinations found.
        </p>
      )}
    </div>
  );
};

export default Destination;
