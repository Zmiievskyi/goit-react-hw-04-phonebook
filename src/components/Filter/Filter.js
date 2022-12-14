import { Label } from 'components/Common/Common.styled';

export const Filter = props => {
  const handleFilter = evt => {
    const searchName = evt.target.value.toLowerCase();
    props.onFiltred(searchName);
  };

  return (
    <Label>
      Find contacts by name
      <input autoComplete="off" type="text" onChange={handleFilter} />
    </Label>
  );
};
