"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminUsersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<any[]>([]);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "USER" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (status === "loading") return;
    if (!session || !session.user || (session.user as any).role !== "ADMIN") {
      router.replace("/dashboard");
    } else {
      fetchUsers();
    }
  }, [session, status]);

  async function fetchUsers() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      setUsers(data.users || []);
    } catch (e) {
      setError("Failed to fetch users");
    }
    setLoading(false);
  }

  async function handleAddUser(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Failed to add user");
      setForm({ name: "", email: "", password: "", role: "USER" });
      fetchUsers();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to add user');
    }
    setLoading(false);
  }

  async function handleRemoveUser(id: string) {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/users?id=${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to remove user");
      fetchUsers();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to remove user');
    }
    setLoading(false);
  }

  return (
    <div>
      <h1>Admin: Manage Users</h1>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleAddUser} style={{ marginBottom: 24 }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
        />
        <input
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          required
        />
        <select value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
        </select>
        <button type="submit" disabled={loading}>Add User</button>
      </form>
      <h2>All Users</h2>
      {loading ? <div>Loading...</div> : (
        <ul>
          {users.map(u => (
            <li key={u.id}>
              {u.name} ({u.email}) - {u.role}
              <button onClick={() => handleRemoveUser(u.id)} disabled={loading}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
