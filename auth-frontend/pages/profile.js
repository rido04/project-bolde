import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Profile() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Anda harus login terlebih dahulu!");
        router.push("/login");
        return;
      }

      const res = await fetch("http://localhost:3000/user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setUser(data);
      } else {
        alert(data.message);
        localStorage.removeItem("token");
        router.push("/login");
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Profil User</h2>
        {user ? (
          <div>
            <p>
              <strong>Username:</strong> {user.username}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>

            <button
              onClick={() => {
                router.push("/update-profile");
              }}
              className="w-full bg-pink-500 text-white py-2 rounded-md mt-4"
            >
              Edit Profil
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                router.push("/login");
              }}
              className="w-full bg-red-500 text-white py-2 rounded-md mt-4"
            >
              Logout
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
