import { XMLParser } from 'fast-xml-parser';
import type { EntryDto, SenseDto } from '../../types/EntryDto.js';
import type { Subentry } from '../../types/Subentry.js';
import type { Entry } from '../../types/Entry.js';

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

const getSubentriesFromSense = (sense: SenseDto | SenseDto[]) => {
  let defs: string[];

  if (Array.isArray(sense)) {
    defs = sense.map(({ def }) => def);
  } else {
    defs = [sense.def];
  }

  return defs.flatMap((def) => getSubentriesFromDef(def));
};

const getEntry = (entryDto: EntryDto): Entry => {
  const { form, sense } = entryDto.entry;

  const canonicalForm = form.orth;

  return { canonicalForm, senses: getSubentriesFromSense(sense) };
};

const searchForMatches = async (searchTerm: string): Promise<Entry[]> => {
  const lowercase = searchTerm.toLowerCase();

  const results = await getExactMatchesFor(lowercase);

  const parser = new XMLParser();

  return results.flatMap((result) => {
    const parsed: EntryDto = parser.parse(result.xml);

    return getEntry(parsed);
  });
};

export default searchForMatches;
