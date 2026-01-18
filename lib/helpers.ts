export type MovieCredit = {
  category: string;
  personId: number;
  name: string;
  pictureUrl: string | null;
  characterName: string | null;
};

export type CreditWithPerson = {
  category: string;
  characterName?: string | null;
  person: {
    primary_name: string;
    picture_url: string | null;
  }[];
};

export const formatCredits = (credits: CreditWithPerson[]) => {
  return (
    credits
      ?.map(row => {
        const person = row.person as unknown as
          | {
              id: number;
              primary_name: string;
              picture_url: string | null;
            }
          | null
          | undefined;

        if (!person) return undefined;

        return {
          category: row.category as string,
          personId: person.id,
          name: person.primary_name,
          pictureUrl: person.picture_url,
          characterName: (row as any).character_name ?? null,
        } satisfies MovieCredit;
      })
      .filter((credit): credit is MovieCredit => Boolean(credit)) ?? []
  );
};
