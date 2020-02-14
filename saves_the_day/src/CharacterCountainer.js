import React, { Component } from 'react'
import CreateCharacter from './CreateCharacterForm'
import CharacterList from './CharacterList'
import EditCharacterModal from './EditCharacterModal'
import { Grid, Button } from 'semantic-ui-react'


class CharacterContainer extends Component {

    state = {
        characters: [],
        createModalOpen: false,
        editModalOpen: false,
        CharacterToEdit: {
            name: '',
            loggedUser: '',
            body: '',
            id: '',
        }
    }

    createCharacter = () => {
        this.setState({
            createModalOpen: true
        })
    }

    addCharacter = async (e, characterFromTheForm) => {
        e.preventDefault();

        try {
            console.log(characterFromTheForm)
            const createdhaeacterResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/characters/`, {
                method: 'POST',
                body: JSON.stringify(characterFromTheForm),
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            const parsedResponse = await createdhaeacterResponse.json()

            this.setState({
                characters: [...this.state.characters, parsedResponse.data]
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
        this.getCharacters()
    }

    getCharacters = async () => {
        try {
            const characters = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/characters/`, { credentials: 'include' })
            const parsedCharacters = await characters.json()

            this.setState({
                characters: parsedCharacters.data
            })
        } catch (err) {
            console.log(err);
        }
    } 
    
    editCharacter = (idOfCharactersEdit) => {
        const CharacterToEdit = this.state.characters.find(character => character.id === idOfCharactersEdit)

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
            const updateResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/characters/${this.state.CharacterToEdit.id}`, 
            {
                method: 'PUT',
                
                body: JSON.stringify(this.state.CharacterToEdit),
                headers: {
                    'Content-Type': 'application/json'
                },
                
                credentials: 'include'
            })

            const updateResponseParsed = await updateResponse.json()

            const newCharacterArrayWithUpdate = this.state.characters.map((character) => {
                if (character.id === updateResponseParsed.data.id) {
                    character = updateResponseParsed.data
                }
                return character 
            })

            this.setState({
                characters: newCharacterArrayWithUpdate
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
        const deleteCharacterResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/characters/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })

        const deleteCharacterParsed = await deleteCharacterResponse.json()

        this.setState({
            characters: this.state.characters.filter((character) => character.id !== id)
        })
    }

    render() {
        

        return (
            <div>
                
                    <Grid 
                        textAlign='center'
                        style={{ marginTop: '7em', height: '100%' }}
                    >
                        <Grid.Row>
                            <Button negative onClick={this.createCharacter}>Wanna Get Down</Button>
                        </Grid.Row>
                           
                            <Grid.Row>
                                <CharacterList
                                    characters={this.state.characters}
                                    deleteCharacter={this.deleteCharacter}
                                    editCharacter={this.editCharacter}
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
                
                <Grid 
                    textAlign='center'
                    style={{ marginTop: '7em', height: '100%' }}
                    verticalAlign='top'
                    
                >
                    Go Fucking Reg.
                </Grid>
                
            </div>
        )
    }
}

export default CharacterContainer;