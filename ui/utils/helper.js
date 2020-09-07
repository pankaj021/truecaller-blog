export function getUserFriendlyDate(date) {
    const rangeInMS = [
        [
            31104000000, 'year'
        ],
        [
            2592000000, 'month'
        ],
        [
            86400000, 'day'
        ],
        [
            3600000, 'hours'
        ],
        [
            60000, "minute"
        ],
        [
            1000, "second"
        ]
    ]
    try {
        const todayMS = new Date().getTime();
        const publishMs = new Date(date).getTime();
        const diff = todayMS - publishMs;
        for (let index = 0; index < rangeInMS.length; index++) {
            const [tValue, tText] = rangeInMS[index];
            if (diff > tValue) {
                const approxVal = Math.floor(diff / tValue);
                return 'Published ' + (approxVal <= 1 ? `1 ${tText}` : `${approxVal} ${tText}s`) + ' ago.';
            }
        }
    } catch (error) {
        console.log(error);
    }
    return `Published on ${new Date(date).toDateString()}`;
}

export function isEmpty(obj) {
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return false;
        }
    }
    return JSON.stringify(obj) === JSON.stringify({});
}