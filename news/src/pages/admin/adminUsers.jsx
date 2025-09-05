import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      const token = localStorage.getItem("token");
      axios
        .get("http://localhost:3005/api/users/all", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setUsers(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [loading]);

  if (loading) {
    return <p className="text-center text-lg mt-6">Loading users...</p>;
  }

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Users</h1>

      {/* Responsive Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-sm sm:text-base">
            <tr>
              <th className="px-2 sm:px-4 py-2 border">#</th>
              <th className="px-2 sm:px-4 py-2 border">First Name</th>
              <th className="px-2 sm:px-4 py-2 border">Last Name</th>
              <th className="px-2 sm:px-4 py-2 border">Email</th>
              <th className="px-2 sm:px-4 py-2 border">Role</th>
              <th className="px-2 sm:px-4 py-2 border">Phone</th>
              <th className="px-2 sm:px-4 py-2 border">Address</th>
            </tr>
          </thead>
          <tbody className="text-sm sm:text-base">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user._id}
                  className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-2 sm:px-4 py-2 border text-center">
                    {index + 1}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border">{user.firstName}</td>
                  <td className="px-2 sm:px-4 py-2 border">{user.lastName}</td>
                  <td className="px-2 sm:px-4 py-2 border break-words max-w-[150px] sm:max-w-none">
                    {user.email}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border capitalize">
                    {user.role}
                  </td>
                  <td className="px-2 sm:px-4 py-2 border">{user.phone}</td>
                  <td className="px-2 sm:px-4 py-2 border break-words max-w-[150px] sm:max-w-none">
                    {user.address}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="7"
                  className="px-4 py-3 text-center text-gray-500"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
