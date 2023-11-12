import { logout } from "./logout.js";
describe("Logout function", () => {
  global.localStorage = {
    removeItem: jest.fn(),
  };
  it("removes values from localstorage", async () => {
    logout();

    expect(global.localStorage.removeItem).toHaveBeenCalledWith("token");
    expect(global.localStorage.removeItem).toHaveBeenCalledWith("profile");
  });
});
