const twoSum = (nums, target) => {
    const numMap = new Map();

    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        numMap.set(nums[i], i);
    }
    return null;
};

const twoSumBrute = (nums, target) => {
    
    for (let i = 0; i < nums.length; i++) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
    return null;
};

const twoSumTwoPointer = (nums, target) => {
    let p1 = 0;
    let p2 = nums.length-1;

    while (p1 < p2) {
        if (nums[p1] + nums[p2] === target) {
            return [p1, p2];
        } else if (nums[p1] + nums[p2] > target) {
            p2--;
        } else {
            p1++;
        }
    }

    return null;
};

// console.log(twoSum([2, 7, 11, 15], 9));
// console.log(twoSumBrute([2, 7, 11, 15], 9));
// console.log(twoSumTwoPointer([2, 7, 11, 15], 9));


// Input: "A man, a plan, a canal: Panama"
// Output: true
// Explanation: After converting to lowercase and removing non-alphanumeric characters, it becomes "amanaplanacanalpanama" which reads the same forward and backward.

// Input: "race a car"
// Output: false
// Explanation: After converting to lowercase and removing non-alphanumeric characters, it becomes "raceacar" which does not read the same forward and backward.

const validPalindromeBrute = (str) => {
    const alpha = 'abcdefghijklmnopqrstuvwxyz';
    let input = str.toLowerCase().split('').filter(char => alpha.includes(char)).join('');

    let p1 = 0;
    let p2 = input.length - 1;

    while (p1 <= p2) {
        console.log(input.charAt(p1), input.charAt(p2));
        if (input.charAt(p1) !== input.charAt(p2)) {
            return false;
        }
        p1++;
        p2--;
    }

    return true;
};

// const validPalindrome = (str) => {
//     let p1 = 0;
//     let p2 = str.length-1;

//     while (p1 < p2) {

//         while (p1 < p2 && !isAlphanumeric(str[p1])) {
//             p1++;
//         }

//         while (p1 < p2 && !isAlphanumeric(str[p2])) {
//             p2--;
//         }

//         if (str[p1].toLowerCase() !== str[p2].toLowerCase()) return false;
//         p1++;
//         p2--;
//     }

//     return true;
// };

// const isAlphanumeric = (char) => {
//     return /[A-Za-z0-9]/.test(char);
// };

// console.log(validPalindromeBrute('race a car'));
// console.log(validPalindromeBrute('A man, a plan, a canal: Panama'));
// console.log(validPalindrome('race a car'));
// console.log(validPalindrome('A man, a plan, a canal: Panama'));


// Input: s = "anagram", t = "nagaram"
// Output: true


const validAnagram = (s, t) => {
    if (s.length !== t.length) return false;

    const map1 = new Map();
    const map2 = new Map();

    for (let i = 0; i < s.length; i++) {
        if (!map1.has(s[i])) {
            map1.set(s[i], 0);
        }
        if (!map2.has(t[i])) {
            map2.set(t[i], 0);
        }
        map1.set(s[i], map1.get(s[i]) + 1);
        map2.set(t[i], map2.get(t[i]) + 1);
    }

    for (const char in map1) {
        if (map1.get(char) !== map2.get(char)) return false;
    }
    return true;
};

// console.log(validAnagram("anagram", "nagaram"));

function validPalindrome(str) {
    let p1 = 0;
    let p2 = str.length - 1;

    while (p1 < p2) {

        while (p1 < p2 && !isAlphanumeric(str[p1])) {
            p1++;
        }

        while (p1 < p2 && !isAlphanumeric(str[p2])) {
            p2--;
        }

        if (str[p1].toLowerCase() !== str[p2].toLowerCase()) {
            return false;
        }
        p1++;
        p2--;
    }

    return true;
};

function isAlphanumeric(char) {
    return /[a-zA-Z0-9]/.test(char);
};

// console.log(validPalindrome('race a car'));
// console.log(validPalindrome('A man, a plan, a canal: Panama'));

// class RandomizedSet {
//     constructor() {
//         this.nums = [];
//         this.numsMap = new Map();
//     }
    
//     insert(val) {
//         if (this.numsMap.has(val)) return false;
//         this.numsMap.set(val, this.nums.length);
//         this.nums.push(val);
//         return true;
//     }
    
//     remove(val) {
//         if (!this.numsMap.has(val)) return false;
        
//         const idx = this.numsMap.get(val);
//         const lastVal = this.nums[this.nums.length - 1];
        
//         this.nums[idx] = lastVal;
//         this.numsMap.set(lastVal, idx);
        
//         this.nums.pop();
//         this.numsMap.delete(val);
//         return true;
//     }
    
//     getRandom() {
//         const randomIdx = Math.floor(Math.random() * this.nums.length);
//         return this.nums[randomIdx];
//     }
// }











const nums = [9,4,8,3,7,2,6,1,5];

// const numsMap = new Map();

// nums.forEach((num, idx) => numsMap.set(nums[idx], idx));

class EfficientRandomizer {
    constructor() {
        this.nums = [];
        this.numsMap = new Map();
    }

    insert(val) {
        if (this.numsMap.has(val)) return false;
        this.numsMap.set(val, this.nums.length);
        this.nums.push(val);
        return true;
    }

    remove(val) {
        const idx = this.numsMap.get(val);
        const lastValue = this.nums[this.nums.length - 1];

        this.nums[idx] = lastValue;
        this.numsMap.set(lastValue, idx);

        this.nums.pop();
        this.numsMap.delete(val);
        return true;
    }

    getRandom() {
        return this.nums[Math.floor(Math.random() * this.nums.length)];
    }
}

const randomizer = new EfficientRandomizer();

nums.forEach(num => randomizer.insert(num));
console.log(randomizer.nums, randomizer.numsMap);

randomizer.remove(4);
console.log(randomizer.nums, randomizer.numsMap);

const random = randomizer.getRandom();
console.log(random);