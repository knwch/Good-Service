const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validatePost = (data) => {
    let errors = {};

    data.topic = !isEmpty(data.topic) ? data.topic : '';
    data.type = !isEmpty(data.type) ? data.type : '';
    data.goods = !isEmpty(data.goods) ? data.goods : '';
    data.price = !isEmpty(data.price) ? data.price : '';
    data.location.address = !isEmpty(data.location.address)
        ? data.location.address
        : '';
    data.location.longitude = !isEmpty(data.location.longitude)
        ? data.location.longitude
        : '';
    data.location.latitude = !isEmpty(data.location.latitude)
        ? data.location.latitude
        : '';

    if (Validator.isEmpty(data.topic)) errors.topic = `Topic field is required`;
    if (Validator.isEmpty(data.type)) errors.type = `Type field is required`;
    if (Validator.isEmpty(data.goods)) errors.goods = `Goods field is required`;
    if (Validator.isEmpty(data.price)) errors.price = `Price field is required`;
    if (Validator.isEmpty(data.location.address))
        errors.address = `Addres field is required`;
    if (Validator.isLatLong(data.location.longitude))
        errors.longitude = `Longitude is required`;
    if (Validator.isLatLong(data.location.latitude))
        errors.latitude = `Latitude is required`;

    return {
        errors,
        isValid: isEmpty(errors)
    };
};
