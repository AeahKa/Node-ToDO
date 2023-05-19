const db = require('./db')
const inquirer = require('@inquirer/prompts')

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
		inquirer
			.select({
				message: 'selected',
				choices: [
					{ name: 'quit', value: '-2' },
					{ name: 'add a new task', value: '-1' },
					...list.map((task, index) => {
						return {
							name: `${task.done ? '[Done]' : '[____]'} ${index + 1} - ${
								task.title
							}`,
							value: index.toString(),
						}
					}),
				],
			})
			.then((answer) => {
				const index = parseInt(answer)
				console.log('选择了一个任务')
				if (index >= 0) {
				} else if (index === -1) {
					console.log('新建任务')
				}
			})
	},
}
