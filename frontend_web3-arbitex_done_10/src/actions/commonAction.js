import apiServer from '../api'
import { 
  displayMsg,
} from '../utils/toast'

// Get date & time.
export const getWeekDay = async () => {
  let today;
  const tz = 'America/Los_Angeles';
  today =  await fetch("https://worldtimeapi.org/api/timezone/"+tz)
    .then(response => response.json())
    .then(data => data.day_of_week);
  return today;
};
