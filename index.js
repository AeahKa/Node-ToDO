const homedir = require('os').homedir() // 获取系统默认home目录
const home = process.env.Home || homedir // process.env.Home 获取home变量
const fs = require('fs')
const p = require('path')
const dbPath = p.join(home, '.todo') // 自动为不同系统下的路径添加/或\

module.exports = {
	add: (content) => {
		fs.readFile(dbPath, { flag: 'a+' }, (error, data) => {
			if (error) {
				console.log('error')
			} else {
				let list
				try {
					list = JSON.parse(data.toString())
				} catch (error2) {
					list = []
				}
				const task = {
					task: content,
					done: false,
				}
				list.push(task)
				console.log(list)
				fs.writeFile(dbPath, JSON.stringify(list), (error3) => {
					if (error3) {
						console.log(error3)
					}
				})
			}
		})
	},
}
