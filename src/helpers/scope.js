class Scope {
    constructor(validation, config) {
        this._validation = validation;
        this._config = config || { messages: {} };
        this._errors = [];
        this._validators = require('./validators');
        this._notPassExpected = {
            required: true,
            isEmail: true
        };
    }

    isValid(params) {
        this._validate(params, this._validation);

        if (this._errors.length)
            throw { messages: this._errors, statusCode: this._config.statusCode || null }
    }

    setConfig(config) {
        Object.assign(this._config, config);
    }

    getConfig() {
        return this._config;
    }

    checkObject(params, validation, property) {
        this.checkProperty(params, validation, property);

        if (validation.items) {
            this._validate(params, validation.items);
        }
    }

    checkArray(params, validation, property) {
        this.checkProperty(params, validation, property);
    
        if (validation.items) { 
            params.forEach((param, index) => {
                this._validate(param, validation.items);
            });
        }
        else if (validation.rules) {
            params.forEach((param, index) => {
                this.checkProperty(param, validation.rules, `${property}[${index}]`);
            });
        }
    }

    checkProperty(value, validation, property) {
        Object.keys(validation).map(k => {
            if (!this._validators[k] || (validation[k] != 0 && !validation[k])) {
                return;
            } else {
                let error;
                if (!this._notPassExpected[k]) {
                    error = this._validators[k](value, validation[k], property, this._config.messages[k]);
                } else {
                    error = this._validators[k](value, property, this._config.messages[k]);
                }
                error ? this._errors.push(error) : null;
            }
        });
    }

    _validate(params, validation) {
        if (!params) {
            params = {};
        }

        Object.keys(validation).map(k => {
            if (!params[k])
                this.checkProperty(params[k], validation[k], k);
            else if (Array.isArray(params[k]))
                this.checkArray(params[k], validation[k], k);
            else if (params[k].constructor === Object)
                this.checkObject(params[k], validation[k], k);
            else
                this.checkProperty(params[k], validation[k], k);
        });
    }
}

module.exports = Scope;