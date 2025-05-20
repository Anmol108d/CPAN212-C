// Import lodash and dayjs using ES module syntax
import _ from 'lodash';
import dayjs from 'dayjs';

// Get today's date
const today = dayjs();

// Define list of holidays
const holidays = [
  { name: "Christmas", date: "2025-12-25" },
  { name: "Canada Day", date: "2025-07-01" },
  { name: "New Year's Day", date: "2026-01-01" },
  { name: "Labour Day", date: "2025-09-01" }
];

// Calculate and print days until each holiday
holidays.forEach(holiday => {
  const holidayDate = dayjs(holiday.date);
  const daysUntil = holidayDate.diff(today, 'day');
  console.log(`${holiday.name} is in ${daysUntil} days`);
});

// Pick a random holiday
const randomHoliday = _.sample(holidays);
console.log(`🎉 0 Random Holiday: ${randomHoliday.name} on ${randomHoliday.date}`);

// Find and print the index of specific holidays
const holidayNames = holidays.map(h => h.name);
console.log(`Index of Christmas: ${holidayNames.indexOf("Christmas")}`);
console.log(`Index of Canada Day: ${holidayNames.indexOf("Canada Day")}`);
