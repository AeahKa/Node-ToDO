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
}
