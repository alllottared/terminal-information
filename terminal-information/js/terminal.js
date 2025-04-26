// This file contains the JavaScript code for handling terminal functionality.

document.addEventListener('DOMContentLoaded', () => {
    const commandInput = document.querySelector('.command-input');
    const terminalOutput = document.querySelector('.terminal-output');

    commandInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            const command = commandInput.value;
            processCommand(command);
            commandInput.value = ''; // Clear input after processing
        }
    });

    function processCommand(command) {
        let output = '';

        // Example command processing
        switch (command.toLowerCase()) {
            case 'help':
                output = 'Available commands: help, clear, echo [text]';
                break;
            case 'clear':
                terminalOutput.innerHTML = '';
                return; // Exit function to avoid adding output
            default:
                if (command.startsWith('echo ')) {
                    output = command.slice(5); // Get text after 'echo '
                } else {
                    output = `Command not recognized: ${command}`;
                }
        }

        // Display output in terminal
        terminalOutput.innerHTML += `<div>${output}</div>`;
        terminalOutput.scrollTop = terminalOutput.scrollHeight; // Auto-scroll to bottom
    }
});