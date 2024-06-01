import dayjs from "dayjs";

// Returns first day of the week
export const startOfWeek = (date) => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Ajusta cuando el día es domingo
  return new Date(date.setDate(diff));
};

export const formatDate = (date) => {
  const day = date.getDate();
  return `${day}`;
};

export const formatMonthYear = (date) => {
  const month = date.getMonth() + 1; // Los meses están basados en cero
  const year = date.getFullYear();
  return `${month}-${year}`;
};

// Returns a list of times
export const getUniqueStartTimes = (events, currentDay) => {

  const startTimesSet = new Set();

  events.forEach((event) => {
    const eventStartTime = new Date(event.since_day);
    const eventEndTime = new Date(event.until_day);
    const currentTime = currentDay;

    if (
      currentTime >= eventStartTime &&
      currentTime <= eventEndTime
    ) {
      const startTime = dayjs(event.start).format('HH:mm');
      startTimesSet.add(startTime);
    }
  });

  // Convertimos el Set a un Array y lo ordenamos
  return Array.from(startTimesSet).sort((a, b) => {
    const aTime = dayjs(a, 'HH:mm');
    const bTime = dayjs(b, 'HH:mm');
    return aTime.isBefore(bTime) ? -1 : 1;
  });

};


export const getTotalBookings = (bookingsList, event, currentDay) => {
  let bookedPersons = 0;
  bookingsList.forEach((bookingEvent) => {
    const eventStart = dayjs(event.start).format("HH:mm");
    const bookingHour = dayjs(bookingEvent.hour).format("HH:mm");
    const bookingDate = dayjs(bookingEvent.date).format("YYYY-MM-DD")
    const current = dayjs(currentDay).format("YYYY-MM-DD")

    if (
      event.event_id === bookingEvent.schedule_id &&
      dayjs(bookingEvent.date) > dayjs(event.since_day) &&
      dayjs(bookingEvent.date) < dayjs(event.until_day) &&
      eventStart === bookingHour &&
      bookingDate === current
    ) {
      bookedPersons += 1;
    }
  });
  return bookedPersons;
};