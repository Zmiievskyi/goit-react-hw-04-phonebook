import {Filter} from '../Filter/Filter';
import { Box } from '../Common/Common.styled';

export const Contacts =({list, onFiltred, onRemove})=> {

    return (
      <Box border="1px solid">
        <Filter onFiltred={onFiltred} />
        <ul>
          {list.map(({id,name,number}) => {
            return (
              <li key={id}>
                <Box display="flex" justifyContent="space-between">
                  {name}:<span>{number}</span>
                  <button onClick={() => onRemove(id)}>Delete</button>
                </Box>
              </li>
            );
          })}
        </ul>
      </Box>
    );
  }

