import { IKeyAndTimestamp } from '../generic';

export interface IUser extends IKeyAndTimestamp {
  name: string;
  email: string;
  country: string;
  notify: boolean;
  lang: string;
}

export interface IFilterUser {
  name?: string;
  email?: string;
  country?: string;
  notify?: boolean;
  lang?: string;
}

export interface IUserDoc extends IUser, Document {}
