import UserService from '../user';
import ChargerService from '../charger';
import SessionService from '../session';
import moment from 'moment';
import { IEmailInfo } from '../../utils/interfaces/email';
import { ISession } from '../../utils/interfaces/session';

const sendUsersReports = async () => {
  //Users to notify
  const users = await UserService.getAllFiltered({ notify: true });
  const data: IEmailInfo[] = [];
  await Promise.all(
    users.map(async (user) => {
      //Chargers report turned ON
      const chargersUser = await ChargerService.getAllFiltered({ enableReport: true, user: user._id });
      const chargersIds = chargersUser.map((charger) => charger._id);
      //Charger sessions
      const sessionsCharger = await SessionService.getByChargerIds(chargersIds);
      const totalHours = await totalChargeAtDay(sessionsCharger);

      const mailInfo: IEmailInfo = {
        email: user.email,
        curentDate: moment().toDate(),
        totalSessions: sessionsCharger.length,
        totalHours: totalHours,
      };

      const info = await sendEmail(mailInfo);
      data.push(info);
    }),
  );
  return data;
};

const sendEmail = async (info: IEmailInfo) => {
  // here should be the email adapter method for send emails
  return info;
};

const totalChargeAtDay = async (sessionsCharger: Array<ISession>) => {
  let totalTime = 0;
  sessionsCharger.map((e) => {
    const duration = moment.duration(moment(e.endDate).diff(e.startDate));
    totalTime = totalTime + duration.asHours();
  });

  return totalTime;
};

export default { sendUsersReports };
