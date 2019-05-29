class Invoker {
	constructor(){
		this.stack = [];
		this.executed = [];
    }

    executeAndAdd(command) {
        command.execute();
        this.stack.push(command);
    }

	execute(command) {
		command.execute();
	}

	undo() {
		if(this.stack.length === 0)
			return;
        
        let command = this.stack.pop();
        command.undo();
		this.executed.push(command);
	}

	redo() {
		if(this.executed.length === 0)
			return;

        let command = this.executed.pop();
        command.execute();
        this.stack.push(command);
	}
}

export default new Invoker();