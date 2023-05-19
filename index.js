const db = require('./db')

module.exports = {
	add: async (title) => {
		// 读取之前的任务
		const list = await db.read()
		// 添加一个任务
		list.push({ title, done: false })
		// 储存任务到文件
		await db.write(list)
	},

	clear: async () => {
		await db.write([])
	},

	showAll: async () => {
		const list = await db.read()
		list.forEach((task, index) => {
			console.log(
				`${task.done ? '[Done]' : '[____]'} ${index + 1} - ${task.title}`
			)
		})
	},
}
