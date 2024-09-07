const flashMessage = (req, res, next) => {
    try{
        const flashTypes = ['success', 'error', 'info', 'warning']; // Add other types as needed
        flashTypes.forEach(type => {
            const message = req.flash(type);
            if (message.length > 0) {
                req.flashMessage = message[0];
            }
        });
        next();
    }catch(error){
        res.status(401).send(error);
    }
}
module.exports = flashMessage;
