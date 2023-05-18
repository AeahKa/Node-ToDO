const { program, Argument } = require('commander')

program.option('-x, --xxx', 'what the x')

program
	.command('add')
	.description('add a new task')
	.argument('<string>', 'task to add')
	.action((x) => {
		console.log(x)
	})

program.parse()
