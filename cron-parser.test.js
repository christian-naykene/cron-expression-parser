const { cronParser } = require("./cron-parser");

describe("cronParser", () => {
  let consoleLogSpy;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
  });

  it("parses a cron string", () => {
    const cronString = "*/15 0 1,15 * 1-5 /usr/bin/find";
    const expected = [
      "minute        0 15 30 45",
      "hour          0",
      "day of month  1 15",
      "month         1 2 3 4 5 6 7 8 9 10 11 12",
      "day of week   1 2 3 4 5",
      "command       /usr/bin/find",
    ];
    cronParser(cronString);
    expect(consoleLogSpy).toHaveBeenCalledWith(expected[0]);
    expect(consoleLogSpy).toHaveBeenCalledWith(expected[1]);
    expect(consoleLogSpy).toHaveBeenCalledWith(expected[2]);
    expect(consoleLogSpy).toHaveBeenCalledWith(expected[3]);
    expect(consoleLogSpy).toHaveBeenCalledWith(expected[4]);
    expect(consoleLogSpy).toHaveBeenCalledWith(expected[5]);
  });
});
