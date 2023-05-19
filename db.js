const fs = require('fs')
const homedir = require('os').homedir() // 获取系统默认home目录
const home = process.env.Home || homedir // process.env.Home 获取home变量
const p = require('path')
const dbPath = p.join(home, '.todo') // 自动为不同系统下的路径添加/或\

const db = {
	read(path = dbPath) {
		// path默认为dbPath
		return new Promise((resolve, reject) => {
			fs.readFile(path, { flag: 'a+' }, (error, data) => {
				if (error) {
					return reject(error)
				}
				let list
				try {
					list = JSON.parse(data.toString())
				} catch (error2) {
					list = []
				}
				resolve(list)
			})
		})
	},

	write(list, path = dbPath) {
		return new Promise((resolve, reject) => {
			fs.writeFile(path, JSON.stringify(list), (error) => {
				if (error) {
					return reject(error)
				}
				resolve()
			})
		})
	},
}
module.exports = db
