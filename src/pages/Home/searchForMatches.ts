import { XMLParser } from 'fast-xml-parser';
import type { EntryDto, SenseDto } from '../../types/EntryDto.js';
import type { Entry } from '../../types/Entry.js';

const getPossibleForms = (searchTerm: string) => {
  const lowercase = searchTerm.toLowerCase();

  const possibleForms = [lowercase];

  if (lowercase[lowercase.length - 1] === 'a') {
    possibleForms.push(lowercase.substring(0, lowercase.length - 1) + 'o');
  }

  return possibleForms;
};

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

const getParsedResults = async (form: string) => {
  const parser = new XMLParser();

  const results = await getExactMatchesFor(form);

  return results.map(({ xml }) => {
    const parsed: EntryDto = parser.parse(xml);

    return getEntry(parsed);
  });
};

const searchForMatches = async (searchTerm: string): Promise<Entry[]> => {
  const possibleForms = getPossibleForms(searchTerm);

  const promises = await Promise.all(
    possibleForms.map((form) => getParsedResults(form)),
  );

  return promises.flatMap((o) => o);
};

export default searchForMatches;
