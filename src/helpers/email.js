const nodemailer = require('nodemailer');
const nunjucks = require('nunjucks');
const { Settings } = require('../../config/config');
const transport = nodemailer.createTransport(Settings.emailConfig);

module.exports = {
    send
};

async function send(params) {
    return await transport.sendMail({
        from: Settings.emailConfig.auth.user,
        to: Array.isArray(params.receivers) ? params.receivers.join() : params.receivers,
        subject: params.subject,
        html: nunjucks.render(params.html, params.context),
        attachments: params.attachments,
    });
}