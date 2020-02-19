import React from 'react'
import { Card, Button, Image } from 'semantic-ui-react'

function CharacterList(props) {

    const { characters } = props

    const characterList = characters.map((character) => {

        return (

            <Card key={character.id}>
                <Card.Content>
                    <Image src= 'https://i.imgur.com/jLZM0wws.jpg' wrapped ui={false} />
                    <br/>
                    <Card.Header><i className="material-icons">language</i> {character.realm}</Card.Header><br/>
                    <Card.Header><i className="material-icons">face</i> {character.name}</Card.Header><br/>
                    <Card.Description><i className="material-icons">verified_user</i>Class and Level: {character.classLevel}</Card.Description><br/>
                    <Card.Description><i className="material-icons">message</i>Background:  {character.background}</Card.Description><br/>
                    <Card.Description><i className="material-icons">info</i>Race: {character.race}</Card.Description><br/>
                    <Card.Description><i className="material-icons">flag</i>Alighment {character.alighment}</Card.Description><br/>
                    <Card.Description><i className="material-icons">exposure</i>Exp: {character.exp}</Card.Description><br/>
                    <Card.Description><i className="material-icons">fitness_center</i>Str: {character.strength}</Card.Description><br/>
                    <Card.Description><i className="material-icons">exposure</i>Dex: {character.dex}</Card.Description><br/>
                    <Card.Description><i className="material-icons">exposure</i>Const: {character.const}</Card.Description><br/>
                    <Card.Description><i className="material-icons">school</i>Intelligence: {character.intelligence}</Card.Description><br/>
                    <Card.Description><i className="material-icons">hot_tub</i>Wisdom: {character.wisdom}</Card.Description><br/>
                    <Card.Description><i className="material-icons">message</i>Charisma: {character.charisma}</Card.Description><br/>
                    <Card.Description><i className="material-icons">whatshot</i>Inspiration: {character.inspiration}</Card.Description><br/>
                    <Card.Description><i className="material-icons">casino</i>Saving: {character.saving}</Card.Description><br/>
                    <Card.Description><i className="material-icons">message</i>Skills: {character.skills}</Card.Description><br/>
                    <Card.Description><i className="material-icons">message</i>Passive: {character.passive}</Card.Description><br/>
                    <Card.Description><i className="material-icons">security</i>Armor Class {character.armorclass}</Card.Description><br/>
                    <Card.Description><i className="material-icons">remove_red_eye</i>Init: {character.init}</Card.Description><br/>
                    <Card.Description><i className="material-icons">free_breakfast</i>Speed: {character.speed}</Card.Description><br/>
                    <Card.Description><i className="material-icons">local_hospital</i>Current HP: {character.currenthp}</Card.Description><br/>
                    <Card.Description><i className="material-icons">favorite_border</i>Temp HP: {character.temphp}</Card.Description><br/>
                    <Card.Description><i className="material-icons">casino</i>Hit Dice {character.hdice}</Card.Description><br/>
                    <Card.Description><i className="material-icons">directions_run</i>Death Saves: {character.dsaves}</Card.Description><br/>
                    <Card.Description><i className="material-icons">flash_on</i>Atks and Spells: {character.atks_spells}</Card.Description><br/>
                    <Card.Description><i className="material-icons">message</i>Equipment: {character.equipment}</Card.Description><br/>
                    <Card.Description><i className="material-icons">message</i>F and T: {character.fandt}</Card.Description><br/>
                    <Card.Description><i className="material-icons">fingerprint</i> {character.loggedUser_id.username}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <Button onClick={() => props.deleteCharacter(character.id)}>Kill Character
                    </Button>
                    <Button onClick={() => props.editCharacter(character.id)}>Edit Character Sheet
                    </Button>
                </Card.Content>
            </Card>
        )
    })

    return (
        <Card.Group centered>
            { characterList}
        </Card.Group>
    )
}

export default CharacterList