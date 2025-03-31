import { XMLParser } from 'fast-xml-parser';

const getExactMatchesFor = async (searchTerm: string) => {
  const response = await fetch(
    `https://api.dicionario-aberto.net/word/${searchTerm}`,
  );

  const resultJson: { xml: string }[] = await response.json();

  return resultJson;
};

const searchForMatches = async (searchTerm: string) => {
  const lowercase = searchTerm.toLowerCase();

  const results = await getExactMatchesFor(lowercase);

  const parser = new XMLParser();

  return results.map((result) => {
    const { sense } = parser.parse(result.xml).entry;

    if (Array.isArray(sense)) {
      return sense.map(({ def }) => def);
    }

    return sense.def;
  });
};

export default searchForMatches;
