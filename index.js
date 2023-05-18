const { program } = require('commander')

program.option('-x, --xxx', 'what the x')

program
	.command('add <taskName>')
	.description('add a new task')
	.action(() => {
		console.log('new task')
	})

program.parse()
