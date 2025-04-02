export type SenseDto = {
  gramGrp: string;
  def: string;
  usg?: string;
};

export type EntryDto = {
  entry: {
    form: {
      orth: string;
    };
    sense: SenseDto | SenseDto[];
    etym: string;
  };
};
