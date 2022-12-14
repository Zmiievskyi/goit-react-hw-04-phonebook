import { useState, useEffect } from 'react';
import { GlobalStyle, Section } from 'components/Common';
import { nanoid } from 'nanoid';
import Phonebook from 'components/Phonebook/Phonebook';
import { Contacts } from 'components/Contacts/Contacts';

export default function App() {
  
  const [contacts, setContacts] = useState(
    () => JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  
  const handleAddContact = contact => {
    const checkSimilar = contacts.some(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (!checkSimilar) {
      const newContact = {
        id: nanoid(),
        name: contact.name,
        number: contact.number,
      };
      setContacts([...contacts, newContact]);
     
    } else {
      return alert(`${contact.name} is already in contacts`);
    }
  };

  const handleDeleteContact = id => {
    const newContactsList = contacts.filter(item => item.id !== id);
    setContacts([...newContactsList]);
  };

    const filtredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter)
    );

  return (
    <>
      <Section title="Phonebook">
        <Phonebook onSubmit={handleAddContact} />
      </Section>
      <Section title="Contacts">
        <Contacts
          list={filtredContacts}
          onFiltred={name => setFilter(name)}
          onRemove={handleDeleteContact}
        />
      </Section>
      <GlobalStyle />
    </>
  );
}
