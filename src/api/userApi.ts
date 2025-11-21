import client from "./client";
export const loginApi = async (email: string, password: string) => {
  if (email === "test@test.com" && password === "123456")
    return { token: "mock-token-123", user: { email } };
  throw new Error("Invalid credentials");
};
export const fetchItems = async ({
  page = 1,
  limit = 20,
}: {
  page?: number;
  limit?: number;
}) => {
  const start = (page - 1) * limit;
  const data = Array.from({ length: 200 })
    .map((_, i) => ({ id: i + 1, title: `Item ${i + 1}` }))
    .slice(start, start + limit);
  await new Promise((r) => setTimeout(r, 200));
  return { data, nextPage: start + limit < 200 ? page + 1 : null };
};
export const addItem = async (title: string) => {
  const id = Date.now();
  await new Promise((r) => setTimeout(r, 200));
  return { id, title };
};
