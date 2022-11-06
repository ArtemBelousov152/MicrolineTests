const config = {
    read: ['sample@email.com', 'mark@fb.com', 'whoami@dot.com', 'test@email.com'],
    write: ['sample@email.com', 'test@email.com'],
    };


function checkEmail(config, testEmail) {
    const {read, write} = config;
 
    if(read.some(email => email === testEmail) && write.some(email => email === testEmail)) {
        return 'you can read and write';
    } else if(write.some(email => email === testEmail)) {
        return 'you can write';
    } else if(read.some(email => email === testEmail) ) {
        return 'you can read';
    } else {
        return 'you can do nothing'
    }
}
