export const getCorrectDateFromDB = (date, hour) => {
  const sinceDateObj = new Date(date);
  const startDateObj = new Date(hour);
  
  // Extraer la fecha de sinceDateObj
  const year = sinceDateObj.getFullYear();
  const month = sinceDateObj.getMonth();
  const day = sinceDateObj.getDate();

  // Extraer la hora de startDateObj
  const hours = startDateObj.getUTCHours();
  const minutes = startDateObj.getUTCMinutes();
  const seconds = startDateObj.getUTCSeconds();

  // Crear un nuevo objeto de fecha combinando fecha y hora
  const combinedDate = new Date(
    Date.UTC(year, month, day, hours, minutes, seconds)
  );

  // Convertir a cadena en formato ISO (opcional)
  return combinedDate.toISOString();

}

export function getDayIndex(dayName: string) {
  const daysOfWeek = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  return daysOfWeek.indexOf(dayName)+1;
}