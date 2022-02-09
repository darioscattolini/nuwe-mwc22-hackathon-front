type PersonalData = {
  fullName: string;
  email: string;
  description: string;
  country: string;
  city: string;
};

export class User {
  constructor(public personalData: PersonalData) { }
}
