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
					{ name: 'Quit', value: '-2' },
					{ name: 'Add a new task', value: '-1' },
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
				if (index >= 0) {
					inquirer
						.select({
							message: 'selected',
							choices: [
								{ name: 'Quit', value: 'quit' },
								{ name: 'Done', value: 'done' },
								{ name: 'Undone', valUe: 'undone' },
								{ name: 'Remove', value: 'remove' },
							],
						})
						.then((answer2) => {
							switch (answer2) {
								case 'quit':
									break
								case 'done':
									list[index].done = true
									db.write(list)
									break
								case 'undone':
									list[index].done = false
									db.write(list)
									break
								case 'remove':
									list.splice(index, 1)
									db.write(list)
									break
							}
						})
				} else if (index === -1) {
					inquirer.input({ message: 'Enter a task' }).then((answer3) => {
						list.push({
							title: answer3,
							done: false,
						})
						db.write(list)
					})
				}
			})
	},
}
