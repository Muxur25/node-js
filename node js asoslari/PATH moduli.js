const path = require('path')

console.log(path.basename(__filename)) // file nomini chiqaradi

console.log(path.dirname(__filename)) // filegacha bolgan yo'l

console.log(path.extname(__filename)) // formati .js

const pathObj = path.parse(__filename)
console.log(pathObj)
// shunday malumot qaytaradi
// { root: 'c:\\',
//   dir: 'c:\\node.js\\node js asoslari',
//   base: 'tempCodeRunnerFile.js',
//   ext: '.js',
//   name: 'tempCodeRunnerFile'
// }

// join ikta yolni birlashtirish misol uchun biz hozirgi turgan fayl bn database/postsql/db.js bilan birlashtirmoqchi bolsak

const birlashtirish = path.join(__filename, 'database', 'postsql', 'db.js')
console.log(birlashtirish)
// javobi quyidagicha
//c:\node.js\node js asoslari\tempCodeRunnerFile.js\database\postsql\db.js
