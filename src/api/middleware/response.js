module.exports = (req, res, next) => {
    res.ok = (content, statusCode) => {
        return res.status(statusCode || 200).json({ content });
    };

    res.error = (messages, content, statusCode) => {
        return res.status(statusCode || 500).json({ messages, content });
    }

    next();
}