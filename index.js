var fs = require('fs');

const order = "23456789TJQKA";
// fuction to calculate all the possible hands with one player possible
// like flush, straight, two pair, one pair. 
function getHandDetails(hand) {
    const cards = hand.split(" ");
    const faces = cards.map(a => String.fromCharCode([77 - order.indexOf(a[0])]));
    const suits = cards.map(a => a[1]).sort();
    const counts = faces.reduce(count, {});
    const duplicates = Object.values(counts).reduce(count, {});
    const flush = suits[0] === suits[4]
    const first = faces[0].charCodeAt(0);
    const straight = faces.every((f, index) => f.charCodeAt(0) - first === index);
    let rank = 
        (flush && straight && 1) ||
        (duplicates[4] && 2) ||
        (duplicates[3] && duplicates[2] && 3) ||
        (flush && 4) ||
        (straight && 5) ||
        (duplicates[3] && 6) ||
        (duplicates[2] > 1 && 7) ||
        (duplicates[2] && 8) ||
        9

        return { rank, value: faces.sort(byCountFirst).join("")}

        function byCountFirst(a, b){
            const countDiff = counts[b] - counts[a]
            if (countDiff) return countDiff 
                return b > a ? -1 : b === a ? 0 : 1
        }

        function count(c, a){
            c[a] = (c[a] || 0) + 1
            return c
        }

}
//compares player 1 and player 2 cards
function compareHands(h1, h2) {
    let d1 = getHandDetails(h1);
    let d2 = getHandDetails(h2);
    if(d1.rank === d2.rank) {
        if (d1.value > d2.value){
            return 0
        } 
        else {
            return 1
        }
    }
    return d1.rank < d2.rank ? 1 : 0
}

// function to seperate the first 5 cards to player1 and last 5 cards to player2
function hands(string) {
    let middle = Math.floor(string.length / 2);
    let before = string.lastIndexOf(' ', middle);
    let after = string.indexOf(' ', middle + 1);
    if (middle - before < after - middle) {
        middle = before;
    } else {
        middle = after;
    }
    let h1 = string.substr(0, middle);
    let h2 = string.substr(middle + 1);
    return [h1,h2];
}

let player1_count = 0
let player2_count = 0
try {
    let data = fs.readFileSync('poker-hands.txt', 'utf8','r')
        let pokerhands = data.toString().split('\n');
        for (i=0;i<pokerhands.length; i++) {
            let handsvalue = hands(pokerhands[i]);
            let valueofhands = compareHands(handsvalue[0],handsvalue[1])
            if(valueofhands === 1) {
                player1_count = player1_count + 1
            } else if(valueofhands === 0) {
                player2_count = player2_count + 1
            }
        }
    
} catch (err) {
    console.log(err)
}

console.log('Player 1:',player1_count);
console.log('Player 2:',player2_count);

