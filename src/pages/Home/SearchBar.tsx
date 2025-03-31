import { useState } from 'react';
import Input from '../../components/Input.jsx';
import Button from '../../components/Button.jsx';

type SearchBarProps = {
  onSearch: (value: string) => void;
};

function SearchBar({ onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const onChangeInput = (value: string) => setSearchTerm(value);

  const onTapSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <view className="w-full flex">
      <Input
        value={searchTerm}
        placeholder="Type here"
        onChange={onChangeInput}
        suffix={
          <view className="bg-blue-500 rounded-r-full">
            <Button onTap={onTapSearch}>
              <text accessibility-label="Search">🔎</text>
            </Button>
          </view>
        }
      />
    </view>
  );
}

export default SearchBar;
