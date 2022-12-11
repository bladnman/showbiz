'use strict';
const CONSTANTS = require('../constants');

const kochavaUtils = function(options) {
  const defaults = {
    path: 'KOCHAVA',
    type: 'MESSAGE',
  };

  const config = Object.assign({}, defaults, options);

  const getMetadataItem = (element = '', indexToStart = -1, itemsToExtract) => {
    return element.split(':').slice(indexToStart, itemsToExtract).toString();
  }

  const clickAddon = (action, locationPage, metadata) => {
    const actionString = action ? ' - ' + action : '';
    const locationString = locationPage ? ' - ' + locationPage : '';
    const metadataString = metadata ?  ' - ' + metadata : '';

    return action === CONSTANTS.KOCHAVA.event.addToCart
      ? actionString + locationString
      : locationString + metadataString;
  }

  const buildEventName = (eventName, options = {}) => {
    const { clickMetadata, formLocation, location } = options;
    const locationPage = getMetadataItem(location);
    const action = getMetadataItem(formLocation);
    const metadata = getMetadataItem(clickMetadata, 0, 1);

    return eventName + clickAddon(action, locationPage, metadata);
  }

  const buildPayload = (options) => {
    const eventOptions = Object.assign({}, options, { time: new Date() });
    const { formLocation } = eventOptions;
    const action = getMetadataItem(formLocation);

    if (action === CONSTANTS.KOCHAVA.event.addToCart && eventOptions.transaction) {
      const { transaction = {} } = eventOptions;
      const [ product = {} ] = transaction.products;

      return Object.assign({}, eventOptions, { transaction: product.name });
    }

    return eventOptions;
  }

  const getFormated = function(eventName, options) {
    return {
      eventName: buildEventName(eventName, options),
      path: config.path,
      payload: buildPayload(options),
      type: config.type
    };
  }

  return {
    getFormated
  }
}

module.exports = kochavaUtils();
