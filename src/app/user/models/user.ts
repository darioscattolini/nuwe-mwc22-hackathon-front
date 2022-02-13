type PersonalData = {
  fullName: string;
  email: string;
  description: string;
  country: string;
  city: string;
};

type ProfessionalData = {
  yearsOfExperience: number;
  sector: 'front-end' | 'back-end' | 'data-science';
  skills: string[];
}

export class User {
  constructor(
    public personalData: PersonalData,
    public avatarSeed: string,
    public professionalData: ProfessionalData
  ) { }

  public getAvatarSrc() {
    return `https://avatars.dicebear.com/api/human/${this.avatarSeed}.svg`;
  }
}
