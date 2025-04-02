import { useState } from '@lynx-js/react';

import searchForMatches from './searchForMatches.js';
import SearchBar from './SearchBar.jsx';
import CopyrightInfo from './CopyrightInfo.jsx';
import SkeletonLoaderParagraph from './SkeletonLoaderParagraph/index.jsx';
import type { Subentry } from '../../types/Subentry.js';

export function Home() {
  const [results, setResults] = useState<Subentry[]>([]);

  // TODO: create useAsyncState hook
  const [loading, setLoading] = useState(false);

  const onSearch = async (searchTerm: string) => {
    setLoading(true);

    try {
      const response = await searchForMatches(searchTerm);

      setResults(response);
    } catch {
      // TODO: error handling
    } finally {
      setLoading(false);
    }
  };

  return (
    <view className="relative flex flex-col items-center h-screen p-2 pt-8 gap-4">
      <SearchBar onSearch={onSearch} />

      <scroll-view
        className="w-full p-2 flex-grow"
        scroll-orientation="vertical"
      >
        {loading ? (
          <SkeletonLoaderParagraph />
        ) : (
          <view className="flex flex-col gap-2">
            {results.map(({ definition, example }, index) => (
              <view item-key={`result-${index}`} key={`result-${index}`}>
                {definition && <text>{definition}</text>}
                {example && <text className="px-2 italic">{example}</text>}
              </view>
            ))}
          </view>
        )}
      </scroll-view>
      <view className="flex flex-col w-full gap-2 flex-grow-0">
        <CopyrightInfo
          description="Results supplied by Dicionário Aberto"
          link="https://dicionario-aberto.net"
        />
        <CopyrightInfo
          description="This work is licensed under a Creative Commons Attribution-Share
            Alike 2.5 Portugal License"
          link="https://creativecommons.org/licenses/by-sa/2.5/pt/"
        />
      </view>
    </view>
  );
}
