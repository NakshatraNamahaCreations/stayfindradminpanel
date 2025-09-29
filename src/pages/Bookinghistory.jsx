// import React, { useEffect, useState } from "react";

// const API_URL = "http://192.168.1.93:8000/api/v1/bookings";

// function BookingHistory() {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ✅ Fetch bookings on mount
//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(API_URL);
//         if (!res.ok) throw new Error("Failed to fetch bookings");
//         const data = await res.json();

//         // ✅ The API returns data: [] directly
//         setBookings(Array.isArray(data?.data) ? data.data : []);
//       } catch (err) {
//         console.error("Fetch error:", err);
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   // ✅ Format date nicely
//   const formatDate = (isoString) => {
//     if (!isoString) return "-";
//     const d = new Date(isoString);
//     return d.toLocaleDateString("en-IN", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   return (
//     <div style={{ maxWidth: "1000px", margin: "20px auto", fontFamily: "Poppins, sans-serif" }}>
//       <h2 style={{ marginBottom: "16px", fontSize: "20px", fontWeight: "600" }}>Booking History</h2>

//       {loading && <p>Loading bookings...</p>}
//       {error && <p style={{ color: "red" }}>Error: {error}</p>}

//       {!loading && bookings.length === 0 && <p>No bookings found.</p>}

//       {!loading && bookings.length > 0 && (
//         <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
//           <thead>
//             <tr style={{ background: "#f8f8f8", textAlign: "left" }}>
//               <th style={th}>Sl No</th>
//               <th style={th}>Listing ID</th>
//               <th style={th}>Guest ID</th>
//               <th style={th}>Check-In</th>
//               <th style={th}>Check-Out</th>
//               <th style={th}>Guests</th>
//               <th style={th}>Status</th>
//               <th style={th}>Created</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((b, i) => (
//               <tr key={b._id} style={{ borderBottom: "1px solid #eee" }}>
//                 <td style={td}>{i + 1}</td>
//                 <td style={td}>{b.listingId}</td>
//                 <td style={td}>{b.guestId}</td>
//                 <td style={td}>{formatDate(b.checkInDate)}</td>
//                 <td style={td}>{formatDate(b.checkOutDate)}</td>
//                 <td style={td}>
//                   A:{b.guests?.adults || 0} | C:{b.guests?.children || 0} | I:{b.guests?.infants || 0} | P:{b.guests?.pets || 0}
//                 </td>
//                 <td style={{ ...td, color: b.status === "accepted" ? "green" : "red" }}>{b.status}</td>
//                 <td style={td}>{formatDate(b.createdAt)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// const th = {
//   padding: "10px",
//   borderBottom: "2px solid #ddd",
//   fontWeight: "600",
// };

// const td = {
//   padding: "8px",
//   borderBottom: "1px solid #eee",
// };

// export default BookingHistory;
import React, { useEffect, useState } from "react";

const API_URL = "https://api.stayfinderindia.net/api/v1/bookings";

function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ✅ Fetch bookings on mount
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch bookings");
        const data = await res.json();

        // ✅ API returns { data: [] }
        setBookings(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  // ✅ Format date nicely
  const formatDate = (isoString) => {
    if (!isoString) return "-";
    const d = new Date(isoString);
    return d.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // ✅ Pagination logic
  const totalItems = bookings.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const indexOfLast = currentPage * rowsPerPage;
  const indexOfFirst = indexOfLast - rowsPerPage;
  const currentData = bookings.slice(indexOfFirst, indexOfLast);

  const handleRowsChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setCurrentPage(1); // reset to first page
  };

  return (
    <div style={{ maxWidth: "1000px", margin: "20px auto", fontFamily: "Poppins, sans-serif" }}>
      <h2 style={{ marginBottom: "16px", fontSize: "20px", fontWeight: "600" }}>
        Booking History
      </h2>

      {loading && <p>Loading bookings...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && bookings.length === 0 && <p>No bookings found.</p>}

      {!loading && bookings.length > 0 && (
        <>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "14px" }}>
            <thead>
              <tr style={{ background: "#f8f8f8", textAlign: "left" }}>
                <th style={th}>Sl No</th>
                <th style={th}>Listing ID</th>
                <th style={th}>Guest ID</th>
                <th style={th}>Check-In</th>
                <th style={th}>Check-Out</th>
                <th style={th}>Guests</th>
                <th style={th}>Status</th>
                <th style={th}>Created</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((b, i) => (
                <tr key={b._id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={td}>{indexOfFirst + i + 1}</td>
                  <td style={td}>{b.listingId}</td>
                  <td style={td}>{b.guestId}</td>
                  <td style={td}>{formatDate(b.checkInDate)}</td>
                  <td style={td}>{formatDate(b.checkOutDate)}</td>
                  <td style={td}>
                    A:{b.guests?.adults || 0} | C:{b.guests?.children || 0} | I:{b.guests?.infants || 0} | P:{b.guests?.pets || 0}
                  </td>
                  <td style={{ ...td, color: b.status === "accepted" ? "green" : "red" }}>
                    {b.status}
                  </td>
                  <td style={td}>{formatDate(b.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>

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
                : `${indexOfFirst + 1}–${indexOfLast > totalItems ? totalItems : indexOfLast} of ${totalItems}`}
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
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
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
    </div>
  );
}

const th = {
  padding: "10px",
  borderBottom: "2px solid #ddd",
  fontWeight: "600",
};

const td = {
  padding: "8px",
  borderBottom: "1px solid #eee",
};

export default BookingHistory;
