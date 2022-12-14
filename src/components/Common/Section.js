import PropTypes from 'prop-types';
import { SectionBox } from './Common.styled';

export default function Section({ title, children}) {
  return (
    <SectionBox
      pt={4}
      width={350}
      pl ={20}
    >
      {title && <h2>{title}</h2>}
      {children}
    </SectionBox>
  );
}

Section.propTypes = {
  title: PropTypes.string,
};
