import React, { Component } from 'react';
import { GlobalStyle, Section } from 'components/Common';
import { nanoid } from 'nanoid';
import Phonebook from 'components/Phonebook/Phonebook';
import { Contacts } from 'components/Contacts/Contacts';

export default class App extends Component {
  state = {
    contacts: [],
    Filter: '',
  };

  componentDidMount() {
    // this.handleLocalStorage();
    const dataFromStorage = localStorage.getItem('contacts');
    if (dataFromStorage !== null) {
      const contacts = JSON.parse(dataFromStorage);
      this.setState({ contacts: contacts });
    } else {
      this.setState({ contacts: [] });
    }
  }

  componentDidUpdate(_, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleLocalStorage = () => {
    try {
      const dataFromStorage = localStorage.getItem('contacts');
      if (dataFromStorage !== null) {
        const contacts = JSON.parse(dataFromStorage);
        this.setState({ contacts: contacts });
      } else {
        this.setState({ contacts: [] });
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleAddContact = contact => {
    const checkSimilar = this.state.contacts.some(
      item => item.name.toLowerCase() === contact.name.toLowerCase()
    );
    if (!checkSimilar) {
      const newContact = {
        id: nanoid(),
        name: contact.name,
        number: contact.number,
      };
      this.setState(prevState => {
        return {
          contacts: [newContact, ...prevState.contacts],
          filter: [newContact, ...prevState.contacts],
        };
      });
    } else {
      return alert(`${contact.name} is already in contacts`);
    }
  };

  handleDeleteContact = id => {
    const newContactsList = this.state.contacts.filter(item => item.id !== id);
    this.setState({
      contacts: [...newContactsList],
    });
  };

  handleFilter = name => {
    this.setState({ Filter: name });
  };

  handleFiltredList = () => {
    let filtredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.Filter)
    );
    return filtredContacts;
  };

  render() {
    return (
      <>
        <Section title="Phonebook">
          <Phonebook onSubmit={this.handleAddContact} />
        </Section>
        <Section title="Contacts">
          <Contacts
            list={this.handleFiltredList()}
            onFiltred={this.handleFilter}
            onRemove={this.handleDeleteContact}
          />
        </Section>
        <GlobalStyle />
      </>
    );
  }
}
