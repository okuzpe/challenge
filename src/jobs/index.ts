import { CronJob } from 'cron';
import EmailService from '../services/email';

/* Register cron-jobs */

//Send Reports to user every day at 01:00.
export const cronPareto = new CronJob('0 1 * * *', async () => EmailService.sendUsersReports());
