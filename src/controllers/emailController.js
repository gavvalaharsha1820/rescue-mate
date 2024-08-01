const UserEmail = require('../model/UserEmail'); // Assuming you have a UserEmail model
exports.getUserEmails = async (req, res) => {
    try {
        const emails = await UserEmail.find({}, 'email'); // Assuming your model has an 'email' field
        res.json(emails);
    } catch (error) {
        console.error('Error fetching user emails:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
