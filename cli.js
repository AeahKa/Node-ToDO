const { program, Argument } = require('commander')

program.option('-x, --xxx', 'what the x')

program
	.command('add')
	.description('add a new task')
	.argument('<string>', 'task to add')
	.action((x) => {
		console.log(x)
	})

program
	.command('clear')
	.description('clear all tasks')
	.action(() => {
		console.log('all tasks have been cleared')
	})

program.parse()
