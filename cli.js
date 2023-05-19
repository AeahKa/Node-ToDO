const { program } = require('commander')
const api = require('./index')

program.option('-x, --xxx', 'what the x')

program
	.command('all')
	.description('show all tasks')
	.action(() => {
		api.showAll()
	})

program
	.command('add')
	.description('add a new task')
	.argument('<string>', 'task to add')
	.action((x) => {
		api.add(x).then(
			() => {
				console.log('***added***')
			},
			() => {
				console.log('***failed***')
			}
		)
	})

program
	.command('clear')
	.description('clear all tasks')
	.action(() => {
		api.clear().then(
			() => {
				console.log('***cleared***')
			},
			() => {
				console.log('***failed***')
			}
		)
	})

program.parse()
