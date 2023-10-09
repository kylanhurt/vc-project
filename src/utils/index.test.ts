import { truncateString, getPagination } from "./index";

describe("truncateString", () => {
  it("should return the original string if it is shorter than the maximum length", () => {
    const input = "Hello, world!";
    const maxLength = 20;
    const output = truncateString(input, maxLength);
    expect(output).toEqual(input);
  });

  it("should return the original string truncated with an ellipsis if it is longer than the maximum length", () => {
    const input =
      "This is a very long string that needs to be truncated with an ellipsis";
    const maxLength = 20;
    const output = truncateString(input, maxLength);
    expect(output).toEqual("This is a...ellipsis");
  });

  it("should return an empty string if the input is an empty string", () => {
    const input = "";
    const maxLength = 20;
    const output = truncateString(input, maxLength);
    expect(output).toEqual("");
  });
});
