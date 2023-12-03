/* Write a command line script that:
  - parses a cron string
  - expands each field to the times at which it will run
*/

// 1. Parse the cron string
const cronParser = (cronString) => {
  const [minute, hour, dayOfMonth, month, dayOfWeek, command] =
    cronString.split(/\s+/);
  return {
    minute,
    hour,
    dayOfMonth,
    month,
    dayOfWeek,
    command,
  };
};

module.exports = { cronParser };
