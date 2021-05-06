const fs = require('fs');
const { blue, green, red } = require('chalk');
const chalk = require('chalk');

const getNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse.blue('Your Notes'));
    notes.forEach((note) => {
        console.log(note.title, " - ", note.body);
    })
};

const addNote = (title, body) => {
    const notes = loadNotes();
    const duplicatedNote = notes.find(note => note.title === title);
    if(!duplicatedNote){
        notes.push({ title , body});
        saveNotes(notes);
        console.log(chalk.green.inverse('New Note Added!'));
        console.log(chalk.blue.inverse(`Count is :${notes.length}`));
        console.log(notes);
    } else{
        console.log(chalk.red.inverse('Note Title Taken!'));
    }
}


const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title);

    if(note){
        console.log(chalk.green.inverse(note.title));
        console.log(note.body);
    } else{
        console.log(chalk.red.inverse("No such note found!"));
    }
}
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

const loadNotes = () => {
    try{            
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }catch(e){
        return [];
    }
}

const removeNote = (title) => {
        const notes = loadNotes();
        const remainingNotes = notes.filter(note => note.title !== title);
        saveNotes(remainingNotes);
        console.log(chalk.blue.inverse(`Count is :${remainingNotes.length}`));
        console.log(remainingNotes);

        if(notes.length > remainingNotes.length){
            console.log(`${chalk.inverse.green('Note has been removed!')}`);
        } else{
            console.log(`${chalk.inverse.red('Note not Found!')}`);
        }    
}

module.exports = { getNotes, addNote, loadNotes, removeNote, readNote }