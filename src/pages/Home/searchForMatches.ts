import { XMLParser } from 'fast-xml-parser';
import type { EntryDto } from '../../types/EntryDto.js';
import type { Subentry } from '../../types/Subentry.js';

const getExactMatchesFor = async (searchTerm: string) => {
  const response = await fetch(
    `https://api.dicionario-aberto.net/word/${searchTerm}`,
  );

  const resultJson: { xml: string }[] = await response.json();

  return resultJson;
};

const getSubentriesFromDef = (def: string) => {
  return def.split('\n').map((subentry) => {
    const [definition, example] = subentry.split('_');

    return { definition, example };
  });
};

const searchForMatches = async (searchTerm: string): Promise<Subentry[]> => {
  const lowercase = searchTerm.toLowerCase();

  const results = await getExactMatchesFor(lowercase);

  const parser = new XMLParser();

  return results
    .flatMap((result) => {
      const parsed: EntryDto = parser.parse(result.xml);

      const { sense } = parsed.entry;

      if (Array.isArray(sense)) {
        return sense.map(({ def }) => def);
      }

      return sense.def;
    })
    .flatMap((def) => getSubentriesFromDef(def));
};

export default searchForMatches;
