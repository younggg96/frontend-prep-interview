function getShuffledCards() {
    const cards = getCards();
    shuffle(cards);
    return cards;
}

function getCards() {
    const nums = [3, 4, 5, 6, 7, 8, 9, 'A', 2, 'J', 'Q', 'K'];
    const types = [0, 1, 2, 3];
    const newCards = nums.reduce((cards, curr) => {
        for (const type of types) {
            cards.push(curr + '_' + type);
        }
        return cards;
    }, []);
    newCards.push('M', 'N');
    return newCards;
}

function getRand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const randIdx = getRand(0, i);
        [arr[randIdx], arr[i]] = [arr[i], arr[randIdx]];
    }
}

function sortCards(cards) {
    function getEqualVal(s) {
        if (s === 'M') return 9999999;
        if (s === 'N') return 999999;
        let [num, type] = s.split('_');
        if (num === 'J') num = '11'
        if (num === 'Q') num = '12'
        if (num === 'K') num = '13'
        if (num === 'A') num = '14'
        if (num == '2') num = '15'
        return parseInt(num) * 10 - parseInt(type);
    }
    cards.sort((a, b) => {
        return getEqualVal(b) - getEqualVal(a);
    })
}

const cards = getShuffledCards();
sortCards(cards);
console.log(cards);