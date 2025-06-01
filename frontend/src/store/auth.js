import { create } from "zustand";

export const userStore = create((set) => ({
    users: [],
    setUser: (users) => set({ users }),
    createUser: async (newUser) => {
        if (!newUser.username || !newUser.pwd) {
            return { success: false, message: "Please fill in all fields." };
        }

        const res = await fetch("http://localhost:5002/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
        });

        const data = await res.json();

        if (data.success) {
            localStorage.setItem("userId", data.data._id);
            set((state) => ({ users: [...state.users, data.data] }));

            return { success: true, message: "User created successfully" };
        } else {
            return { success: false, message: data.message };
        }
    },
    fetchUsers: async (username) => {
        const res = await fetch(`http://localhost:5002/api/users/${username}`);
        const data = await res.json();

        if (data.success && data.data.length > 0) {
            const user = data.data[0];
            set({ users: [user] });

            return user;
        }

        return null;
    },

}));