import userReducer, { login, logout, selectUser } from "../../features/userSlice";

describe("userSlice", () => {
  it("should handle login", () => {
    const initialState = {
      user: null,
    };
    const user = { id: 1, name: "John Doe" };
    const nextState = userReducer(initialState, login(user));

    expect(nextState.user).toEqual(user);
  });

  it("should handle logout", () => {
    const initialState = {
      user: { id: 1, name: "John Doe" },
    };
    const nextState = userReducer(initialState, logout());

    expect(nextState.user).toBeNull();
  });

  it("should select user", () => {
    const initialState = {
      user: {
        user: { id: 1, name: "John Doe" },
      },
    };
    const selectedUser = selectUser(initialState);

    expect(selectedUser).toEqual(initialState.user.user);
  });
});
