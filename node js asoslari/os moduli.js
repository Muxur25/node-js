const os = require('os')

// platforma

console.log(os.platform()) // win32

// nechtalik
console.log(os.arch()) // X64

// prosessor haqida malumot
console.log(os.cpus())
// javobi massiv korinishda
;[
	{
		model: 'Intel(R) Core(TM) i3-10110U CPU @ 2.10GHz',
		speed: 2592,
		times: { user: 822968, nice: 0, sys: 1019437, idle: 5653156, irq: 94421 },
	},
	{
		model: 'Intel(R) Core(TM) i3-10110U CPU @ 2.10GHz',
		speed: 2592,
		times: { user: 677890, nice: 0, sys: 491750, idle: 6325531, irq: 21218 },
	},
	{
		model: 'Intel(R) Core(TM) i3-10110U CPU @ 2.10GHz',
		speed: 2592,
		times: { user: 766484, nice: 0, sys: 543109, idle: 6185609, irq: 17093 },
	},
	{
		model: 'Intel(R) Core(TM) i3-10110U CPU @ 2.10GHz',
		speed: 2592,
		times: { user: 774890, nice: 0, sys: 497984, idle: 6222328, irq: 12359 },
	},
]

// qancha bosh joy borligi

console.log(os.freemem()) // bitlarda korsatadi

// umumiy xotirani korish
console.log(os.totalmem())

// sistema yoqilgandan beri qancha vaqt ishlaganini korish

console.log(os.uptime()) // millisekundlarda
