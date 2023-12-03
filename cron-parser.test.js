const { cronParser } = require("./cron-parser");

describe("cronParser", () => {
  it("parses a cron string", () => {
    const cronString = "*/15 0 1,15 * 1-5 /usr/bin/find";
    const expected = {
      minute: "*/15",
      hour: "0",
      dayOfMonth: "1,15",
      month: "*",
      dayOfWeek: "1-5",
      command: "/usr/bin/find",
    };
    const actual = cronParser(cronString);
    expect(actual).toEqual(expected);
  });
});
