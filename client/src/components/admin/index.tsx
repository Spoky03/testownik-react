import { useEffect, useState } from "react";
import adminService from "@/services/adminService";
import { Button } from "../ui/button";
export const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  useEffect(() => {
    const token = window.localStorage.getItem("loggedUserToken");
    token && adminService.setToken(token);
  }, []);
  useEffect(() => {
    async function fetchData() {
      const users = await adminService.fetchAllUsers();
      setUsers(users);
    }
    fetchData();
  }, []);

  return (
    <div className="flex flex-col place-items-center px-5 sm:p-8 mt-4">
      <div
        className={`flex flex-col p-1 sm:p-5 rounded-xl shadow-2xl w-full h-full bg-primary max-w-6xl gap-2 `}
      >
        <h1 className="text-3xl">Admin Panel</h1>
        <Button
          className="text-lg"
          onClick={() => setShowUsers((prev) => !prev)}
        >
            {showUsers ? "Hide" : "Show"} Users
        </Button>
        {showUsers && (
          <code className="text-sm">
            <pre>{JSON.stringify(users, null, 2)}</pre>
          </code>
        )}
      </div>
    </div>
  );
};
