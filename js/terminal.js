// This file contains the JavaScript code that handles user input, processes commands, and displays the corresponding output in the terminal simulation.

document.addEventListener('DOMContentLoaded', () => {
    const terminal = document.getElementById('draggableTerminal');
    const titleBar = terminal.querySelector('.title-bar');
    const minimizeBtn = terminal.querySelector('.minimize');
    const maximizeBtn = terminal.querySelector('.maximize');
    const closeBtn = terminal.querySelector('.close');
    const terminalOutput = document.querySelector('.terminal-output');
    const commandInput = document.querySelector('.command-input');
    const prompt = document.querySelector('.prompt').textContent;
    let currentDirectory = 'C:\\Users\\Guest';
    let waitingForPassword = false;
    let passwordAttempts = 0;

    // Dragging functionality
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;

    titleBar.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;

        if (e.target === titleBar || e.target.parentNode === titleBar) {
            isDragging = true;
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;

            xOffset = currentX;
            yOffset = currentY;

            setTranslate(currentX, currentY, terminal);
        }
    }

    function dragEnd(e) {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    // Window controls
    minimizeBtn.addEventListener('click', () => {
        terminal.style.transform = 'translate3d(0, 100vh, 0)';
        xOffset = 0;
        yOffset = window.innerHeight;
    });

    maximizeBtn.addEventListener('click', () => {
        if (terminal.style.width === '100%') {
            terminal.style.width = '80%';
            terminal.style.height = '60vh';
            terminal.style.borderRadius = '8px';
            maximizeBtn.innerHTML = '<i class="fa-regular fa-window-maximize"></i>';
        } else {
            terminal.style.width = '100%';
            terminal.style.height = '100vh';
            terminal.style.borderRadius = '0';
            maximizeBtn.innerHTML = '<i class="fa-regular fa-window-restore"></i>';
        }
        terminal.style.transform = 'translate3d(0, 0, 0)';
        xOffset = 0;
        yOffset = 0;
    });

    closeBtn.addEventListener('click', () => {
        terminal.style.display = 'none';
    });

    // Existing terminal functionality
    commandInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const command = commandInput.value.trim();
            
            // Hide password with asterisks
            if (waitingForPassword) {
                terminalOutput.innerHTML += `${prompt} ${'*'.repeat(command.length)}\n`;
            } else {
                terminalOutput.innerHTML += `${prompt} ${command}\n`;
            }
            
            // Process command
            processCommand(command);
            
            // Clear input
            commandInput.value = '';
            
            // Auto-scroll
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
    });

    function processCommand(command) {
        const cmd = command.toLowerCase().trim();
        const args = cmd.split(' ');

        if (waitingForPassword) {
            handlePasswordInput(command);
            return;
        }

        switch(args[0]) {
            case 'infor':
                terminalOutput.innerHTML += 'Please enter password to access social media information:\n';
                waitingForPassword = true;
                break;
            case 'cls':
                terminalOutput.innerHTML = 'Wok information. [Version 9.5.2008]\n(c) MaiLand. All rights reserved.\n\n';
                break;
            case 'dir':
                terminalOutput.innerHTML += ` Directory of ${currentDirectory}\n\n`;
                terminalOutput.innerHTML += ' Volume in drive C has no label.\n';
                terminalOutput.innerHTML += ' Volume Serial Number is 1234-5678\n\n';
                break;
            case 'cd':
                if (args[1]) {
                    terminalOutput.innerHTML += ` Changed to directory: ${args[1]}\n`;
                } else {
                    terminalOutput.innerHTML += ` ${currentDirectory}\n`;
                }
                break;
            case 'help':
                terminalOutput.innerHTML += 'Available commands:\n';
                terminalOutput.innerHTML += ' CLS      Clears the screen\n';
                terminalOutput.innerHTML += ' DIR      Displays a list of files and subdirectories\n';
                terminalOutput.innerHTML += ' CD       Displays the name of current directory or changes directory\n';
                terminalOutput.innerHTML += ' INFOR    Access social media information (password protected)\n';
                terminalOutput.innerHTML += ' HELP     Provides Help information for Windows commands\n';
                break;
            default:
                if (command) {
                    terminalOutput.innerHTML += `'${command}' is not recognized as an internal or external command,\noperable program or batch file.\n`;
                }
        }
    }

    function handlePasswordInput(password) {
        if (password === '952008') {
            terminalOutput.innerHTML += 'Access granted. Redirecting to social media information...\n';
            waitingForPassword = false;
            passwordAttempts = 0;
            setTimeout(() => {
                window.location.href = './social.html';
            }, 1000);
        } else {
            passwordAttempts++;
            if (passwordAttempts === 1) {
                terminalOutput.innerHTML += 'Incorrect password. Hint: wok\'s birthday\n';
                terminalOutput.innerHTML += 'Please try again:\n';
            } else if (passwordAttempts === 2) {
                terminalOutput.innerHTML += 'Incorrect password. Last attempt:\n';
            } else {
                terminalOutput.innerHTML += 'Access denied. Redirecting...\n';
                waitingForPassword = false;
                passwordAttempts = 0;
                setTimeout(() => {
                    window.location.href = 'https://www.google.com';
                }, 1000);
            }
        }
    }
});
