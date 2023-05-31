import { classNames } from "../../shared/Utils";

describe("classNames", () => {
  test("returns a string of concatenated class names", () => {
    const result = classNames("foo", "bar", "baz");

    expect(result).toBe("foo bar baz");
  });

  test("ignores falsy values in class names", () => {
    const result = classNames("foo", null, undefined, "bar", 0, "baz");

    expect(result).toBe("foo bar baz");
  });

  test("returns an empty string if no class names are provided", () => {
    const result = classNames();

    expect(result).toBe("");
  });
});
