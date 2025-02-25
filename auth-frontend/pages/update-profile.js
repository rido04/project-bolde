import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

export default function UpdateUser() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          icon: "warning",
          title: "Anda harus login terlebih dahulu!",
        }).then(() => router.push("/login"));
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/user", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setFormData({ username: data.username, email: data.email, password: "" });
        } else {
          Swal.fire({
            icon: "error",
            title: "Gagal mengambil data",
            text: data.message,
          }).then(() => router.push("/login"));
        }
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Terjadi Kesalahan",
          text: "Silakan coba lagi nanti.",
        });
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");

    const updatedData = { ...formData };
    if (!updatedData.password) {
      delete updatedData.password;
    }

    try {
      const res = await fetch("http://localhost:3000/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      const data = await res.json();
      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Profil berhasil diperbarui!",
        }).then(() => router.push("/profile"));
      } else {
        Swal.fire({
          icon: "error",
          title: "Gagal memperbarui profil!",
          text: data.message,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Terjadi Kesalahan",
        text: "Silakan coba lagi nanti.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Update Profil</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <input type="password" name="password" placeholder="Password (opsional)" onChange={handleChange} className="w-full p-3 border rounded-lg" />
          <button type="submit" disabled={loading} className={`w-full py-2 rounded-md ${loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"} text-white`}>
            {loading ? "Updating..." : "Update Profil"}
          </button>
        </form>
      </div>
    </div>
  );
}
