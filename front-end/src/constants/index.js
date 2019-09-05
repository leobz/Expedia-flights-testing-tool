const EnumSortTypes = {
    PRICE_LOWEST: 'priceLowest',
    PRICE_HIGHEST: 'priceHighest',
    DURATION_SHORTEST: 'durationShortest',
    DURATION_LONGEST: 'durationLongest',
    DEPARTURE_EARLIEST: 'departureEarliest',
    DEPARTURE_LATEST: 'departureLatest',
    ARRIVAL_EARLIEST: 'arrivalEarliest',
    ARRIVAL_LATEST: 'arrivalLatest'
};

const sortOptions = [
    {text: 'Price lowest', sortKey: EnumSortTypes.PRICE_LOWEST},
    {text: 'Price highest', sortKey: EnumSortTypes.PRICE_HIGHEST},
    {text: 'Duration shortest', sortKey: EnumSortTypes.DURATION_SHORTEST},
    {text: 'Duration longest', sortKey: EnumSortTypes.DURATION_LONGEST},
    {text: 'Departure earliest', sortKey: EnumSortTypes.DEPARTURE_EARLIEST},
    {text: 'Departure latest', sortKey: EnumSortTypes.DEPARTURE_LATEST},
    {text: 'Arrival earliest', sortKey: EnumSortTypes.ARRIVAL_EARLIEST},
    {text: 'Arrival latest', sortKey: EnumSortTypes.ARRIVAL_LATEST}
];

export default sortOptions;
