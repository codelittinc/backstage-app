import CodeIcon from '@mui/icons-material/Code';
import SearchIcon from '@mui/icons-material/Search';
import { IconButton, InputBase, Paper } from "@mui/material";

type Props = {
  onKeyPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onSearch: () => void;
  query: string;
  setQuery: (query: string) => void;
};

const SkillsSearch = ({ onSearch, query, setQuery, onKeyPress }: Props) => {
  return (
    <Paper
        component="div"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
      >
        <IconButton sx={{ p: '10px' }} aria-label="menu">
          <CodeIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="e.g. React, Node, Python"
          inputProps={{ 'aria-label': 'search skills' }}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={onKeyPress}
          autoFocus
        />
        <IconButton 
          type="button" 
          sx={{ p: '10px' }} 
          aria-label="search"
          onClick={onSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
  );
};

export default SkillsSearch;
