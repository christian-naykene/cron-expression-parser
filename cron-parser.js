/* Write a command line script that:
  - parses a cron string
  - expands each field to the times at which it will run
*/

// 1. Parse the cron string
const cronParser = (cronString) => {
  if (!cronString) {
    console.log("No cron string found");
    process.exit(1);
  }

  const [minute, hour, dayOfMonth, month, dayOfWeek, ...command] =
    cronString.split(/\s+/);

  //2. Expand each field
  const expandField = (field, max) => {
    if (!field) {
      return [];
    }

    if (field === "*") {
      const result = [];
      for (let i = 1; i <= max; i++) {
        result.push(i);
      }
      return result;
    }

    if (field.includes(",")) {
      return field.split(",").map((value) => parseInt(value));
    }

    if (field.includes("-")) {
      const [start, end] = field.split("-").map((value) => parseInt(value));
      const result = [];
      for (let i = start; i <= end; i++) {
        result.push(i);
      }
      return result;
    }

    if (field.includes("/")) {
      const [start, addAmount] = field
        .split("/")
        .map((value) => parseInt(value));
      const result = [];
      for (let i = 0; i < max; i += addAmount) {
        result.push(i);
      }
      return result;
    }

    return [field];
  };

  const scheduledMinutes = expandField(minute, 60);
  const scheduledHours = expandField(hour, 24);
  const scheduledDayOfMonths = expandField(dayOfMonth, 31);
  const scheduledMonths = expandField(month, 12);
  const scheduledDayOfWeeks = expandField(dayOfWeek, 7);

  // 3. Print expanded fields
  console.log(`minute        ${scheduledMinutes.join(" ")}`);
  console.log(`hour          ${scheduledHours.join(" ")}`);
  console.log(`day of month  ${scheduledDayOfMonths.join(" ")}`);
  console.log(`month         ${scheduledMonths.join(" ")}`);
  console.log(`day of week   ${scheduledDayOfWeeks.join(" ")}`);
  console.log(`command       ${command.join(" ")}`);
};

const cronString = process.argv[2];

cronParser(cronString);

module.exports = { cronParser };
