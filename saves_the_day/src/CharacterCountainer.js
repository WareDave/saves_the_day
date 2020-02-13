import React, { Component } from 'react'
import CreateCharacter from './CreateCharacterForm'
import CharacterList from './CharacterList'
import EditCharacterModal from './EditCharacterModal'
import { Grid, Button } from 'semantic-ui-react'


class CharacterContainer extends Component {

    state = {
        character: [],
        createModalOpen: false,
        editModalOpen: false,
        CharacterToEdit: {
            loggedUser: '',
            id: '',
            realm: '',
            name: '',
            classLevel: '',
            background: '',
            race: '',
            alighment: '',
            exp: '',
            strength: '',
            dex: '',
            const: '',
            intelligence: '',
            wisdom: '',
            charisma: '',
            inspiration: '',
            saving: '',
            skills: '',
            passive: '',
            armorclass: '',
            init: '',
            speed: '',
            currenthp: '',
            temphp: '',
            hdice: '',
            dsaves: '',
            atks_spells: '',
            equipment: '',
            fandt: ''   
        }
    }

    createCharacter = () => {
        this.setState({
            createModalOpen: true
        })
    }

    addCharacter = async (e, CharacterFromTheForm) => {
        e.preventDefault();

        try {
            console.log(CharacterFromTheForm)
            const createdCharacterResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/character/`, {
                method: 'POST',
                body: JSON.stringify(CharacterFromTheForm),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const parsedResponse = await createdCharacterResponse.json()

            this.setState({
                character: [...this.state.character, parsedResponse.data]
            })

            this.closeCreateModal()
        } catch (err) {
            console.log('error: ', err)
        }
    }

    closeCreateModal = () => {
        this.setState({
            createModalOpen: false
        }, 
    )}

    componentDidMount() {
        this.getcharacter()
    }

    getcharacter = async () => {
        try {
            const character = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/character/`, { credentials: 'include' })
            const parsedcharacter = await character.json()

            this.setState({
                character: parsedcharacter.data
            })
        } catch (err) {
            console.log(err);
        }
    } 
    
    editcharacter = (idOfcharacterEdit) => {
        const CharacterToEdit = this.state.character.find(character => character.id === idOfcharacterEdit)

        this.setState({
            editModalOpen: true,
            CharacterToEdit: {
                ...CharacterToEdit
            }
        })
    }

    handleEditChange = (e) => {
        this.setState({
            CharacterToEdit: {
                ...this.state.CharacterToEdit,
                [e.target.name]: e.target.value
            }
        })
    }

    updateCharacter = async (e) => {
        e.preventDefault()

        try {
            const updateResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/character/${this.state.CharacterToEdit.id}`, {
                method: 'PUT',
                body: JSON.stringify(this.state.CharacterToEdit),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })

            const updateResponseParsed = await updateResponse.json()

            const newCharacterArrayWithUpdate = this.state.character.map((character) => {
                if (character.id === updateResponseParsed.data.id) {
                    character = updateResponseParsed.data
                }
                return character 
            })

            this.setState({
                character: newCharacterArrayWithUpdate
            })

            this.closeEditModal()

        } catch (err) {
            console.error(err)
        }
    } 

    closeEditModal = () => {
        this.setState({
            editModalOpen: false
        })
    }

    deleteCharacter = async (id) => {
        const deleteCharacterResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/character/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        const deleteCharacterParsed = await deleteCharacterResponse.json()

        this.setState({
            character: this.state.character.filter((character) => character.id !== id)
        })
    }

    render() {
        const { loggedIn } = this.props

        return (
            <div>
                { loggedIn ?
                    <Grid 
                        textAlign='center'
                        style={{ marginTop: '7em', height: '100%' }}
                    >
                        <Grid.Row>
                            <Button onClick={this.createcharacter}>Create New character</Button>
                        </Grid.Row>
                            
                            <Grid.Row>
                                <CharacterList
                                    character={this.state.character}
                                    deleteCharacter={this.deleteCharacter}
                                    editcharacter={this.editcharacter}
                                />
                            </Grid.Row>
                            <CreateCharacter 
                                open={this.state.createModalOpen}
                                closeModal={this.closeCreateModal}
                                addCharacter={this.addCharacter}
                            />
                            <EditCharacterModal 
                                open={this.state.editModalOpen}
                                updateCharacter={this.updateCharacter}
                                CharacterToEdit={this.state.CharacterToEdit}
                                closeModal={this.closeEditModal}
                                handleEditChange={this.handleEditChange}
                            />
                    </Grid>
                :
                <Grid 
                    textAlign='center'
                    style={{ marginTop: '7em', height: '100%' }}
                    verticalAlign='top'
                    
                >
                    Did I Do That. Go Reg you Ass Hat
                </Grid>
                }
            </div>
        )
    }
}

export default CharacterContainer;