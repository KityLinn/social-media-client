import { login } from "./login.js";

const mockFetchSuccess = jest.fn().mockResolvedValue({
  ok: true,
  json: jest.fn().mockResolvedValue({ accessToken: "test", user: "me" }),
});

describe("Login function", () => {
  global.fetch = mockFetchSuccess;
  global.localStorage = {
    setItem: jest.fn(),
    getItem: jest.fn(),
  };

  it("calls fetch when logging in", async () => {
    await login("", "");

    expect(global.fetch).toHaveBeenCalled();
  });

  it("saves data in localstorage when success", async () => {
    await login("", "");

    //when getting headers
    expect(global.localStorage.getItem).toHaveBeenCalledWith("token");
    //when saving token
    expect(global.localStorage.setItem).toHaveBeenCalledWith("token", '"test"');
    expect(global.localStorage.setItem).toHaveBeenCalledWith(
      "profile",
      '{"user":"me"}',
    );
  });
});
