// import React, { useState, useEffect } from "react";

// const API_URL = "http://192.168.1.93:8000/api/v1/listings";

// function Listing() {
//   const [listings, setListings] = useState([]);
//   const [showForm, setShowForm] = useState(false);
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     address: "",
//     city: "",
//     state: "",
//     pincode: "",
//     amenities: [],
//     location: { type: "Point", coordinates: ["", ""] },
//     pricePerNight: "",
//     currency: "",
//     bedrooms: "",
//     maxGuests: "",
//     capacity: { adults: "", children: "", infants: "", pets: "" },
//     houseRules: [],
//     safetyAndProperty: [],
//     status: "active",
//     isVerified: false,
//     verificationStatus: "pending",
//     imageFiles: [],
//     imagePreviews: [],
//   });
//   const [selectedListing, setSelectedListing] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // ✅ Fetch listings on mount
// useEffect(() => {
//   const fetchListings = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(API_URL);
//       if (!res.ok) throw new Error("Failed to fetch listings");
//       const data = await res.json();

//       // ✅ API returns { pagination, data: [] }
//     setListings(Array.isArray(data?.data?.listings) ? data.data.listings : []);

//     } catch (err) {
//       console.error("Fetch error:", err);
//       setListings([]); // ensure it's always an array
//     } finally {
//       setLoading(false);
//     }
//   };
//   fetchListings();
// }, []);

//   // ✅ Input Change
//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name.startsWith("location.")) {
//       const key = name.split(".")[1];
//       const newCoords = [...formData.location.coordinates];
//       if (key === "lat") newCoords[1] = value;
//       if (key === "long") newCoords[0] = value;
//       setFormData({
//         ...formData,
//         location: { ...formData.location, coordinates: newCoords },
//       });
//     } else if (name.startsWith("capacity.")) {
//       const key = name.split(".")[1];
//       setFormData({
//         ...formData,
//         capacity: { ...formData.capacity, [key]: value },
//       });
//     } else if (["amenities", "houseRules", "safetyAndProperty"].includes(name)) {
//       setFormData({
//         ...formData,
//         [name]: value.split(",").map((v) => v.trim()),
//       });
//     } else if (type === "checkbox") {
//       setFormData({ ...formData, [name]: checked });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   // ✅ Image Upload
//   const handleImageUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const previews = files.map((file) => URL.createObjectURL(file));
//     setFormData({
//       ...formData,
//       imageFiles: files,
//       imagePreviews: previews,
//     });
//   };

//   // ✅ Submit to API
//   const handleAddListing = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(API_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       if (!res.ok) throw new Error("Failed to add listing");
//       const newListing = await res.json();

//       const created = newListing?.data || newListing;
//       setListings((prev) => [created, ...prev]);

//       setFormData({
//         title: "",
//         description: "",
//         address: "",
//         city: "",
//         state: "",
//         pincode: "",
//         amenities: [],
//         location: { type: "Point", coordinates: ["", ""] },
//         pricePerNight: "",
//         currency: "",
//         bedrooms: "",
//         maxGuests: "",
//         capacity: { adults: "", children: "", infants: "", pets: "" },
//         houseRules: [],
//         safetyAndProperty: [],
//         status: "active",
//         isVerified: false,
//         verificationStatus: "pending",
//         imageFiles: [],
//         imagePreviews: [],
//       });
//       setShowForm(false);
//     } catch (err) {
//       console.error("Submit error:", err);
//     }
//   };

//   return (
//     <div
//       style={{
//         maxWidth: "1200px",
//         margin: "0 auto",
//         padding: "20px",
//         fontFamily: "'Poppins', sans-serif",
//         fontSize: "13px",
//       }}
//     >
//       {/* ✅ Header */}
//       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
//         <h1 style={{ color: "#333", fontSize: "20px", fontWeight: "600" }}>Property Listings</h1>
//         <button onClick={() => setShowForm(!showForm)} style={addBtn}>
//           {showForm ? "Close Form" : "+ Add Listing"}
//         </button>
//       </div>

//       {/* ✅ Form */}
//       {showForm && (
//         <form onSubmit={handleAddListing} style={formBox}>
//           <div style={grid2}>
//             <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" style={inputStyle} required />
//             <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" style={inputStyle} required />
//             <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" style={inputStyle} />
//             <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" style={inputStyle} />
//             <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" style={inputStyle} />
//             <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" style={inputStyle} />
//             <input type="text" name="amenities" onChange={handleInputChange} placeholder="Amenities (comma separated)" style={inputStyle} />
//             <input type="number" name="pricePerNight" value={formData.pricePerNight} onChange={handleInputChange} placeholder="Price Per Night" style={inputStyle} />
//             <input type="text" name="currency" value={formData.currency} onChange={handleInputChange} placeholder="Currency" style={inputStyle} />
//             <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleInputChange} placeholder="Bedrooms" style={inputStyle} />
//             <input type="number" name="maxGuests" value={formData.maxGuests} onChange={handleInputChange} placeholder="Max Guests" style={inputStyle} />
//             <input type="number" name="capacity.adults" value={formData.capacity.adults} onChange={handleInputChange} placeholder="Adults" style={inputStyle} />
//             <input type="number" name="capacity.children" value={formData.capacity.children} onChange={handleInputChange} placeholder="Children" style={inputStyle} />
//             <input type="number" name="capacity.infants" value={formData.capacity.infants} onChange={handleInputChange} placeholder="Infants" style={inputStyle} />
//             <input type="number" name="capacity.pets" value={formData.capacity.pets} onChange={handleInputChange} placeholder="Pets" style={inputStyle} />
//             <input type="text" name="houseRules" onChange={handleInputChange} placeholder="House Rules (comma separated)" style={inputStyle} />
//             <input type="text" name="safetyAndProperty" onChange={handleInputChange} placeholder="Safety & Property (comma separated)" style={inputStyle} />
//             <select name="status" value={formData.status} onChange={handleInputChange} style={inputStyle}>
//               <option value="active">Active</option>
//               <option value="inactive">Inactive</option>
//             </select>
//             <label style={{ fontSize: "12px" }}>
//               Verified? <input type="checkbox" name="isVerified" checked={formData.isVerified} onChange={handleInputChange} />
//             </label>
//           </div>

//           {/* ✅ Image Upload */}
//           <div style={{ marginTop: "15px" }}>
//             <label style={{ fontWeight: "600", fontSize: "13px", marginBottom: "6px", display: "block" }}>Upload Images</label>
//             <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
//             <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
//               {formData.imagePreviews.map((src, i) => (
//                 <img key={i} src={src} alt="preview" style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "4px" }} />
//               ))}
//             </div>
//           </div>

//           <button type="submit" style={submitBtn}>Save Listing</button>
//         </form>
//       )}

//       {/* ✅ Cards */}
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" }}>
//           {listings.map((listing, index) => (
//             <div key={listing._id || index} style={card} onClick={() => setSelectedListing(listing)}>
// {listing.imagePreviews?.length > 0 ? (
//   <img src={listing.imagePreviews[0]} alt="Listing" style={imgStyle} />
// ) : listing.imageUrls?.length > 0 ? (
//   <img src={listing.imageUrls[0]} alt="Listing" style={imgStyle} />
// ) : listing.imageUrl ? (
//   <img src={listing.imageUrl} alt="Listing" style={imgStyle} />
// ) : null}

//               <h3 style={{ fontSize: "15px", margin: "0 0 6px" }}>{listing.title}</h3>
//               <p style={{ margin: "0 0 6px", color: "#666" }}>{listing.city}, {listing.state}</p>
//               <p style={{ fontSize: "13px", margin: "0 0 6px" }}><strong>{listing.pricePerNight} {listing.currency}</strong> / night</p>
//               <p style={{ fontSize: "12px", color: listing.status === "active" ? "#28a745" : "#dc3545" }}>{listing.status}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ✅ Modal */}
//       {selectedListing && (
//         <div style={modalOverlay} onClick={() => setSelectedListing(null)}>
//           <div style={modalContent} onClick={(e) => e.stopPropagation()}>
//             <button style={closeBtn} onClick={() => setSelectedListing(null)}>✖</button>
//             <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>{selectedListing.title}</h2>
//             <p>{selectedListing.description}</p>

//             <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "12px" }}>
//               {selectedListing.imagePreviews?.map((src, i) => (
//                 <img key={i} src={src} alt="preview" style={{ width: "100px", height: "80px", objectFit: "cover", borderRadius: "4px" }} />
//               ))}
//               {selectedListing.imageUrls?.map((src, i) => (
//                 <img key={i} src={src} alt="listing" style={{ width: "100px", height: "80px", objectFit: "cover", borderRadius: "4px" }} />
//               ))}
//             </div>

//             <p><strong>Address:</strong> {selectedListing.address}, {selectedListing.city}, {selectedListing.state} {selectedListing.pincode}</p>
//             <p><strong>Amenities:</strong> {selectedListing.amenities?.join(", ")}</p>
//             <p><strong>House Rules:</strong> {selectedListing.houseRules?.join(", ")}</p>
//             <p><strong>Safety:</strong> {selectedListing.safetyAndProperty?.join(", ")}</p>
//             <p><strong>Capacity:</strong> Adults {selectedListing.capacity?.adults}, Children {selectedListing.capacity?.children}</p>
//             <p><strong>Price:</strong> {selectedListing.pricePerNight} {selectedListing.currency}</p>
//             <p><strong>Status:</strong> {selectedListing.status} | <strong>Verified:</strong> {selectedListing.isVerified ? "✅" : "❌"}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// /* ✅ Styles */
// const inputStyle = { padding: "8px", border: "1px solid #ddd", borderRadius: "4px", fontSize: "12px", width: "100%" };
// const grid2 = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "12px" };
// const formBox = { background: "#fff", padding: "18px", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", marginBottom: "25px" };
// const addBtn = { padding: "8px 16px", background: "#FF385C", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "13px", fontWeight: "500" };
// const submitBtn = { marginTop: "15px", padding: "10px 16px", background: "#28a745", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", width: "100%", fontSize: "13px", fontWeight: "500" };
// const card = { background: "#fff", borderRadius: "6px", padding: "12px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)", cursor: "pointer" };
// const imgStyle = { width: "100%", height: "150px", objectFit: "cover", borderRadius: "6px", marginBottom: "8px" };
// const modalOverlay = { position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1000 };
// const modalContent = { background: "#fff", padding: "16px", borderRadius: "8px", width: "500px", maxHeight: "80vh", overflowY: "auto", position: "relative" };
// const closeBtn = { position: "absolute", top: "10px", right: "10px", border: "none", background: "transparent", fontSize: "16px", cursor: "pointer" };

// export default Listing;


import React, { useState, useEffect } from "react";

const API_URL = "https://api.stayfinderindia.net/api/v1/listings";

function Listing() {
  const [listings, setListings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    amenities: [],
    location: { type: "Point", coordinates: ["", ""] },
    pricePerNight: "",
    currency: "",
    bedrooms: "",
    maxGuests: "",
    capacity: { adults: "", children: "", infants: "", pets: "" },
    houseRules: [],
    safetyAndProperty: [],
    status: "active",
    isVerified: false,
    verificationStatus: "pending",
    imageFiles: [],
    imagePreviews: [],
  });
  const [selectedListing, setSelectedListing] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  // ✅ Fetch listings on mount
  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch listings");
        const data = await res.json();

        // ✅ API returns { pagination, data: [] }
        setListings(
          Array.isArray(data?.data?.listings) ? data.data.listings : []
        );
      } catch (err) {
        console.error("Fetch error:", err);
        setListings([]); // ensure it's always an array
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  // ✅ Pagination logic
  const totalItems = listings.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData = listings.slice(indexOfFirst, indexOfLast);

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // reset page
  };

  // ✅ Input Change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("location.")) {
      const key = name.split(".")[1];
      const newCoords = [...formData.location.coordinates];
      if (key === "lat") newCoords[1] = value;
      if (key === "long") newCoords[0] = value;
      setFormData({
        ...formData,
        location: { ...formData.location, coordinates: newCoords },
      });
    } else if (name.startsWith("capacity.")) {
      const key = name.split(".")[1];
      setFormData({
        ...formData,
        capacity: { ...formData.capacity, [key]: value },
      });
    } else if (["amenities", "houseRules", "safetyAndProperty"].includes(name)) {
      setFormData({
        ...formData,
        [name]: value.split(",").map((v) => v.trim()),
      });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setFormData({
      ...formData,
      imageFiles: files,
      imagePreviews: previews,
    });
  };

  // ✅ Submit to API
  const handleAddListing = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Failed to add listing");
      const newListing = await res.json();

      const created = newListing?.data || newListing;
      setListings((prev) => [created, ...prev]);

      setFormData({
        title: "",
        description: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        amenities: [],
        location: { type: "Point", coordinates: ["", ""] },
        pricePerNight: "",
        currency: "",
        bedrooms: "",
        maxGuests: "",
        capacity: { adults: "", children: "", infants: "", pets: "" },
        houseRules: [],
        safetyAndProperty: [],
        status: "active",
        isVerified: false,
        verificationStatus: "pending",
        imageFiles: [],
        imagePreviews: [],
      });
      setShowForm(false);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "'Poppins', sans-serif",
        fontSize: "13px",
      }}
    >
      {/* ✅ Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h1 style={{ color: "#333", fontSize: "20px", fontWeight: "600" }}>
          Property Listings
        </h1>
        <button onClick={() => setShowForm(!showForm)} style={addBtn}>
          {showForm ? "Close Form" : "+ Add Listing"}
        </button>
      </div>

      {/* ✅ Form */}
     {showForm && (
        <form onSubmit={handleAddListing} style={formBox}>
          <div style={grid2}>
            <input type="text" name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" style={inputStyle} required />
            <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Description" style={inputStyle} required />
            <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="Address" style={inputStyle} />
            <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" style={inputStyle} />
            <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" style={inputStyle} />
            <input type="text" name="pincode" value={formData.pincode} onChange={handleInputChange} placeholder="Pincode" style={inputStyle} />
            <input type="text" name="amenities" onChange={handleInputChange} placeholder="Amenities (comma separated)" style={inputStyle} />
            <input type="number" name="pricePerNight" value={formData.pricePerNight} onChange={handleInputChange} placeholder="Price Per Night" style={inputStyle} />
            <input type="text" name="currency" value={formData.currency} onChange={handleInputChange} placeholder="Currency" style={inputStyle} />
            <input type="number" name="bedrooms" value={formData.bedrooms} onChange={handleInputChange} placeholder="Bedrooms" style={inputStyle} />
            <input type="number" name="maxGuests" value={formData.maxGuests} onChange={handleInputChange} placeholder="Max Guests" style={inputStyle} />
            <input type="number" name="capacity.adults" value={formData.capacity.adults} onChange={handleInputChange} placeholder="Adults" style={inputStyle} />
            <input type="number" name="capacity.children" value={formData.capacity.children} onChange={handleInputChange} placeholder="Children" style={inputStyle} />
            <input type="number" name="capacity.infants" value={formData.capacity.infants} onChange={handleInputChange} placeholder="Infants" style={inputStyle} />
            <input type="number" name="capacity.pets" value={formData.capacity.pets} onChange={handleInputChange} placeholder="Pets" style={inputStyle} />
            <input type="text" name="houseRules" onChange={handleInputChange} placeholder="House Rules (comma separated)" style={inputStyle} />
            <input type="text" name="safetyAndProperty" onChange={handleInputChange} placeholder="Safety & Property (comma separated)" style={inputStyle} />
            <select name="status" value={formData.status} onChange={handleInputChange} style={inputStyle}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <label style={{ fontSize: "12px" }}>
              Verified? <input type="checkbox" name="isVerified" checked={formData.isVerified} onChange={handleInputChange} />
            </label>
          </div>

          {/* ✅ Image Upload */}
          <div style={{ marginTop: "15px" }}>
            <label style={{ fontWeight: "600", fontSize: "13px", marginBottom: "6px", display: "block" }}>Upload Images</label>
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
            <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
              {formData.imagePreviews.map((src, i) => (
                <img key={i} src={src} alt="preview" style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "4px" }} />
              ))}
            </div>
          </div>

          <button type="submit" style={submitBtn}>Save Listing</button>
        </form>
      )}
            
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
              gap: "16px",
            }}
          >
            {currentData.map((listing, index) => (
              <div
                key={listing._id || index}
                style={card}
                onClick={() => setSelectedListing(listing)}
              >
                {listing.imagePreviews?.length > 0 ? (
                  <img src={listing.imagePreviews[0]} alt="Listing" style={imgStyle} />
                ) : listing.imageUrls?.length > 0 ? (
                  <img src={listing.imageUrls[0]} alt="Listing" style={imgStyle} />
                ) : listing.imageUrl ? (
                  <img src={listing.imageUrl} alt="Listing" style={imgStyle} />
                ) : null}

                <h3 style={{ fontSize: "15px", margin: "0 0 6px" }}>
                  {listing.title}
                </h3>
                <p style={{ margin: "0 0 6px", color: "#666" }}>
                  {listing.city}, {listing.state}
                </p>
                <p style={{ fontSize: "13px", margin: "0 0 6px" }}>
                  <strong>
                    {listing.pricePerNight} {listing.currency}
                  </strong>{" "}
                  / night
                </p>
                <p
                  style={{
                    fontSize: "12px",
                    color:
                      listing.status === "active" ? "#28a745" : "#dc3545",
                  }}
                >
                  {listing.status}
                </p>
              </div>
            ))}
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
                {[6, 9, 12, 15].map((n) => (
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
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                  cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                }}
              >
                ▶
              </button>
            </div>
          </div>
        </>
      )}

      {/* ✅ Modal */}
      {selectedListing && (
        <div style={modalOverlay} onClick={() => setSelectedListing(null)}>
          <div style={modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={closeBtn} onClick={() => setSelectedListing(null)}>
              ✖
            </button>
            <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
              {selectedListing.title}
            </h2>
            <p>{selectedListing.description}</p>

            <div
              style={{
                display: "flex",
                gap: "8px",
                flexWrap: "wrap",
                marginBottom: "12px",
              }}
            >
              {selectedListing.imagePreviews?.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="preview"
                  style={{
                    width: "100px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              ))}
              {selectedListing.imageUrls?.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt="listing"
                  style={{
                    width: "100px",
                    height: "80px",
                    objectFit: "cover",
                    borderRadius: "4px",
                  }}
                />
              ))}
            </div>

            <p>
              <strong>Address:</strong> {selectedListing.address},{" "}
              {selectedListing.city}, {selectedListing.state}{" "}
              {selectedListing.pincode}
            </p>
            <p>
              <strong>Amenities:</strong>{" "}
              {selectedListing.amenities?.join(", ")}
            </p>
            <p>
              <strong>House Rules:</strong>{" "}
              {selectedListing.houseRules?.join(", ")}
            </p>
            <p>
              <strong>Safety:</strong>{" "}
              {selectedListing.safetyAndProperty?.join(", ")}
            </p>
            <p>
              <strong>Capacity:</strong> Adults{" "}
              {selectedListing.capacity?.adults}, Children{" "}
              {selectedListing.capacity?.children}
            </p>
            <p>
              <strong>Price:</strong> {selectedListing.pricePerNight}{" "}
              {selectedListing.currency}
            </p>
            <p>
              <strong>Status:</strong> {selectedListing.status} |{" "}
              <strong>Verified:</strong>{" "}
              {selectedListing.isVerified ? "✅" : "❌"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ✅ Styles */
const inputStyle = {
  padding: "8px",
  border: "1px solid #ddd",
  borderRadius: "4px",
  fontSize: "12px",
  width: "100%",
};
const grid2 = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
  gap: "12px",
};
const formBox = {
  background: "#fff",
  padding: "18px",
  borderRadius: "8px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  marginBottom: "25px",
};
const addBtn = {
  padding: "8px 16px",
  background: "#FF385C",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontSize: "13px",
  fontWeight: "500",
};
const submitBtn = {
  marginTop: "15px",
  padding: "10px 16px",
  background: "#28a745",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  width: "100%",
  fontSize: "13px",
  fontWeight: "500",
};
const card = {
  background: "#fff",
  borderRadius: "6px",
  padding: "12px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  cursor: "pointer",
};
const imgStyle = {
  width: "100%",
  height: "150px",
  objectFit: "cover",
  borderRadius: "6px",
  marginBottom: "8px",
};
const modalOverlay = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1000,
};
const modalContent = {
  background: "#fff",
  padding: "16px",
  borderRadius: "8px",
  width: "500px",
  maxHeight: "80vh",
  overflowY: "auto",
  position: "relative",
};
const closeBtn = {
  position: "absolute",
  top: "10px",
  right: "10px",
  border: "none",
  background: "transparent",
  fontSize: "16px",
  cursor: "pointer",
};

export default Listing;
