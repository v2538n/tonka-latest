function inputValue(form){
	
	let 
		inputsValue = [],
		input = $('.login-form__item');

	/* Перебираем все инпуты из формы контактов 
	и сохраняем значение value в массив */

	input.each(function(){
		
		let inputName = $(this).attr('name');

		inputsValue[inputName] = $(this).val();	
	});


	/* Поведение при фокусе. 
	Если input.value совпадает с исходным значением, то стираем */

	input.focus(function(){
		
		let 
			inputName  = $(this).attr('name'),
			inputValue = $(this).val();

		if(inputValue === inputsValue[inputName]) {
			$(this).val('');
		}
	});

	/* Поведение при потери фокуса. 
	Если input.value пустой, то вписываем исходное значение */

	input.blur(function(){
		
		let
			inputName  = $(this).attr('name'),
			inputValue = $(this).val();

		if(inputValue === '') {
			$(this).val(inputsValue[inputName]);
		}

	});
}