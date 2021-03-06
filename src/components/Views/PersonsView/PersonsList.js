import React, {Component} from 'react'
import { Checkbox, Table, Button, Icon,Popup } from 'semantic-ui-react'
import { connect } from 'react-redux'
import AddPerson from '../../Views/PersonsView/AddPerson'
import {removePerson} from '../../../state/persons'
import EditPersonForm from './EditPersonForm'


class PersonsList extends Component {
    handleRemoveClick = event => {
        const personId = event.currentTarget.dataset.personId
        this.props.removePerson(personId)
    }


    render() {

        const { persons} = this.props

        return (
            <React.Fragment>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell colSpan='2'></Table.HeaderCell>

                            <Table.HeaderCell>Imię i nazwisko</Table.HeaderCell>
                            <Table.HeaderCell>Życzenia</Table.HeaderCell>
                            <Table.HeaderCell>Adres email</Table.HeaderCell>
                            <Table.HeaderCell>Data urodzin</Table.HeaderCell>
                            <Table.HeaderCell></Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {persons.map(person =>

                            <Table.Row key={person.id}>
                                <Table.Cell>
                                    <EditPersonForm
                                    name={person.name}
                                    date={person.date}
                                    email={person.email}
                                    wish={person.wish}
                                    id={person.id}
                                    />
                                </Table.Cell>
                                <Table.Cell>
                                    <Popup
                                        trigger={<Button icon data-person-id={person.id} onClick={this.handleRemoveClick}><Icon name="delete" /></Button>}
                                        content='Usuń osobę'
                                    />
                                </Table.Cell>
                                <Table.Cell>{person.name}</Table.Cell>

                                <Table.Cell>{person.wish}</Table.Cell>
                                <Table.Cell>{person.email}</Table.Cell>
                                <Table.Cell>{person.date}</Table.Cell>
                                <Table.Cell collapsing>
                                    <Checkbox label="Wyślij automatycznie"/>
                                </Table.Cell>
                            </Table.Row>

                        )}

                    </Table.Body>

                    <Table.Footer fullWidth>
                        <Table.Row>

                            <Table.HeaderCell colSpan='5'>
                                <AddPerson/>
                            </Table.HeaderCell>
                        </Table.Row>
                    </Table.Footer>
                </Table>
            </React.Fragment>

        )
    }
}

export default connect(state =>
        ({
        persons: state.persons.data

    }),
    {removePerson}
)(PersonsList)