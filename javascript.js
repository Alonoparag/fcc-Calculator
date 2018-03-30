const CALCULATOR = {
	entry: [0],
	arrHistory: [],
	inNum: function(num) {
		if(this.entry.length <= 13) {
			if(this.arrHistory.indexOf('=') != -1) {
				this.action('ac');
			}
			(this.entry.length === 1 && this.entry[0] === 0) ? this.entry[0] = num: (typeof this.entry[0] == 'string') ? this.entry = [num] : this.entry.push(num);
			return $('#entry')[0].textContent = this.entry.join('');
		}
		else {
			return $('#history')[0].textContent = 'entry is longer than 13 digits!.',
				$('#entry')[0].textContent = 'Error!';
		}
	},
	action: function(action) {
		switch(action) {
			case 'ac':
				this.arrHistory = [];
				this.entry = [0];
				return $('#history')[0].textContent = this.arrHistory.join(''), $('#entry')[0].textContent = this.entry.join('');
			case 'ce':
				if(typeof this.arrHistory[this.arrHistory.length - 1] == 'string') {
					//if (typeof Number(arrHistory[arrHistory.length - 1]) != 'number')
					this.arrHistory.pop();
					this.entry = [0];
					$('#entry')[0].textContent = this.entry.join('');
				}
				else {
					this.arrHistory = [];
					this.entry = [0];
					return $('#history')[0].textContent = this.arrHistory.join(''),
						$('#entry')[0].textContent = this.entry.join('');
				}
				return $('#history')[0].textContent = this.arrHistory.join('');
			case 'divide':
				if(this.arrHistory.indexOf('=') != -1) {
					this.arrHistory = [Number(this.entry.join(''))];
					this.arrHistory.push('\/');
					this.entry = [String.fromCharCode(247)];
					$('#entry')[0].textContent = this.entry.join('');
					return $('#history')[0].textContent = this.arrHistory.join('');
				}
				else if(typeof this.entry[0] === 'number' && typeof this.entry[this.entry.length - 1] === 'number') {
					this.arrHistory.push(Number(this.entry.join('')));
					this.arrHistory.push('\/');
					this.entry = [String.fromCharCode(247)];
					$('#entry')[0].textContent = this.entry.join('');
					return $('#history')[0].textContent = this.arrHistory.join('');
				}
				break;
			case 'multiply':
				if(this.arrHistory.indexOf('=') != -1) {
					this.arrHistory = [Number(this.entry.join(''))];
					this.arrHistory.push('\*');
					this.entry = ['X'];
					$('#entry')[0].textContent = this.entry.join('');
					return $('#history')[0].textContent = this.arrHistory.join('');
				}
				else if(typeof this.entry[0] === 'number' && typeof this.entry[this.entry.length - 1] === 'number') {
					this.arrHistory.push(Number(this.entry.join('')));
					this.arrHistory.push('\*');
					this.entry = ['X'];
					$('#entry')[0].textContent = this.entry.join('');
					return $('#history')[0].textContent = this.arrHistory.join('');
				}
				break;
			case 'add':
				if(this.arrHistory.indexOf('=') != -1) {
					this.arrHistory = [Number(this.entry.join(''))];
					this.arrHistory.push('\+');
					this.entry = ['\+'];
					$('#entry')[0].textContent = this.entry.join('');
					return $('#history')[0].textContent = this.arrHistory.join('');
				}
				else if(typeof this.entry[0] === 'number' && typeof this.entry[this.entry.length - 1] === 'number') {
					this.arrHistory.push(Number(this.entry.join('')));
					this.arrHistory.push('\+');
					this.entry = ['\+'];
					$('#entry')[0].textContent = this.entry.join('');
					return $('#history')[0].textContent = this.arrHistory.join('');
				}
				break;
			case 'subtract':
				if(this.arrHistory.indexOf('=') != -1) {
					this.arrHistory = [Number(this.entry.join(''))];
					this.arrHistory.push('\-');
					this.entry = ['\-'];
					$('#entry')[0].textContent = this.entry.join('');
					return $('#history')[0].textContent = this.arrHistory.join('');
				}
				else if(typeof this.entry[0] === 'number' && typeof this.entry[this.entry.length - 1] === 'number') {
					this.arrHistory.push(Number(this.entry.join('')));
					this.arrHistory.push('\-');
					this.entry = ['\-'];
					$('#entry')[0].textContent = this.entry.join('');
					return $('#history')[0].textContent = this.arrHistory.join('');
				}
				break;
			case 'calculate':
				// MULTIPLICATION AND DIVISION METHOD
				function mulDiv(acumulator, element, index, arr) {
					if(arr[index + 1] == '*' || arr[index + 1] == '/') {
						if(index < arr.length - 2) {
							let mulDivSum;
							switch(arr[index + 1]) {
								case '*':
									mulDivSum = element * arr[index + 2]
									arr.splice(index, 2);
									break;
								case '/':
									mulDivSum = element / arr[index + 2]
									arr.splice(index, 2);
									break;
							}
							acumulator.push(mulDivSum);
							return acumulator;
						}
					}
					else {
						acumulator.push(element);
						return acumulator
					}
				}
				// ADDITION AND SUBTRACTION METHOD
				function addSub(sum, element, index, arr) {
					switch(element) {
						case "+":
							if(index < arr.length - 1) {
								sum += arr[index + 1];
								break;
							}
						case "-":
							if(index < arr.length - 1) {
								sum -= arr[index + 1];
								break;
							}
					}
					return sum;
				}
				if((this.entry.length === 1 && typeof this.entry[0] == 'number') || (this.entry[this.entry.length - 1] == 'number')) {
					this.arrHistory.push(Number(this.entry.join('')));
					let result = this.arrHistory.reduce(mulDiv, [])
						.reduce(addSub, this.arrHistory[0]);
					if(result.toString()
						.length <= 13) {
						this.arrHistory.push('=');
						this.arrHistory.push(result)
						this.entry = [result]
						$('#history')[0].textContent = this.arrHistory.join('');
						$('#entry')[0].textContent = Number(result);
					}
					else {
						return $('#history')[0].textContent = 'entry is longer than 13 digits.',
							$('#entry')[0].textContent = 'Error!';
					}
				}
				break;
			case 'decimal':
				if(this.entry.indexOf('.') === -1) {
					this.entry.push('\.');
					$('#entry')[0].textContent = this.entry.join('');
				}
		}
	}
}
