import Client from "./api";

export const Register = async (full_name, email, password) => {
  try {
    const res = await Client.post("/auth/register", {
      full_name,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const RegisterAdmin = async (full_name, email, password) => {
  try {
    const res = await Client.post("/auth/admin/signup", {
      email,
      password,
      full_name,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const Login = async (data) => {
  try {
    const res = await Client.post("/auth/login", data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const AdminLogin = async (data) => {
  try {
    const res = await Client.post("/auth/admin/login", data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  } catch (error) {
    throw error;
  }
};
export const CheckSession = async () => {
  try {
    const res = await Client.get("/auth/session");
    return res.data;
  } catch (error) {
    throw error;
  }
};
